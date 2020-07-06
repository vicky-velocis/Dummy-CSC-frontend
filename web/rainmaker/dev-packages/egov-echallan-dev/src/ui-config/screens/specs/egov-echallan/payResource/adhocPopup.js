import {
  getCommonHeader, getTextField, getSelectField, getCommonContainer, getCommonSubHeader, getLabel, getPattern, getDateField
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  resetAllFields,
  showHideAdhocPopupopmsForward, showHideAdhocPopup, getBill, showHideAdhocPopupopmsReject, showHideAdhocPopupopmsReassign, showHideAdhocPopupopmsApprove,
  showHideAdhocPopupReceivePayment, showHideAdhocPopupForwardUploadDocs, callbackforsearchPreviewAction, generateReceiptNumber
} from "../../utils";
import get from "lodash/get";
import { httpRequest } from "../../../../../ui-utils/api";
import cloneDeep from "lodash/cloneDeep";
import { createEstimateData } from "../../utils";
import { prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import jp from "jsonpath";
import set from "lodash/set";
import { UpdateStatus, addToStoreViolationData } from "../../../../../ui-utils/commons";
import { documentDetails } from "./documentDetails";
import { getAccessToken, getOPMSTenantId, getLocale, getUserInfo, getapplicationNumber, getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import store from "redux/store";
import { createDemandForRoadCutNOCPOPup } from "../../utils/index";
import {
  localStorageGet, localStorageSet
} from "egov-ui-kit/utils/localStorageUtils";
import { callPGService } from "./footer";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getDateInEpoch } from "egov-ui-framework/ui-utils/commons";
import {
  toggleSpinner,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

const callBackForwardAddToStore = async (state, dispatch) => {

  let seizeditemlist = get(state, 'screenConfiguration.preparedFinalObject.eChallanSMSeizedList', {});
  let isdamageqtyavailable = true;
  let isIntactqtyavailable = true;
  let isremarkavailable = true;
  
  if (isdamageqtyavailable && isIntactqtyavailable && isremarkavailable) {
    dispatch(toggleSpinner());
    let response = await addToStoreViolationData(state, dispatch, false);
    let responseStatus = get(response, "status", "");
    dispatch(toggleSpinner());
    if (responseStatus == "SUCCESS" || responseStatus == "success") {
      dispatch(toggleSnackbar(true, {
        labelName: 'Challan verified and updated to store successfully!',
        labelKey: "", //"EC_SUCCESS_TOASTER"
      }, "success"));
    }
    else {
      dispatch(toggleSnackbar(true, {
        labelName: 'Challan verification and updation failed!. Please try after some time',
        labelKey: "", //"EC_SUCCESS_TOASTER"
      }, "error"));
    }
    callbackforsearchPreviewAction(state, dispatch);
  }

}


const popupvalidate = () => {

  let allAreFilled = true;
  let isFormValid = true;
  let hasFieldToaster = false;
  document.getElementById("material-ui-popup").querySelectorAll("[required]").forEach(function (i) {
    i.parentNode.classList.remove("MuiInput-error-853");
    i.parentNode.parentNode.classList.remove("MuiFormLabel-error-844");
    if (!i.value) {
      i.focus();
      allAreFilled = false;
      i.parentNode.classList.add("MuiInput-error-853");
      i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
    }
    if (i.getAttribute("aria-invalid") === 'true' && allAreFilled) {
      i.parentNode.classList.add("MuiInput-error-853");
      i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
      allAreFilled = false;
      isFormValid = false;
      hasFieldToaster = true;
    }
  })
  if (!allAreFilled) {
    //  alert('Fill all fields1')
    isFormValid = false;
    hasFieldToaster = true;
  }
  else {
    // alert('Submit1')

    isFormValid = true;
    hasFieldToaster = false;
  }
  return [isFormValid, hasFieldToaster]
}
const moveToReview = (state, dispatch, applnid) => {
  const documentsFormat = Object.values(get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux")
  );

  let validateDocumentField = false;

  for (let i = 0; i < documentsFormat.length; i++) {
    let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
    let isDocumentTypeRequired = get(
      documentsFormat[i], "isDocumentTypeRequired");

    let documents = get(documentsFormat[i], "documents");
    if (isDocumentRequired) {
      if (documents && documents.length > 0) {
        if (isDocumentTypeRequired) {
          if (get(documentsFormat[i], "dropdown.value")) {
            validateDocumentField = true;
          } else {
            dispatch(
              toggleSnackbar(
                true,
                { labelName: "Please select type of Document!", labelKey: "" },
                "warning"
              )
            );
            validateDocumentField = false;
            break;
          }
        } else {
          validateDocumentField = true;
        }
      } else {
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Please uplaod mandatory documents!", labelKey: "" },
            "warning"
          )
        );
        validateDocumentField = false;
        break;
      }
    } else {
      validateDocumentField = true;
    }
  }

  validateDocumentField = true;
  if (validateDocumentField) {
    return true
  }
};


