import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";

import {stepper, formwizardDuplicateCopyFirstStep,formwizardDuplicateCopySecondStep,formwizardDuplicateCopyThirdStep } from '../rented-properties/applyResource/applyConfig';
import {duplicatefooter} from './footer';
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getOwnershipSearchResults, setDocsForEditFlow ,getDuplicateCopySearchResults} from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { get } from "lodash";
import { getMdmsData } from "../rented-properties/apply";
const header = getCommonHeader({
    labelName: "Apply Duplicate Copy Of Allotment",
    labelKey: "RP_COMMON_DUPLICATE_COPY_APPLY"
});


export const prepareOwnerShipDocuments = documents => {
  let documentsArr =
    documents.length > 0
      ? documents.reduce((documentsArr, item, ind) => {
        documentsArr.push({
          name: item.code,
          required: item.required,
          jsonPath: `DuplicateCopyApplications[0].applicationDocuments[${ind}]`,
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
    const findFreshLicenceItem = applications.find(item => item.code === "DuplicateCopyOfAllotmentLetterRP")
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
      "DuplicateCopyApplications[0].applicationDocuments",
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
          "DuplicateCopyApplications[0].applicationDocuments",
          applicationDocsReArranged
        )
      );
    dispatch(
      handleField(
          "duplicate-copy-apply",
          "components.div.children.formwizardSecondStep.children.ownershipTransferDuplicateDocumentsDetails.children.cardContent.children.documentList",
          "props.inputProps",
          freshLicenceDocuments
      )
  );
    dispatch(prepareFinalObject("DuplicateTemp[0].ownershipTransferDocuments", documentTypes))
}


const getData = async(action, state, dispatch) => {
  const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
  if(!!applicationNumber) {
    const queryObject = [
      {key: "applicationNumber", value: applicationNumber}
    ]
    const response = await getDuplicateCopySearchResults(queryObject);
    if (response && response.DuplicateCopyApplications) {
    dispatch(prepareFinalObject("DuplicateCopyApplications", response.DuplicateCopyApplications))
    }
    setDocsForEditFlow(state, dispatch, "DuplicateCopyApplications[0].applicationDocuments", "DuplicateTemp[0].uploadedDocsInRedux");
  } else {
    dispatch(
      prepareFinalObject(
        "DuplicateCopyApplications",
        []
        )
        )
    dispatch(
      prepareFinalObject(
        "DuplicateTemp",
        []
      )
    )
  }
  setDocumentData(action, state, dispatch)
}


const applyLicense = {
    uiFramework: "material-ui",
    name: "duplicate-copy-apply",
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
                formwizardFirstStep: formwizardDuplicateCopyFirstStep,
                formwizardSecondStep: formwizardDuplicateCopySecondStep,
                formwizardThirdStep: formwizardDuplicateCopyThirdStep,
                footer: duplicatefooter
            }
        }
    }
}

export default applyLicense;