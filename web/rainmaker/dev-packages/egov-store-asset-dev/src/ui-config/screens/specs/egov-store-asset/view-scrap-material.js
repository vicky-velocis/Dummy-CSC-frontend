import {
    getCommonHeader,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { ScrapReviewDetails } from "./viewScrapMaterialResource/scrap-review";
  import { poViewFooter } from "./viewScrapMaterialResource/footer";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getSearchResults } from "../../../../ui-utils/commons";
  export const header = getCommonContainer({
    header: getCommonHeader({
      labelName: `View Scrap Material`,
      labelKey: "STORE_SCRAP_VIEW"
    })
  });
  
  const tradeView = ScrapReviewDetails(false);
  
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

  const fetchEmployeeDetails = async(response,dispatch) => {
    
    const queryParams = [{ key: "ids", value: response.scraps[0].auditDetails.createdBy },{ key: "tenantId", value:  getTenantId() }];
    try { 
      const payload = await httpRequest(
        "post",
        "/egov-hrms/employees/_search",
        "_search",
        queryParams
      );
      if(payload){
        dispatch(prepareFinalObject("scraps[0].createdBy",payload.Employees[0].user.name));  
      }

    } catch (e) {
      console.log(e);
    }
  }
  
  const screenConfig = {
    uiFramework: "material-ui",
    name: "view-scrap-material",
    beforeInitScreen: (action, state, dispatch) => {
      let scrapNumber = getQueryArg(window.location.href, "scrapNumber");
      let tenantId = getQueryArg(window.location.href, "tenantId");
      const queryObject = [{ key: "tenantId", value: tenantId},{ key: "scrapNumber", value: scrapNumber}];
      getSearchResults(queryObject, dispatch,"scrap")
      .then(response =>{
        if(response){
          dispatch(prepareFinalObject("scraps", [...response.scraps]));    
          fetchEmployeeDetails(response,dispatch);
        }
      })


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
  