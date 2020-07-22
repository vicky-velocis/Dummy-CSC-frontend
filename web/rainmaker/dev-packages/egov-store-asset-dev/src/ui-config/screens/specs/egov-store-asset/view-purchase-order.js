import {
    getCommonHeader,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { POReviewDetails } from "./viewPurchaseOrder/po-review";
  import { poViewFooter } from "./viewPurchaseOrder/footer";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  
  export const header = getCommonContainer({
    header: getCommonHeader({
      labelName: `View Purchase Order`,
      labelKey: "STORE_PURCHASE_ORDER_VIEW"
    })
  });
  
  const tradeView = POReviewDetails(false);
  
  const getMdmsData = async (action, state, dispatch, tenantId) => {
    const tenant = tenantId || getTenantId();
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenant,
        moduleDetails: [
          {
            moduleName: "egov-hrms",
            masterDetails: [
              {
                name: "DeactivationReason",
                filter: "[?(@.active == true)]"
              }
            ]
          }
        ]
      }
    };
    try {
      const payload = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
      dispatch(prepareFinalObject("viewScreenMdmsData", payload.MdmsRes));
    } catch (e) {
      console.log(e);
    }
  };
  
  const screenConfig = {
    uiFramework: "material-ui",
    name: "view-purchase-order",
    beforeInitScreen: (action, state, dispatch) => {
    //   let employeeCode = getQueryArg(window.location.href, "employeeID");
    //   let tenantId = getQueryArg(window.location.href, "tenantId");
    //   showHideAdhocPopup(state, dispatch);
    //   getMdmsData(action, state, dispatch, tenantId);
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
          tradeView,
          footer: poViewFooter()
        }
      },
    }
  };
  
  export default screenConfig;
  