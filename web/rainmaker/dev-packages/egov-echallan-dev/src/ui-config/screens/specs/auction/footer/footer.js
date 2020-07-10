import {
  dispatchMultipleFieldChangeAction,
  getLabel,
  convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getCommonApplyFooter, checkForRole } from "../../utils";
import "./index.css";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { approverejectAuctionDetails ,findItemInArrayOfObject} from "../../../../../ui-utils/commons";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { toggleSpinner, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";

let roles = JSON.parse(getUserInfo()).roles;
//alert('CITIZEN');
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const callbackforsummaryaction = async (state, dispatch) => {
  debugger
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/auction/home`;
  dispatch(setRoute(reviewUrl));

};

const callbackforAuction = async (state, dispatch) => {
 debugger
  let challandetails = get(state, 'screenConfiguration.preparedFinalObject.eChallanDetail[0]', {});
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/auction/apply?challanNumber=${
    challandetails.challanId
    }&tenantId=${challandetails.tenantId}&Key=${challandetails.challanUuid}`;
  dispatch(setRoute(reviewUrl));

};

const callbackforAuctionApprove = async (state, dispatch) => {
  debugger
  try {

    dispatch(toggleSpinner());
    let response = await approverejectAuctionDetails(state, dispatch, "APPROVE");
    dispatch(toggleSpinner());
    let responseStatus = get(response, "status", "");

    if (responseStatus === 'SUCCESS' || responseStatus === 'success') {
      debugger
      dispatch(toggleSnackbar(true, {
        labelName: "Auction Details has been Approved!",
        labelKey: "EC_AUCTION_APPROVER_SUCCESS_TOASTER"
      }, "success"));
      callbackforsummaryaction(state, dispatch);
    } else {
      dispatch(toggleSnackbar(true, {
        labelName: "Submission Falied, Try Again later!",
        labelKey: "EC_AUCTION_APPROVER_FAIL_TOASTER",
      }, "warning"));
    }
  } catch (error) {
    console.log(error);
  }

};

const callbackforAuctionReject = async (state, dispatch) => {
  try {

    dispatch(toggleSpinner());
    let response = await approverejectAuctionDetails(state, dispatch, "REJECT");
    dispatch(toggleSpinner());
    let responseStatus = get(response, "status", "");
    if (responseStatus == 'SUCCESS' || responseStatus == 'success') {
      dispatch(toggleSnackbar(true, {
        labelName: "Auction Details has been Rejected!",
        labelKey: "EC_AUCTION_APPROVER_FAIL_TOASTER"
      }, "success"));
      callbackforsummaryaction(state, dispatch);
    } else {
      dispatch(toggleSnackbar(true, {
        labelName: "Submission Falied, Try Again later!",
        labelKey: "EC_AUCTION_APPROVER_FAIL_TOASTER",
      }, "warning"));
    }
  } catch (error) {
    console.log(error);
  }

};
export const titlebarfooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        height: "48px",
        minWidth: "200px",
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
        labelName: "Back",
        labelKey: "EC_ECHALLAN_COMMON_BUTTON_BACK"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforsummaryaction
    },
    visible: true
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "INITATE AUCTION",
        labelKey: "EC_AUCTION_BUTTON"
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
      callBack: callbackforAuction
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanSM"],
      action: "AUCTION"
    },
    visible: true
  },
  approveButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      approveButtonLabel: getLabel({
        labelName: "APPROVE",
        labelKey: "EC_AUCTION_APPROVE_BUTTON"
      }),
      approveButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforAuctionApprove
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanHOD"],
      action: "AUCTION"
    },
    visible: true
  },
  rejectButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      rejectButtonLabel: getLabel({
        labelName: "REJECT",
        labelKey: "EC_AUCTION_REJECT_BUTTON"
      }),
      rejectButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callbackforAuctionReject
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanHOD"],
      action: "AUCTION"
    },
    visible: true
  }
});

// const pageResetAndChange = (state, dispatch, screenKey) => {
//   let userInfo = JSON.parse(getUserInfo());
//   const roles = get(userInfo, "roles");
// if(checkForRole(roles, 'challanEAO')){    
//     isVisibility(true)
//   }

//   dispatch(prepareFinalObject("FineMaster", {}));
//   dispatch(
//     prepareFinalObject(
//       "applyScreenMdmsData.egec.EncroachmentType-new",
//       get(state, 'screenConfiguration.preparedFinalObject.applyScreenMdmsData.egec.EncroachmentType', [])
//     )
//   );
//   disabledFieldsAddEdit(state,false);
//   showHideAdhocPopup(state, dispatch, screenKey)
// };
// const isVisibility=(isVisible)=>{
  
//   if(isVisible){
//    store.dispatch(
//           handleField(
//             "search",
//             "components.adhocDialog.children.popup.children.header.children.div1.children.div",
//             "props.visible",
//             isVisible
//           )
//       ),
//       store.dispatch(
//         handleField(
//           "search",
//           "components.adhocDialog.children.popup.children.header.children.div1.children.div1",
//           "visible",
//           false
//         )
//       )
//     }
//   };
// export const footer = getCommonApplyFooter({
 
//   addButton: {
//     componentPath: "Button",
//     props: {
//       variant: "contained",
//       color: "primary",
//       style: {
//         minWidth: "200px",
//         height: "48px",
//         marginRight: "40px"
//       }
//     },
//     children: {
//       buttonLabel: getLabel({
//         labelName: "ADD FINE MASTER",
//         labelKey: 'EC_HOME_SEARCH_RESULTS_FINE_MASTER_NEW_APP_BUTTON'
//       }),
 
//     },
//        onClickDefination: {
//             action: "condition",
//             callBack: (state, dispatch) => {
//               pageResetAndChange(state, dispatch, 'create');
//             }
//           },
//           roleDefination: {
//             rolePath: "user-info.roles",
//             roles: ["challanEAO"],
//             //path : "tradelicence/apply"

//           }
//     // onClickDefination: {
//     //   action: "condition",
//     //   callBack: updateAuctioDetails
//     // }
//   },
// });
