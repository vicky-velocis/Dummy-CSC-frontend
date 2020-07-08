import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { serachReportPaymentDetailGrid } from "./searchReportResource/serachResultGrid";
import { searchTextPaymentDetailsreport } from "./searchReportResource/searchTextPaymentDetailsreport";
import { setapplicationType, getTenantId } from "egov-ui-kit/utils/localStorageUtils/";
import { fetchMdmsData } from "../../../../ui-utils/commons";
import { resetAllFields } from "../utils";
import get from "lodash/get";

const header = getCommonHeader({
  labelName: "Payment Details Report",
  labelKey: "EC_PAYMENT_DETAIL_REPORT_HEADER"
});

const getMdmsData = async (action, state, dispatch) => {
  try {
    let tenantId = getTenantId().length > 2 ? getTenantId().split('.')[0] : getTenantId();
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "egec",
            masterDetails: [
              {
                name: "paymentStatus"
              },
              {
                name : "sector"
              }
            ]
          }
        ]
      }
    };
    await fetchMdmsData(state, dispatch, mdmsBody, false);

  } catch (e) {
    console.log(e);
  }
};

const PAYMENTDETAILSearchAndResult = {
  uiFramework: "material-ui",
  name: "reportPaymentDetails",
  beforeInitScreen: (action, state, dispatch) => {
    setapplicationType('paymentDetails-Report');
    const objectJsonPath = `components.div.children.searchTextPaymentDetailsreport.children.cardContent.children`;
  const children = get(
    state.screenConfiguration.screenConfig["reportPaymentDetails"],
    objectJsonPath,
    {}
  );
  resetAllFields(children, dispatch, state, 'reportPaymentDetails');
  
    getMdmsData(action, state, dispatch);

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "serachReportPaymentDetailGrid"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },
          }
        },
        searchTextPaymentDetailsreport,
        breakAfterSearch: getBreak(),
        serachReportPaymentDetailGrid
      }
    }
  }
};

export default PAYMENTDETAILSearchAndResult;