const updateAdhocReject = (state, dispatch) => {

  let validatestepformflag = popupvalidate()
  let isFormValid = validatestepformflag[0];
  let hasFieldToaster = validatestepformflag[1];
  let file = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[0].documents[0].fileStoreId"
  )
  if (isFormValid) {
    const remarks = get(
      state.screenConfiguration.preparedFinalObject,
      "PetNoc[0].PetNocDetails.Reject.remarks"
    );

    let data = {}
    if (file) {
      data = {
        "uploadDocuments": [{
          "fileStoreId": get(
            state.screenConfiguration.preparedFinalObject,
            "documentsUploadRedux[0].documents[0].fileStoreId"
          )
        }],
        "remarks": remarks,
      }
    }
    else {
      data = {
        "uploadDocuments": [{
          "fileStoreId": ""
        }],
        "remarks": remarks,
      }
    }

    UpdateStatus(dispatch, '/egov-opms/search', [],

      {
        "applicationType": "PETNOC",
        "tenantId": getOPMSTenantId(),
        "applicationStatus": "REJECTED",
        "applicationId": localStorage.getItem('ApplicationNumber'),
        "dataPayload": data,
        "auditDetails": {
          "createdBy": 1,
          "lastModifiedBy": 1,
          "createdTime": 1578894136873,
          "lastModifiedTime": 1578894136873
        }
      }
    );
  }
  else {
    let errorMessage = {
      labelName:
        "Please fill all mandatory fields for Applicant Details, then proceed!",
      labelKey: "EC_ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }

};
const updateAdhocApprove = (state, dispatch) => {
  let validatestepformflag = popupvalidate()
  let isFormValid = validatestepformflag[0];
  let hasFieldToaster = validatestepformflag[1];

  if (isFormValid) {

    const remarks = get(
      state.screenConfiguration.preparedFinalObject,
      "PetNoc[0].PetNocDetails.Approve.remarks"

    );
    UpdateStatus(dispatch, '/egov-opms/search', [],

      {

        "applicationType": "PETNOC",
        "tenantId": getOPMSTenantId(),
        "applicationStatus": "APPROVED",
        "applicationId": localStorage.getItem('ApplicationNumber'),
        "dataPayload": {
          "remarks": remarks,
          "badgeNumber": get(
            state.screenConfiguration.preparedFinalObject,
            "PetNoc[0].PetNocDetails.Approve.badgeNumber"

          )

        },
        "auditDetails": {
          "createdBy": 1,
          "lastModifiedBy": 1,
          "createdTime": 1578894136873,
          "lastModifiedTime": 1578894136873
        }
      }
    );
  }
  else {
    let errorMessage = {
      labelName:
        "Please fill all mandatory fields for Applicant Details, then proceed!",
      labelKey: "EC_ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
};

const createOfflinePaymentObj = async (state, dispatch) => {

  let eChallanDetail = get(state, 'screenConfiguration.preparedFinalObject.eChallanDetail[0]', {});
  let paymentGateway = get(state, 'screenConfiguration.preparedFinalObject.eChallanReceivePayament[0].paymentMode', 'Cash');
  let billDetails = get(state, 'screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]', {});
  let CollectionPaymentDetail = {
    id: null,
    tenantId: getTenantId(),
    totalDue: billDetails.totalAmount,
    totalAmountPaid: billDetails.totalAmount,
    manualReceiptNumber: null,
    manualReceiptDate: null,
    receiptNumber: generateReceiptNumber(eChallanDetail.challanId),
    receiptDate: null,
    receiptType: null,
    businessService: null,
    billId: billDetails.billDetails[0].billId,
    bill: null,
    additionalDetails: null,
    auditDetails: null
  };

  let payment = {
    id: null,
    tenantId: getTenantId(),
    totalDue: billDetails.totalAmount,
    totalAmountPaid: billDetails.totalAmount,
    transactionNumber: eChallanDetail.challanId,
    transactionDate: getDateInEpoch(),
    paymentMode: "CASH",
    paymentGateway: paymentGateway,
    instrumentDate: getDateInEpoch(),
    instrumentNumber: eChallanDetail.challanId,
    instrumentStatus: null,
    ifscCode: null,
    auditDetails: null,
    additionalDetails: null,
    paymentDetails: [CollectionPaymentDetail],
    paidBy: eChallanDetail.violatorName,
    mobileNumber: eChallanDetail.contactNumber,
    payerName: eChallanDetail.violatorName,
    payerAddress: null,
    payerEmail: eChallanDetail.emailId,
    payerId: null,
    paymentStatus: 'PAID'
  }
  let Payments = { payment };
  let responses = await httpRequest(
    "post",
    "collection-services/payments/_create", // "/echallan-services/v1/_update",
    "", [], {
    payment
  });

  return responses;
}


const receivePaymentUpdateStatus = async (state, dispatch) => {
  let isFormValid = get(state, 'screenConfiguration.preparedFinalObject.eChallanReceivePayament[0].paymentMode', '') === '' ? false : true;
  if (isFormValid) {

    let eChallanDetail = get(state, 'screenConfiguration.preparedFinalObject.eChallanDetail[0]', {});

    let RequestBody = {
      paymentMode: 'OFFLINE',
      paymentGateway: get(state, 'screenConfiguration.preparedFinalObject.eChallanReceivePayament[0].paymentMode', 'Cash'),
      transactionId: '',
      pgStatus: 'success',
      paymentStatus: 'PAID',
      challanId: eChallanDetail.challanId,
      challanUuid: eChallanDetail.challanUuid,
      tenantId: getTenantId(),
    }

    let responses = await httpRequest(
      "post",
      "echallan-services/storeitemregister/_updateStorePayment", // "/echallan-services/v1/_update",
      "", [], {
      RequestBody
    });
    if (responses.ResponseInfo.status === 'Success') {
      let Paymentsresponses = await createOfflinePaymentObj(state, dispatch);
      if (Paymentsresponses.ResponseInfo.status === '200') {

        dispatch(setRoute(
          `/egov-echallan/acknowledgement?purpose=${"pay"}&status=${"success"}&applicationNumber=${eChallanDetail.challanId}&tenantId=${eChallanDetail.tenantId}&secondNumber=${eChallanDetail.challanId}&encroachmentType=${eChallanDetail.encroachmentType}`
        ));
      }
    }
  }
  else {
    let errorMessage = {
      labelName:
        "Please fill all mandatory fields for Applicant Details, then proceed!",
      labelKey: "EC_ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  }
};

const resetField = async (state, dispatch) => {
  const objectJsonPath = `components.receivePayment.children.popup.children.receivePaymentCard.children`;
  const children = get(
    state.screenConfiguration.screenConfig["search-preview"],
    objectJsonPath,
    {}
  );
  resetAllFields(children, dispatch, state, 'search-preview');
}

const resetCitizenField = async (state, dispatch) => {
  const objectJsonPath = `components.adhocDialog.children.popup.children.adhocPenaltyCard.children`
  const children = get(
    state.screenConfiguration.screenConfig["pay"],
    objectJsonPath,
    {}
  );
  resetAllFields(children, dispatch, state, 'pay');
}

export const paymentGatewaySelectionPopup = getCommonContainer({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Select Gateway"
              // labelKey: "NOC_SELECT_GATEWAY_BOX"
            },
            {
              style: {
                fontSize: "16px"
              }
            }
          )
        }
      },
      // div2: {
      //   uiFramework: "custom-atoms",
      //   componentPath: "Div",
      //   gridDefination: {
      //     xs: 2,
      //     sm: 2
      //   },
      //   props: {
      //     style: {
      //       width: "100%",
      //       float: "right",
      //       cursor: "pointer"
      //     }
      //   },
      //   children: {
      //     closeButton: {
      //       componentPath: "Button",
      //       props: {
      //         style: {
      //           float: "right",
      //           color: "rgba(0, 0, 0, 0.60)"
      //         }
      //       },
      //       children: {
      //         previousButtonIcon: {
      //           uiFramework: "custom-atoms",
      //           componentPath: "Icon",
      //           props: {
      //             iconName: "close"
      //           }
      //         }
      //       },
      //       onClickDefination: {
      //         action: "condition",
      //         callBack: (state, dispatch) => {

      //           showHideAdhocPopup(state, dispatch, "pay")
      //         }
      //       }
      //     }
      //   }
      // }
    }
  },
  adhocPenaltyCard: getCommonContainer(
    {
      CitizenPaymentGatewayContainer: getCommonContainer({
        CitizenPaymentGatewayCard: getSelectField({
          label: {
            labelName: "Select Gateway"
            // labelKey: "NOC_SELECT_GATEWAY"
          },
          placeholder: {
            labelName: "Select Gateway"
            //labelKey: "NOC_SELECT_GATEWAY"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "90%"
            }
          },
          optionLabel: "element",
          optionValue: "element",
          sourceJsonPath: "applyScreenMdmsData.payment",
          jsonPath: "eChallanDetail.paymentGateway"
        })
      })
    },
    {
      style: {
        marginTop: "12px"
      }
    }
  ),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        // textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "EC_ECHALLAN_PAYMENT_GATEWAY_POPUP_BUTTON_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            //screenConfiguration.screenConfig.pay.components.adhocDialog.children.popup.componentJsonpath
            resetCitizenField(state, dispatch);
            showHideAdhocPopup(state, dispatch, "pay")
          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "Submit"
            //labelKey: "NOC_SUBMIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: callPGService
        }
      }
    }
  }
});


