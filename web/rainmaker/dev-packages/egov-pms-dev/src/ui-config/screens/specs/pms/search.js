import {
  getCommonHeader,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { RRPApplication } from "./searchResource/RRPApplication";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { searchResults } from "./searchResource/searchResults";
import {
  getTenantId,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";

import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";


const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : false;

const header = getCommonHeader({
  labelName: "Regular Retirement Pension",
  labelKey: "PENSION_REGULAR_RETIREMENT_PENSION_HEADER"
});

const pageResetAndChange = (state, dispatch) => {
  dispatch(
    prepareFinalObject("FireNOCs", [{ "fireNOCDetails.fireNOCType": "NEW" }])
  );
  // dispatch(setRoute("/tradelicence/apply"));
};

const NOCSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
  //  resetFields(state, dispatch);
    const tenantId = getTenantId();
//set search param blank
dispatch(prepareFinalObject("searchScreen",{}));

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
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
        
        RRPApplication,
        breakAfterSearch: getBreak(),       
        searchResults
      }
    },

  }
};

export default NOCSearchAndResult;
