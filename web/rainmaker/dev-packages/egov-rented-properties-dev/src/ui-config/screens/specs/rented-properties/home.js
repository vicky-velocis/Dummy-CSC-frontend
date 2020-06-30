import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import "../utils/index.css";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";

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

  const cardItems = [{
    label: {
        labelKey: "MASTER_ENTRY",
        labelName: "Master Entry"
    },
    icon: <FormIcon />,
    route: "search"
  },
  {
    label: {
        labelKey: "OWNERSHIP_TRANSFER",
        labelName: "Ownership Transfer"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  }
]


  const home = {
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
              items: cardItems,
              history: {}
            }
          },
        //   listCard: {
        //     uiFramework: "custom-molecules-local",
        //     moduleName: "egov-tradelicence",
        //     componentPath: "HowItWorks"
        //   }
        }
      }
      }
    }
  
  export default home;