export const adhocPopupStockViolationForwardHOD = getCommonContainer({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Remarks",
              labelKey: "EC_REMARKS_STOCK_HOD"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          )
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                showHideAdhocPopupForwardUploadDocs(state, dispatch, "search-preview")
                set(state,
                  "screenConfiguration.preparedFinalObject.violationDocuments",
                  ""
                )
              }
            }
          }
        }
      }
    }
  },

  adhocViolationForwardCard: getCommonContainer(
    {
      adhocViolationForwardContainer: getCommonContainer({
        documentDetails,
      })
    },
    {
      style: {
        marginTop: "-30px"
      }
    }
  ),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        marginTop: "20px",
        // textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "EC_POPUP_SM_RECEIVE_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            showHideAdhocPopupForwardUploadDocs(state, dispatch, "search-preview")
            set(state,
              "screenConfiguration.preparedFinalObject.violationDocuments",
              ""
            )
          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "Submit",
            labelKey: "EC_POPUP_SM_RECEIVE_SUBMIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: callBackForwardAddToStore
        }
      }
    }
  }
});


export const adhocPopupReceivePayment = getCommonContainer({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Receive Payment",
              labelKey: "EC_SM_RECEIVE_PAYMENT_POPUP_HEADER"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          )
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              // previousButtonIcon: {
              //   uiFramework: "custom-atoms",
              //   componentPath: "Icon",
              //   props: {
              //     iconName: "close"
              //   }
              // }
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                showHideAdhocPopupReceivePayment(state, dispatch, "search-preview")
                // set(state,
                //   "screenConfiguration.preparedFinalObject.documentsUploadRedux[0]",
                //   ""
                // )
              }
            }
          }
        }
      }
    }
  },

  receivePaymentCard: getCommonContainer(
    {

      receivePaymentContainer: getCommonContainer({
        receivePaymentDateField: getTextField({
          label: {
            labelName: "Enter Date",
            labelKey: "EC_POPUP_SM_RECEIVE_PAYMENT_DATE_LABEL"
          },
          placeholder: {
            labelName: "Enter Date",
            labelKey: "EC_POPUP_SM_RECEIVE_PAYMENT_DATE_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "100%"
            }
          },
          jsonPath: "eChallanReceivePayament[0].date",
          required: true,
          //pattern: /^[ A-Za-z0-9_@./#&+-]{1,250}$/i,
        }),
        receivePaymentModeField: getSelectField({
          label: {
            labelName: "Payment Mode",
            labelKey: "EC_POPUP_SM_RECEIVE_PAYMENT_MODE_LABEL"
          },
          placeholder: {
            labelName: "Select Payment Mode",
            labelKey: "EC_POPUP_SM_RECEIVE_PAYMENT_MODE_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "100%"
            }
          },
          sourceJsonPath: "applyScreenMdmsData.egec.paymentType",
          jsonPath: "eChallanReceivePayament[0].paymentMode",
          required: true,
          //pattern: /^[ A-Za-z0-9_@./#&+-]{1,250}$/i,
        }),
        receivePaymentAmountField: getTextField({
          label: {
            labelName: "Amount",
            labelKey: "EC_POPUP_SM_RECEIVE_AMOUNT_LABEL"
          },
          placeholder: {
            labelName: "Receive Amount",
            labelKey: "EC_POPUP_SM_RECEIVE_AMOUNT_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "100%"
            }
          },
          jsonPath: "eChallanReceivePayament[0].receiveamount",
          required: true,
          pattern: getPattern('Amount')
          //pattern: /^[ A-Za-z0-9_@./#&+-]{1,250}$/i,
        }),
        receivePaymentRemarkField: getTextField({
          label: {
            labelName: "Enter Remarks",
            labelKey: "EC_POPUP_SM_RECEIVE_REMARK_LABEL"
          },
          placeholder: {
            labelName: "Enter Remarks",
            labelKey: "EC_POPUP_SM_RECEIVE_REMARK_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "100%"
            }
          },
          jsonPath: "eChallanReceivePayament[0].Remark",
          required: false,
          pattern: /^[ A-Za-z0-9_@./#&+-]{1,250}$/i,
          visible: false
        }),
        //  documentDetails
      }),
    },
    {
      style: {
        marginTop: "24px"
      }
    }
  ),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        // textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "EC_POPUP_SM_RECEIVE_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            showHideAdhocPopupReceivePayment(state, dispatch, "search-preview");
            resetField(state, dispatch);
            //  const objectJsonPath = `components.receivePayment.children.popup`;


            // set(state,
            //   "screenConfiguration.preparedFinalObject.documentsUploadRedux[0]",
            //   ""
            // )
          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "SUBMIT",
            labelKey: "EC_POPUP_SM_RECEIVE_SUBMIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: receivePaymentUpdateStatus
        }
      }
    }
  }
});

