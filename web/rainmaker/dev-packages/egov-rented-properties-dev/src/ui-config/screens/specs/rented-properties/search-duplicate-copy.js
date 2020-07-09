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
import { rentedPropertyApplication } from "./searchResource/rentedPropertyApplication";
import { searchApiCall } from "./searchResource/functions"
import { searchResults } from "./searchResource/searchResults";
import { getColonyTypes } from "./apply";
import { getStatusList } from "./search";

  const header = getCommonHeader({
    labelName: "Duplicate copy of Allotment letter",
    labelKey: "DUPLICATE_COPY_HEADER"
  });
  const duplicateCopySearchAndResult = {
    uiFramework: "material-ui",
    name: "search-duplicate-copy",
    beforeInitScreen: (action, state, dispatch) => {
      const queryObject = [{ key: "tenantId", value: getTenantId() }, 
                      { key: "businessServices", value: "DuplicateCopyOfAllotmentLetterRP" }]
      dispatch(prepareFinalObject("searchScreen", {}))
      // getColonyTypes(action, state, dispatch)
      // getStatusList(action, state, dispatch, queryObject, "search-transfer-properties", "components.div.children.ownerShipTransferApplication.children.cardContent.children.statusContainer.children.status")
      searchApiCall(state, dispatch, true)
      getStatusList(action, state, dispatch, queryObject, "search-duplicate-copy", "components.div.children.rentedPropertyApplication.children.cardContent.children.statusContainer.children.status")
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
          rentedPropertyApplication,
          breakAfterSearch: getBreak(),
          searchResults
        }
      }
    }
  };
  
  export default duplicateCopySearchAndResult;
  