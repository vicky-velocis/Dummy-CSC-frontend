import { getBreak, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import { ServiceRequestFilterFormForEmployee } from "./searchResource/EmployeeServiceRequestsSearchForm";
import { searchResultsServiceRequest } from "./searchResource/searchResults";
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  const header = getCommonHeader({
    labelName: "Service Requests",
    labelKey: "HC_SERVICE_REQUEST_HEADER"
  });
  
  const pageResetAndChange = (state, dispatch) => {
    dispatch(
      prepareFinalObject("services", [{ "services.service_request_id": "NEW" }])
    );
    
  };

  const getMdmsData = async (dispatch) => {
  
    let tenantId = getTenantId().split(".")[0];
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants"
              }
            ]
          },
          {
            moduleName: "eg-horticulture",
            masterDetails: [
              {
                name: "ServiceType"
              },
              {
                name: "ServiceStatus"
              }
            ]
          },
          {
            moduleName: "RAINMAKER-PGR",
            masterDetails: [
              {
                name: "Sector"
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
      
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    } catch (e) {
      console.log(e);
    }};

  
  const EmployeeServiceRequestsFilter = {
    uiFramework: "material-ui",
    name: "employeeServiceRequestsFilter",
    beforeInitScreen: (action, state, dispatch) => {
      
      getMdmsData(dispatch).then(response => {  
      }) 

      
      
      
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "employeeServiceRequestsFilter"
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
          ServiceRequestFilterFormForEmployee,
          breakAfterSearch: getBreak(),
          searchResultsServiceRequest
        }
      },
        }
  };
  
  export default EmployeeServiceRequestsFilter;
  
