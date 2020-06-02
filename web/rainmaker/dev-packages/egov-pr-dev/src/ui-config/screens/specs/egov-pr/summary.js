import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { applicantSummary } from "./summaryResource/applicantSummary";
import { institutionSummary } from "./summaryResource/applicantSummary";
import { documentsEventSummary } from "./summaryResource/documentsSummary";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { footer,ApplySummaryfooter } from "./summaryResource/footer";
import { nocSummary } from "./summaryResource/nocSummary";
import { eventdetailsSummary } from "./summaryResource/eventdetailsSummary";
import { generateBill } from "../utils/index";
import { getTenantId ,geteventuuid} from "../../../../../../../packages/lib/egov-ui-kit/utils/localStorageUtils/index";
import {getSearchResultsView} from "../egov-pr/searchResource/citizenSearchFunctions"
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
import { debug } from "util";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Manage Event",
    labelKey: "PR_MANAGE_EVENT_HEADER"
  }),
  eventId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "eventId")
    }

  },
  status: getQueryArg(window.location.href, "status")==="null"?{}: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "StatusContainer",
    props: {
      number: getQueryArg(window.location.href, "status")
    }

  }
  
});

const prepareDocumentsView = async (state, dispatch) => {
  debugger
  let documentsPreview = [];
  let reduxDocuments = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsUploadRedux",
    {}
  );
  jp.query(reduxDocuments, "$.*").forEach(doc => {
    if (doc.documents && doc.documents.length > 0) {
      documentsPreview.push({
        title: getTransformedLocale(doc.documentCode),
        name: doc.documents[0].fileName,
        fileStoreId: doc.documents[0].fileStoreId,
        linkText: "View"
      });
    }
  });
  let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
  let fileUrls =
    fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : [];
  documentsPreview = documentsPreview.map(doc => {
    doc["link"] = fileUrls[doc.fileStoreId];
    return doc;
  });




        dispatch(prepareFinalObject("documentsPreview", documentsPreview));
    
}
const HideshowEdit = (action, Status, ) => {
  //alert('in hide show')
  set(
    action,
    "screenConfig.components.div.children.footer.children.testButton.visible",
    Status === 'UPCOMING' ?  true  : false 
  );
        // set(
        // action,
        // "screenConfig.components.div.children.footer.children.cancelButton.visible",
        // response.ResponseBody[0].status==="UPCOMING"? true : false );
       
        // set(
        //   action,
        //   "screenConfig.components.div.children.footer.children.testButton.visible",
        //   response.ResponseBody[0].status==="UPCOMING"? true : false );
      
}
const setSearchResponse = async (state, action, dispatch, tenantId,payload) => {


  let response=await getSearchResultsView(state, dispatch,payload)
  

  dispatch(prepareFinalObject("EventSummary", get(response, "ResponseBody", [])));
  // Set Institution/Applicant info card visibility
  let Status = get(state, "screenConfiguration.preparedFinalObject.EventSummary[0].status", {});
  // localStorageSet("app_noc_status", nocStatus);
  debugger
 // alert(localStorageGet("shoWHideCancel"))
localStorageGet("shoWHideCancel")==="apply"?'':HideshowEdit(action, Status);

}  
const screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: (action, state, dispatch) => {
   // alert(getQueryArg(window.location.href, "eventuuId"))
    let payload={
      "requestBody":{
              "tenantId":getTenantId(),
              "eventDetailUuid":getQueryArg(window.location.href, "eventuuId")            ,
              "scheduledStatus":"",
              "eventStatus":"PUBLISHED",
              "moduleCode":localStorageGet("modulecode"),
              
      }
      
            }
//HideShoeEdit(state, dispatch,payload,action);
    let uomsObject = get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelations[0].PublicRelationDetails.buildings[0].uomsMap"
    );
   // getSearchResultsView(state, dispatch,payload)
    setSearchResponse(state, action, dispatch, getTenantId(),payload);
    
    // if (uomsObject) {
    //   for (const [key, value] of Object.entries(uomsObject)) {
    //     let labelElement = getLabelWithValue(
    //       {
    //         labelName: key,
    //         labelKey: `NOC_PROPERTY_DETAILS_${key}_LABEL`
    //       },
    //       {
    //         jsonPath: `PublicRelations[0].PublicRelationDetails.buildings[0].uomsMap.${key}`
    //       }
    //     );
    //     set(
    //       action,
    //       `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children.${key}`,
    //       labelElement
    //     );
    //   }
    // }

    // Set Institution/Applicant info card visibility
    if (
      get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].PublicRelationDetails.applicantDetails.ownerShipType",
        ""
      ).startsWith("INSTITUTION")
    ) {
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible",
        false
      );
    } else {
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible",
        false
      );
    }

  //  generateBill(dispatch, applicationNumber, tenantId);
   // prepareDocumentsView(state, dispatch);
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
        body: getCommonCard({
         
          eventdetailsSummary: eventdetailsSummary,
         
           documentsSummary: documentsEventSummary
        }),
        footer: getQueryArg(window.location.href, "page")==="apply"?ApplySummaryfooter:footer
      }
    }
  }
};

export default screenConfig;
