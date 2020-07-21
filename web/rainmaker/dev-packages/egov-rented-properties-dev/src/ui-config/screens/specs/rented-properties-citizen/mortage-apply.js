import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";

import {stepper, formwizardMortgageFirstStep,formwizardMortgageSecondStep, formwizardMortgageThirdStep } from '../rented-properties/applyResource/applyConfig';
import {mortgagefooter} from './footer-mortgage';
import { getMdmsData } from "../rented-properties/apply";
import { getOwnershipSearchResults, setDocsForEditFlow ,getMortgageSearchResults} from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { get } from "lodash";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";


const header = getCommonHeader({
    labelName: "Apply Mortage License",
    labelKey: "RP_COMMON_MORTAGE_LICENSE_APPLY"
});

export const prepareOwnerShipDocuments = documents => {
    let documentsArr =
      documents.length > 0
        ? documents.reduce((documentsArr, item, ind) => {
          documentsArr.push({
            name: item.code,
            required: item.required,
            jsonPath: `MortgageApplications[0].applicationDocuments[${ind}]`,
            statement: item.description
          });
          return documentsArr;
        }, [])
        : [];
    return documentsArr;
  };
  
  const setDocumentData = async(action, state, dispatch) => {
      const documentTypePayload = [{
          moduleName: "PropertyServices",
          masterDetails: [{name: "applications"}]
        }
      ]
      const documentRes = await getMdmsData(dispatch, documentTypePayload);
      const {PropertyServices} = !!documentRes && !!documentRes.MdmsRes ? documentRes.MdmsRes : {}
      const {applications = []} = PropertyServices || {}
      const findFreshLicenceItem = applications.find(item => item.code === "MortgageRP")
      const masterDocuments = !!findFreshLicenceItem ? findFreshLicenceItem.documentList : [];
      const freshLicenceDocuments = masterDocuments.map(item => ({
      type: item.code,
      description: {
        labelName: "Only .jpg and .pdf files. 6MB max file size.",
        labelKey: item.fileType
      },
      formatProps :{
        accept : item.accept || "image/*, .pdf, .png, .jpeg",
      }, 
      maxFileSize: 6000,
      downloadUrl: item.downloadUrl,
      moduleName: "RentedProperties",
      statement: {
          labelName: "Allowed documents are Aadhar Card / Voter ID Card / Driving License",
          labelKey: item.description
      }
      }))
      const documentTypes = prepareOwnerShipDocuments(masterDocuments);
      let applicationDocs = get(
        state.screenConfiguration.preparedFinalObject,
        "MortgageApplications[0].applicationDocuments",
        []
      ) || [];
      applicationDocs = applicationDocs.filter(item => !!item)
      let applicationDocsReArranged =
        applicationDocs &&
        applicationDocs.length &&
        documentTypes.map(item => {
          const index = applicationDocs.findIndex(
            i => i.documentType === item.name
          );
          return applicationDocs[index];
        }).filter(item => !!item)
      applicationDocsReArranged &&
        dispatch(
          prepareFinalObject(
            "MortgageApplications[0].applicationDocuments",
            applicationDocsReArranged
          )
        );
      dispatch(
        handleField(
            "mortage-apply",
            "components.div.children.formwizardSecondStep.children.mortgageDocumentsDetails.children.cardContent.children.documentList",
            "props.inputProps",
            freshLicenceDocuments
        )
    );
      dispatch(prepareFinalObject("MortgageApplications[0].applicationDocuments", documentTypes))
  }
  
  const getData = async(action, state, dispatch) => {
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    if(!!applicationNumber) {
      const queryObject = [
        {key: "applicationNumber", value: applicationNumber}
      ]
      const response = await getMortgageSearchResults(queryObject);
      if (response && response.MortgageApplications) {
      dispatch(prepareFinalObject("MortgageApplications", response.MortgageApplications))
      }
      // setDocsForEditFlow(state, dispatch, "Owners[0].ownerDetails.ownershipTransferDocuments", "OwnersTemp[0].uploadedDocsInRedux");
      setDocsForEditFlow(state, dispatch, "MortgageApplications[0].applicationDocuments", "MortgageApplicationsTemp[0].uploadedDocsInRedux");
    } else {
      dispatch(
        prepareFinalObject(
          "MortgageApplications",
          []
          )
          )
      // dispatch(
      //   prepareFinalObject(
      //     "MortgageApplicationsTemp",
      //     []
      //   )
      // )
    }
    setDocumentData(action, state, dispatch)
  }

const applyLicense = {
    uiFramework: "material-ui",
    name: "mortage-apply",
    beforeInitScreen: (action, state, dispatch) => {
        getData(action, state, dispatch)
        return action;
      },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header: {
                            gridDefination: {
                              xs: 12,
                              sm: 10
                            },
                            ...header
                          }
                    }
                },
                stepper,
                formwizardFirstStep: formwizardMortgageFirstStep,
                formwizardSecondStep:formwizardMortgageSecondStep,
                formwizardThirdStep: formwizardMortgageThirdStep,
                footer: mortgagefooter
            }
        }
    }
}

export default applyLicense;