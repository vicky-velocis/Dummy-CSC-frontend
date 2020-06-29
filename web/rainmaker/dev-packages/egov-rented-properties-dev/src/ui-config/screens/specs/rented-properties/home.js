import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";

const header = getCommonHeader(
  {
    labelName: "Trade License",
    labelKey: "TL_COMMON_TL"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const cardItems = [
    {
        label: {
            labelKey: "RP_MASTER_PROPERTY_SEARCH",
            labelName: "Master Properties"
        },
        icon: <TradeLicenseIcon />,
        route: `search`
    },
    {
        label: {
            labelKey: "RP_TRANSFER_PROPERTY",
            labelName: "Transfer Properties"
        },
        icon: <TradeLicenseIcon />,
        route: `search-transfer-properties`
    },
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
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-tradelicence",
          componentPath: "HowItWorks"
        }
      }
    }
  }
};

export default rentedPropertyHome;
