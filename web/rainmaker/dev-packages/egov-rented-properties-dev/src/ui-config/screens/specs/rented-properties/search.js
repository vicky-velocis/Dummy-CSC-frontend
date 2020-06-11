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

  
  const header = getCommonHeader({
    labelName: "Rented Properties",
    labelKey: "TL_COMMON_RENTED_PROPERTIES"
  });
  const rentedPropertiesSearchAndResult = {
    uiFramework: "material-ui",
    name: "rented-search",
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
              addButton: getCommonContainer({
                buttonContainer: getCommonContainer({
                  searchButton: {
                    componentPath: "Button",
                    gridDefination: {
                      xs: 12,
                      sm: 6
                    },
                    props: {
                      variant: "contained",
                      style: {
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                        borderRadius: "2px",
                        width: "50%",
                        height: "48px"
                      }
                    },
                    children: {
                      buttonLabel: getLabel({
                        labelName: "MASTER ADD/UPDATE",
                        labelKey: "RP_HOME_SEARCH_ADD_UPDATE_BUTTON"
                      })
                    },
                    onClickDefination: {
            
                    }
                  }
                })
              })
            }
          },
          rentedPropertyApplication,
        }
      }
    }
  };
  
  export default rentedPropertiesSearchAndResult;
  