export const adhocPopup3 = getCommonContainer({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Remarks",
              labelKey: "NOC_REMARKS_PET"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          )
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) =>
                showHideAdhocPopupopmsApprove(state, dispatch, "search-preview")
            }
          }
        }
      },
      // documentDetails
    }
  },
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "NOC_CANCEL_PET"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            showHideAdhocPopupopmsApprove(state, dispatch, "search-preview")

          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "Submit",
            labelKey: "NOC_SUBMIT_PET"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhocApprove
        }
      }
    }
  }
});

export const adhocPopup4 = getCommonContainer({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: getCommonHeader(
            {
              labelName: "Remarks",
              labelKey: "NOC_REMARKS_PET"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          )
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                showHideAdhocPopupopmsReject(state, dispatch, "search-preview")
                set(state,
                  "screenConfiguration.preparedFinalObject.documentsUploadRedux[0]",
                  ""
                )
              }
            }
          }
        }
      }
    }
  },

  adhocRebateCard: getCommonContainer(
    {

      rebateRejectContainer: getCommonContainer({

        // documentList: {
        //   uiFramework: "custom-containers-local",
        //   moduleName: "egov-opms",
        //   componentPath: "DocumentListContainer",
        //   props: {      
        //     buttonLabel: {
        //       labelName: "UPLOAD FILE",
        //       labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
        //     },
        //     description: "Only .jpg and .pdf files. 6MB max file size.",
        //     inputProps: {
        //       accept: ".pdf,.png,.jpeg"
        //     },
        //     maxFileSize: 1000
        //   },
        //   type: "array"
        // },

        documentDetails,
        rebateRejectField: getTextField({
          label: {
            labelName: "Enter Deviation Remarks",
            labelKey: "EC_Deviation_REMARKS_LABEL"
          },
          placeholder: {
            labelName: "Enter Deviation Remarks",
            labelKey: "EC_Deviation_REMARKS_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          props: {
            style: {
              width: "100%"
            }
          },
          jsonPath: "eChallanReceivePayament[0].deviationSMRemarks",
          required: true,
          pattern: /^[ A-Za-z0-9_@./#&+-]{1,250}$/i,

        }),


      })
    },
    {
      style: {
        marginTop: "24px"
      }
    },

  ),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "NOC_CANCEL_PET"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            showHideAdhocPopupopmsReject(state, dispatch, "search-preview")
            set(state,
              "screenConfiguration.preparedFinalObject.documentsUploadRedux[0]",
              ""
            )
          }

        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "Submit",
            labelKey: "NOC_SUBMIT_PET"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhocReject
        }
      }
    }
  }
});

