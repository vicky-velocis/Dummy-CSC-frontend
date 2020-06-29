import { getCommonApplyFooter, validateFields } from "../../utils";
import { getLabel, dispatchMultipleFieldChangeAction } from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { applyOwnershipTransfer } from "../../../../../ui-utils/apply";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

const DEFAULT_STEP = -1;
const DETAILS_STEP = 0;
const DOCUMENT_UPLOAD_STEP = 1;
const SUMMARY_STEP = 2;

const moveToSuccess = (rentedData, dispatch) => {
  const id = get(rentedData, "id");
  const transitNumber = get(rentedData, "transitNumber")
  const tenantId = get(rentedData, "tenantId");
  const purpose = "apply";
  const status = "success";
  dispatch(
    setRoute(
      `/rented-properties/acknowledgement?purpose=${purpose}&status=${status}&transitNumber=${transitNumber}&tenantId=${tenantId}`
    )
  );
};


const callBackForNext = async(state, dispatch) => {
    let activeStep = get(
        state.screenConfiguration.screenConfig["apply"],
        "components.div.children.stepper.props.activeStep",
        0
    );
    let isFormValid = true;
    let hasFieldToaster = true;
    if(activeStep === DETAILS_STEP) {
        const isPropertyDetailsValid = validateFields(
            "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.detailsContainer.children",
            state,
            dispatch
        )
        const isRentHolderValid = validateFields(
            "components.div.children.formwizardFirstStep.children.rentHolderDetails.children.cardContent.children.detailsContainer.children",
            state,
            dispatch
        )
        const isAddressValid = validateFields(
            "components.div.children.formwizardFirstStep.children.addressDetails.children.cardContent.children.detailsContainer.children",
            state,
            dispatch
        )
        const isRentValid = validateFields(
            "components.div.children.formwizardFirstStep.children.rentDetails.children.cardContent.children.detailsContainer.children",
            state,
            dispatch
        )
        const isPaymentValid = validateFields(
            "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.detailsContainer.children",
            state,
            dispatch
        )
        if(!!isPropertyDetailsValid && !!isRentHolderValid && !!isRentValid && !!isPaymentValid && !!isAddressValid
            ) {
              applyOwnershipTransfer(state, dispatch, activeStep)
        } else {
            isFormValid = false;
        }
    }

    if(activeStep === DOCUMENT_UPLOAD_STEP) {

    }

    if(activeStep === SUMMARY_STEP) {
      const rentedData = get(
        state.screenConfiguration.preparedFinalObject,
        "Properties[0]"
    );
    isFormValid = await applyOwnershipTransfer(state, dispatch);
      if (isFormValid) {
          moveToSuccess(rentedData, dispatch);
      }
    }

    if(activeStep !== SUMMARY_STEP) {
        if (isFormValid) {
            changeStep(state, dispatch);
        } else if (hasFieldToaster) {
            let errorMessage = {
                labelName:
                    "Please fill all mandatory fields and upload the documents !",
                labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
            };
            switch (activeStep) {
                case DETAILS_STEP:
                    errorMessage = {
                        labelName:
                            "Please fill all mandatory fields, then do next !",
                        labelKey: "ERR_FILL_RENTED_MANDATORY_FIELDS"
                    };
                    break;
                case DOCUMENT_UPLOAD_STEP:
                    errorMessage = {
                        labelName: "Please upload all the required documents !",
                        labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
                    };
                    break;
            }
            dispatch(toggleSnackbar(true, errorMessage, "warning"));
        }
    }
}

export const changeStep = (
    state,
    dispatch,
    mode = "next",
    defaultActiveStep = -1
  ) => {
    let activeStep = get(
        state.screenConfiguration.screenConfig["apply"],
        "components.div.children.stepper.props.activeStep",
        0
    );
    if (defaultActiveStep === DEFAULT_STEP) {
        if (activeStep === SUMMARY_STEP && mode === "next") {
            activeStep = SUMMARY_STEP
            // const isDocsUploaded = get(
            //     state.screenConfiguration.preparedFinalObject,
            //     "LicensesTemp[0].reviewDocData",
            //     null
            // );
            // activeStep = isDocsUploaded ? SUMMARY_STEP : DOCUMENT_UPLOAD_STEP;
        } else {
            activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
        }
    } else {
        activeStep = defaultActiveStep;
    }
  
    const isPreviousButtonVisible = activeStep > DETAILS_STEP ? true : false;
    const isNextButtonVisible = activeStep < SUMMARY_STEP ? true : false;
    const isSubmitButtonVisible = activeStep === SUMMARY_STEP ? true : false;
    const actionDefination = [
        {
            path: "components.div.children.stepper.props",
            property: "activeStep",
            value: activeStep
        },
        {
            path: "components.div.children.footer.children.previousButton",
            property: "visible",
            value: isPreviousButtonVisible
        },
        {
            path: "components.div.children.footer.children.nextButton",
            property: "visible",
            value: isNextButtonVisible
        },
        {
            path: "components.div.children.footer.children.submitButton",
            property: "visible",
            value: isSubmitButtonVisible
        }
    ];
    dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
    renderSteps(activeStep, dispatch);
  };
  
  export const renderSteps = (activeStep, dispatch) => {
    switch (activeStep) {
        case DETAILS_STEP:
            dispatchMultipleFieldChangeAction(
                "apply",
                getActionDefinationForStepper(
                    "components.div.children.formwizardFirstStep"
                ),
                dispatch
            );
            break;
        case DOCUMENT_UPLOAD_STEP:
            dispatchMultipleFieldChangeAction(
                "apply",
                getActionDefinationForStepper(
                    "components.div.children.formwizardSecondStep"
                ),
                dispatch
            );
            break;
        default:
            dispatchMultipleFieldChangeAction(
                "apply",
                getActionDefinationForStepper(
                    "components.div.children.formwizardThirdStep"
                ),
                dispatch
            );
    }
  };
  
  export const getActionDefinationForStepper = path => {
    const actionDefination = [
        {
            path: "components.div.children.formwizardFirstStep",
            property: "visible",
            value: true
        },
        {
          path: "components.div.children.formwizardSecondStep",
          property: "visible",
          value: false
        },
        {
            path: "components.div.children.formwizardThirdStep",
            property: "visible",
            value: false
        }
    ];
    for (var i = 0; i < actionDefination.length; i++) {
        actionDefination[i] = {
            ...actionDefination[i],
            value: false
        };
        if (path === actionDefination[i].path) {
            actionDefination[i] = {
                ...actionDefination[i],
                value: true
            };
        }
    }
    return actionDefination;
  };
  
  export const callBackForPrevious = (state, dispatch) => {
    changeStep(state, dispatch, "previous");
  };

export const footer = getCommonApplyFooter({
    previousButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "16px",
          borderRadius: "inherit"
        }
      },
      children: {
        previousButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_left"
          }
        },
        previousButtonLabel: getLabel({
          labelName: "Previous Step",
          labelKey: "TL_COMMON_BUTTON_PREV_STEP"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: callBackForPrevious
      },
      visible: false
    },
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
          labelName: "Next Step",
          labelKey: "TL_COMMON_BUTTON_NXT_STEP"
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
        callBack: callBackForNext
      }
    },
    submitButton: {
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
        submitButtonLabel: getLabel({
          labelName: "Submit",
          labelKey: "TL_COMMON_BUTTON_SUBMIT"
        }),
        submitButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_right"
          }
        }
      },
      onClickDefination: {
        action: "condition",
        callBack: callBackForNext
      },
      visible: false
    }
  });