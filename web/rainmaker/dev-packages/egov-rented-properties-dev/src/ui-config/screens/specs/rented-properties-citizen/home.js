import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";

const header = getCommonHeader(
  {
    labelName: "Rented Properties",
    labelKey: "RP_COMMON_RENTED_PROPERTIES"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const cardItems = [{
  label: {
    labelKey: "Transfer of Transit site In case of Legal Heir (Ownership Transfer)",
    labelName: "OWNER_SHIP_TRANSFER_HEADER"
  },
  icon: <TradeLicenseIcon />,
  route: `ownership-transfer`
  },
  {
    label: {
      labelKey: "Duplicate copy of Allotment letter",
      labelName: "DUPLICATE_COPY_HEADER"
    },
    icon: <TradeLicenseIcon />,
    route: `duplicate-copy`
    },
    {
      label: {
        labelKey: "Mortgage",
        labelName: "MORTAGE_HEADER"
      },
      icon: <TradeLicenseIcon />,
      route: `mortage`
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