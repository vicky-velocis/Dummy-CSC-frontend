import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { serachResultGrid } from "./searchResource/serachResultGrid";
import { searchResultApiResponse } from './searchResource/searchResultApiResponse'
import { footer } from "./challanManage/footer/manageChallanFooter"
import { getTenantId, getUserInfo, setapplicationType } from "egov-ui-kit/utils/localStorageUtils/";
import { clearlocalstorageAppDetails, checkForRole } from "../utils";

let roles = JSON.parse(getUserInfo()).roles;

const header = getCommonHeader({
  labelName: "Manage Challan",
  labelKey: 'EC_MANAGE_CHALLAN'
});

const MANAGECHALLANSearchAndResult = {
  uiFramework: "material-ui",
  name: "echallan-landing",
  beforeInitScreen: (action, state, dispatch) => {
    clearlocalstorageAppDetails(state);
    setapplicationType('egov-echallan');
    searchResultApiResponse(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "serachResultGrid"
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
            
            footer: checkForRole(roles, 'challanSI') ? footer: {}
          }
        },
        breakAfterSearch: getBreak(),
        serachResultGrid
      }
    },
  }
};

export default MANAGECHALLANSearchAndResult;
