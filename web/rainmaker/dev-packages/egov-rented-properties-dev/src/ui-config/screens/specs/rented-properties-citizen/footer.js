import { getCommonApplyFooter, validateFields } from "../utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { applyOwnershipTransfer } from "../../../../ui-utils/apply";
import { previousButton, submitButton, nextButton, changeStep, moveToSuccess, DETAILS_STEP, DOCUMENT_UPLOAD_STEP, SUMMARY_STEP } from "../rented-properties/applyResource/footer";

const callBackForNext = async(state, dispatch) => {
    let activeStep = get(
        state.screenConfiguration.screenConfig["apply"],
        "components.div.children.stepper.props.activeStep",
        0
    );
    let isFormValid = true;
    let hasFieldToaster = true;
    if(activeStep === DETAILS_STEP) {
        const isOwnerDetailsValid = validateFields(
          "components.div.children.formwizardFirstStep.children.applicantDetails.children.cardContent.children.detailsContainer.children",            state,
            dispatch
        )
        const isAddressDetailsValid = validateFields(
          "components.div.children.formwizardFirstStep.children.ownershipAddressDetails.children.cardContent.children.detailsContainer.children",            state,
            dispatch
        )
        if(!!isOwnerDetailsValid && !!isAddressDetailsValid) {
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
            changeStep(state, dispatch, "ownership-apply");
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

const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "ownership-apply", "previous");
};

export const footer = getCommonApplyFooter({
    previousButton: {
      ...previousButton,
      onClickDefination: {
        action: "condition",
        callBack: callBackForPrevious
      },
    },
    nextButton: {
      ...nextButton,
      onClickDefination: {
        action: "condition",
        callBack: callBackForNext
      }
    },
    submitButton: {
      ...submitButton,
      onClickDefination: {
        action: "condition",
        callBack: callBackForNext
      },
    }
  });