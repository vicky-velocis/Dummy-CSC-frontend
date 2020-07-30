import {
    getCommonHeader,
    getCommonContainer,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {onTabChange, headerrow, tabs} from './search-preview'

const notices = {
    uiFramework: "material-ui",
    name: "notices",
    beforeInitScreen: (action, state, dispatch) => {
    //   transitNumber = getQueryArg(window.location.href, "transitNumber");
    //   beforeInitFn(action, state, dispatch, transitNumber);
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css search-preview"
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header1: {
                gridDefination: {
                  xs: 12,
                  sm: 8
                },
               ...headerrow
              },
              helpSection: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                props: {
                  color: "primary",
                  style: { justifyContent: "flex-end" }
                },
                gridDefination: {
                  xs: 12,
                  sm: 4,
                  align: "right"
                }
              }
              }
            },
            tabSection: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-rented-properties",
              componentPath: "CustomTabContainer",
              props: {
                tabs,
                onTabChange,
                activeIndex: 2
              },
              type: "array",
            },
            // write code for transit images
        }
      }
    }
  };

  export default notices;