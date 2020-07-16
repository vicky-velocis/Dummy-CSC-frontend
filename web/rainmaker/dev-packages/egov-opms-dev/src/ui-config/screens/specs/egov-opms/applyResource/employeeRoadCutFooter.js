import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getCommonApplyFooter,
  showHideAdhocPopupopmsReject,
  showHideAdhocPopupopmsReassign,
  showHideAdhocPopupopmsApprove,
  showHideAdhocPopupopmsForward, checkForRole
} from "../../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  toggleSnackbar,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import "./customfooter.css";
import {
  getAccessToken,
  getOPMSTenantId,
  getLocale,
  getUserInfo,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import { getapplicationType } from "egov-ui-kit/utils/localStorageUtils";
import { callbackforSummaryActionCancel, callbackforSummaryActionSubmit } from '../roadcutnoc_summary'
import store from "ui-redux/store";

let roles = JSON.parse(getUserInfo()).roles

const callbackforsummaryactionpay = async (dispatch) => {
  let tenantId = getOPMSTenantId();
  //alert("enter here")
  const applicationid = getQueryArg(window.location.href, "applicationNumber");
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-opms/pay?applicationNumber=${applicationid}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));

}


const certificateDownloadObjectROADCUT = {
  label: { labelName: "NOC Certificate ROADCUT", labelKey: "NOC_CERTIFICATE_ROADCUT" },
  link: () => {
    showHideAdhocPopupopmsForward(store.getState(), store.dispatch, "roadcutnoc-search-preview", "nextButton")
  },
  leftIcon: "book"
};
const downloadMenu = [
  certificateDownloadObjectROADCUT
];

export const footer = getCommonApplyFooter({
  // downloadMenu: {
  //   uiFramework: "custom-atoms-local",
  //   moduleName: "egov-opms",
  //   componentPath: "MenuButton",
  //   props: {
  //     data: {
  //       label: "Download",
  //       leftIcon: "cloud_download",
  //       rightIcon: "arrow_drop_down",
  //       props: { variant: "outlined", style: { marginLeft: 10 } },
  //       menu: downloadMenu
  //     }
  //   }
  // },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "FORWARD",
        labelKey: "FORWARD"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => showHideAdhocPopupopmsForward(state, dispatch, "roadcutnoc-search-preview", "nextButton")
    },
    visible: checkForRole(roles, 'JE') || checkForRole(roles, 'SDO') || checkForRole(roles, 'EE') || checkForRole(roles, 'SE') ? true : false

  },
  reject: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "REJECT",
        labelKey: "REJECT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {


        showHideAdhocPopupopmsReject(state, dispatch, "roadcutnoc-search-preview", "reject")
      }
    },
    visible: false
  },
  reassign: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "REASSIGN",
        labelKey: "REASSIGN"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",

      callBack: (state, dispatch) => {


        showHideAdhocPopupopmsReassign(state, dispatch, "roadcutnoc-search-preview", "reject")
      }
    },
    visible: checkForRole(roles, 'JE') || checkForRole(roles, 'SDO') || checkForRole(roles, 'CE') || checkForRole(roles, 'EE') || checkForRole(roles, 'SE') ? true : false
  },
  approve: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "APPROVE",
        labelKey: "APPROVE"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        showHideAdhocPopupopmsApprove(state, dispatch, "roadcutnoc-search-preview", "reject")
      }
    },
    visible: false
  },
  MakePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "MakePayment",
        labelKey: "NOC_COMMON_BUTTON_MAKE_PAYMENT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        callbackforsummaryactionpay(dispatch);
      }
    },
    visible: false
  },
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",

      }
    },
    children: {
      cancelButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "NOC_CANCEL_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforSummaryActionCancel
    },
    visible: false
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "SEND",
        labelKey: "NOC_SUBMIT_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforSummaryActionSubmit
    }
  }

});
