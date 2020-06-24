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
import { documentsSummary } from "./summaryResource/tenderDocumentsSummary";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { footer } from "./summaryResource/footer";
import { nocSummary } from "./summaryResource/nocSummary";
import { tenderPublishSummary } from "./summaryResource/tenderSummary";

import {
  getAccessToken,
  getTenantId,
  getLocale,
  getUserInfo,
  getapplicationNumber,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import {getSearchResultsforTenderView} from "./searchResource/citizenSearchFunctions"
import { tenderSummaryfooter } from './applyResource/tenderFooter'
import {
  tenderSummary
} from "./summaryResource/tenderSummary";
const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Manage Event",
    labelKey: "PR_MANAGE_EVENT_HEADER"
  }),
  tenderId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "tenderId")
    }

  },
});

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
  name: "tender-Summary",
  beforeInitScreen: (action, state, dispatch) => {
    let payload={
      "RequestBody": {
        "tenantId": getTenantId(),
        "moduleCode": localStorageGet("modulecode"),
       
        "tenderNoticeUuid": getQueryArg(window.location.href, "tenderuuId"),
        "tenderNoticeId": getQueryArg(window.location.href, "tenderId"),
        "fileNumber":"",
        "tenderSubject":"",
        "tenderNoticeStatus":"",
        "fromDate":"",
        "toDate":"",
         "defaultGrid":true
    }}
    getSearchResultsforTenderView(state, dispatch,payload)
  
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
        body: getCommonCard({
          tenderSummary: tenderPublishSummary,
            documentsSummary: documentsSummary,
        }),
       tenderSummaryfooter: tenderSummaryfooter
      }
    }
  }
};

export default screenConfig;
