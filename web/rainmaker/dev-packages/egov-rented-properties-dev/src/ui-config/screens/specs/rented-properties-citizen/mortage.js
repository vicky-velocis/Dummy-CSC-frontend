import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";

const tenantId = process.env.REACT_APP_DEFAULT_TENANT_ID;

const header = getCommonHeader(
    {
      labelName: "Mortgage",
      labelKey: "MORTAGE_HEADER"
    },
    {
      classes: {
        root: "common-header-cont"
      }
    }
  );

const cardItems = [{
    label: {
        labelKey: "Apply",
        labelName: "Apply"
    },
    icon: <TradeLicenseIcon />,
    route: `mortage-apply?tenantId=${tenantId}`
  },
  {
    label: {
        labelKey: "RP_MY_APPLICATIONS",
        labelName: "My Applications"
    },
    icon: <FormIcon />,
    route: "mortage-my-applications"
  }
]

const mortageHome = {
    uiFramework: "material-ui",
    name: "mortage",
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
        }
      }
    }

export default mortageHome