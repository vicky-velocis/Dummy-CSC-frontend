import {
    getBreak,
    getCommonCard,
    getCommonContainer,
    getCommonHeader,
    getLabelWithValue,
    getStepperObject,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import {getSearchResultsforTenderViewBilling} from "./searchResource/citizenSearchFunctions"
  
  import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
  
  import {
    getFileUrlFromAPI,
    getQueryArg,
    getTransformedLocale,
    setBusinessServiceDataToLocalStorage
  } from "egov-ui-framework/ui-utils/commons";
  import jp from "jsonpath";
  import get from "lodash/get";
  import set from "lodash/set";
  import {
    tenderBillingSummary,tenderBillingNoteSummary,tenderBillingSubjectSummary
  } from "./summaryResource/tenderSummary";
  import {tenderBillingDetail} from "./searchResource/tenderMaster"
  import { documentsSummary } from "./summaryResource/tenderDocumentsSummary";
  import {
    getAccessToken,
    getTenantId,
    getLocale,
    getUserInfo,
    getapplicationNumber
  } from "egov-ui-kit/utils/localStorageUtils";
  import {
    createUpdateRoadCutNocApplication
  } from "../../../../ui-utils/commons";
  import { tenderSummaryfooter } from './applyResource/tenderFooter'
  import { httpRequest } from "../../../../ui-utils";
  import { documentBillingDetails } from "./applyResource/documentDetails";
  import {
    prepareDocumentsUploadData,
    getSearchResults,
    furnishNocResponse,
    setApplicationNumberBox
  } from "../../../../ui-utils/commons";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  
  
  const getMdmsData = async (action, state, dispatch) => {
    let tenantId =
      get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].PublicRelationDetails.propertyDetails.address.city"
      ) || getTenantId();
  
      //let tenantId =    
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "RAINMAKER-PR",
            masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" },  { name: "eventSector" }]
          },
         
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants"
              }
            ]
          },
  
  
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants"
              }
            ]
          },
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Department"
              }
            ]
          },
        ]
      }
    };
    try {
      let payload = null;
      payload = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
      debugger
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    } catch (e) {
      console.log(e);
    }
  };

  export const callBackForDelete = async (state, dispatch) => {
    changeStep(state, dispatch, "previous");
  };
  
  const titlebar = getCommonContainer({
    header: getCommonHeader({
      labelName: "Tender Notice Details",
      labelKey: "PR_TENDER_NOTICE_DETAILS"
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-pr",
      componentPath: "ApplicationNoContainer",
      props: {
        number: getapplicationNumber(),
      }
    }
  });

  const screenConfig = {
    uiFramework: "material-ui",
    name: "tender-summary-billing",
   beforeInitScreen: (action, state, dispatch) => {
    let payload={
      "RequestBody": {
        "tenantId": getTenantId(),
        "moduleCode":localStorageGet("modulecode"),
        "tenderNoticeStatus":"FORWARD",
        "tenderNoticeUuid":"390f31e1-6fca-469f-97a6-e2a3d0d4c724",
        "tenderNoticeId":"PMS-2020-04-20-044442"
    }}
    getSearchResultsforTenderViewBilling(state, dispatch,payload)

      getMdmsData(action, state, dispatch).then(response => {
        debugger
      prepareDocumentsUploadData(state, dispatch, 'create_event');
    });
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
                ...titlebar
              }
            }
          },
         
          body:  getCommonCard({         
            tenderBillingSummary: tenderBillingSummary,
          }),
          tenderBillingSubjectSummary,
          tenderBillingNoteSummary,
          tenderBillingDetail,
          documentBillingDetails,
          tenderSummaryfooter,
        }
      }
    }
  };
  
  export default screenConfig;
  