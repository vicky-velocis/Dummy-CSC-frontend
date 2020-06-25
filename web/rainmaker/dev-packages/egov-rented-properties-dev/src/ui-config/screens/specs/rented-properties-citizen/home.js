import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import "../utils/index.css";

const header = getCommonHeader(
  {
    labelName: "Rented Properties",
    labelKey: "RP_COMMON_RP"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: [],
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-rented-properties",
          componentPath: "HowItWorks"
        }
      }
    }
  }
};

export default tradeLicenseSearchAndResult;