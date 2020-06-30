import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";
const header = getCommonHeader(
  {
    labelName: "License",
    labelKey: "RP_COMMON_L"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);
const tenantId = process.env.REACT_APP_DEFAULT_TENANT_ID;
const cardItems = [{
    label: {
        labelKey: "Apply",
        labelName: "Apply"
    },
    icon: <TradeLicenseIcon />,
    route: `apply?tenantId=${tenantId}`
  },
  {
    label: {
        labelKey: "RP_MY_APPLICATIONS",
        labelName: "My Applications"
    },
    icon: <FormIcon />,
    route: "my-applications"
  }
]
const rentedPropertyHome = {
    uiFramework: "material-ui",
    name: "home",
    beforeInitScreen: (action, state, dispatch) => {

      return action;
    },
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
              items: cardItems,
              history: {},
              style: {
                width: "100%"
              }
            }
          },
          listCard: {
            uiFramework: "custom-molecules-local",
            moduleName: "egov-tradelicence",
            componentPath: "HowItWorks"
          }
        }
      },
    }
  };
  export default rentedPropertyHome;