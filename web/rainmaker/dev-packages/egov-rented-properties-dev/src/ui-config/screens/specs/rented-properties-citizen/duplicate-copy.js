import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";

const tenantId = process.env.REACT_APP_DEFAULT_TENANT_ID;

const header = getCommonHeader(
    {
      labelName: "Duplicate copy of Allotment letter",
      labelKey: "DUPLICATE_COPY_HEADER"
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
    route: `duplicate-copy-apply?tenantId=${tenantId}`
  },
  {
    label: {
        labelKey: "RP_MY_APPLICATIONS",
        labelName: "My Applications"
    },
    icon: <FormIcon />,
    route: "duplicate-copy-my-applications"
  }
]

const duplicateCopyHome = {
    uiFramework: "material-ui",
    name: "duplicate-copy",
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

export default duplicateCopyHome