import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const applicationSuccessFooter = (
  state,
  dispatch,
  applicationNumber,
  tenant
) => {
  const roleExists = ifUserRoleExists("CITIZEN");
  // const redirectionURL = roleExists ? "/tradelicense-citizen/home" : "/inbox";
  const redirectionURL = roleExists ? "/" : "/inbox";
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: redirectionURL
      }
    }
  });
};
