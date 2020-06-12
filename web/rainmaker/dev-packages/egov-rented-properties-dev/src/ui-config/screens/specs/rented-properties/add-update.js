import {
    getCommonHeader,
    getLabel,
    getBreak,
    getStepperObject,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils";
  import find from "lodash/find";
  import get from "lodash/get";

  export const stepsData = [
    { labelName: "Details", labelKey: "RP_COMMON_TR_DETAILS" },
    { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }
  ];
  export const stepper = getStepperObject(
    { props: { activeStep: 0 } },
    stepsData
  );

  
  const header = getCommonHeader({
    labelName: "Rented Properties Add Update",
    labelKey: "RP_COMMON_RENTED_PROPERTIES_ADD_UPDATE"
  });
  const rentedPropertiesAddUpdate = {
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
              }
            }
          },
          stepper,
        }
      }
    }
  };
  
  export default rentedPropertiesAddUpdate;