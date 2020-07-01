import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";
import TradeLicenseIcon from "../../../../ui-atoms-local/Icons/TradeLicenseIcon";
import "../utils/index.css";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const tenantId = getTenantId();

const header = getCommonHeader(
    {
      labelName: "Account Statement Generation",
      labelKey: "ACCOUNT_STATEMENT_GENERATION_HEADER"
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
    route: `account-statement-apply?tenantId=${tenantId}`
  },
  {
    label: {
        labelKey: "RP_MY_APPLICATIONS",
        labelName: "My Applications"
    },
    icon: <FormIcon />,
    route: "account-statement-my-applications"
  }
]

const accountStatementHome = {
    uiFramework: "material-ui",
    name: "account-statement",
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

export default accountStatementHome