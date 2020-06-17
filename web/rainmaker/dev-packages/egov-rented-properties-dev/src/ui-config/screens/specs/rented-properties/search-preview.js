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
import set from "lodash/set";
  


const header = getCommonHeader({
    labelName: "Rented Properties",
    labelKey: "TL_COMMON_RENTED_PROPERTIES"
});

const transitNumber = null;

const rentedPropertiesDetailPreview = {
    uiFramework: "material-ui",
    name: "rented-search",
    beforeInitScreen: (action, state, dispatch) => {
        transitNumber = getQueryArg(window.location.href, "transitNumber");
        console.log(transitNumber);
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
              }
            }
          }
        }
      }
    }
  };
  
  export default rentedPropertiesDetailPreview;
  

