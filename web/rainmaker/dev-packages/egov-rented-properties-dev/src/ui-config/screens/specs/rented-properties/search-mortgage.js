import {
    getCommonHeader,
    getLabel,
    getBreak,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import find from "lodash/find";
import get from "lodash/get";
import { searchMortgageApplication } from "./searchResource/rentedPropertyApplication";
import { searchMortgage } from "./searchResource/functions"
import { mortgageSearchResults } from "./searchResource/searchResults";
import { getColonyTypes } from "./apply";

  const header = getCommonHeader({
    labelName: "Mortgage",
    labelKey: "MORTAGE_HEADER"
  });
  const transferPropertiesSearchAndResult = {
    uiFramework: "material-ui",
    name: "search-mortgage",
    beforeInitScreen: (action, state, dispatch) => {
      dispatch(prepareFinalObject("searchScreen", {}))
      searchMortgage(state, dispatch, true)
      return action
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
              }
            }
          },
          searchMortgageApplication,
          breakAfterSearch: getBreak(),
          mortgageSearchResults
        }
      }
    }
  };
  
  export default transferPropertiesSearchAndResult;
  