import get from "lodash/get";
import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getButtonVisibility,
  getCommonApplyFooter,
  ifUserRoleExists,
  epochToYmd,
  validateFields
} from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import "./index.css";
import { getSearchResults } from "../../../../../ui-utils/commons";

const moveToReview = dispatch => {
  const IndentId = getQueryArg(window.location.href, "IndentId");
  const reviewUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/egov-store-asset/reviewmaterialreceipt?step=0`
      : `/egov-store-asset/reviewmaterialreceipt?step=0`;
  dispatch(setRoute(reviewUrl));
};
const getpurchaseOrder = async ( state,dispatch)=>{
  const tenantId = getTenantId();
  let storecode = get(state,"screenConfiguration.preparedFinalObject.materialReceipt[0].receivingStore.code",'')
  let suppliercode = get(state,"screenConfiguration.preparedFinalObject.materialReceipt[0].supplier.code",'')
 // alert(storecode +'_'+suppliercode)
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }];
    queryObject.push({
      key: "store",
      value: storecode
    });
    if(suppliercode)
    {
    queryObject.push({
      key: "supplierCode",
      value: suppliercode
    });
  }
  try {
    let response = await getSearchResults(queryObject, dispatch,"purchaseOrder");
    dispatch(prepareFinalObject("purchaseOrder", response));
  } catch (e) {
    console.log(e);
  }
}
export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["createMaterialReceiptNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  let isFormValid = true;
  if (activeStep === 0) {
    const isMaterialDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.MaterialReceiptNote.children.cardContent.children.MaterialReceiptNoteContainer.children",
      state,
      dispatch,
      "createMaterialReceiptNote"
    );
    
    if (!(isMaterialDetailsValid)) {
      isFormValid = false;
    }
  }
  if (activeStep === 1) {
    let storeDetailsCardPath =
      "components.div.children.formwizardSecondStep.children.materialReceiptDetail.children.cardContent.children.materialReceiptCard.props.items";
    let storeDetailsItems = get(
      state.screenConfiguration.screenConfig.createMaterialReceiptNote,
      storeDetailsCardPath,
      []
    );
    let isstoreDetailsValid = true;
    for (var j = 0; j < storeDetailsItems.length; j++) {
      if (
        (storeDetailsItems[j].isDeleted === undefined ||
          storeDetailsItems[j].isDeleted !== false) &&
        !validateFields(
          `${storeDetailsCardPath}[${j}].item${j}.children.cardContent.children.materialReceiptCardContainer.children`,
          state,
          dispatch,
          "createMaterialReceiptNote"
        )
      )
        isstoreDetailsValid = false;
    }
    if (!isstoreDetailsValid) {
      isFormValid = false
    }
  }
  if (activeStep === 2) {   
    let isPuchasingInformationValid = validateFields(
      "components.div.children.formwizardThirdStep.children.otherDetails.children.cardContent.children.View1.children.cardContent.children.PuchasingInformationContainer.children",
      state,
      dispatch,
      "createMaterialReceiptNote"
    );
    isPuchasingInformationValid = true;
    
    if (!isPuchasingInformationValid) {
      isFormValid = false;
    }
    if(isFormValid)
    {
      moveToReview(dispatch);
    
  }
    else{

      const errorMessage = {
        labelName: "Please fill all fields",
        labelKey: "ERR_FILL_ALL_FIELDS"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));

    }
  }
  if (activeStep !== 2) {
    if (isFormValid) {
        
      const CurrentDate = new Date();

      let receiptDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].receiptDate",
        null
      );
      let supplierBillDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].supplierBillDate",
        null
      );
      let challanDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].challanDate",
        null
      );
      let inspectionDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].inspectionDate",
        null
      );
    
      if(Number(receiptDate))
      receiptDate = epochToYmd(receiptDate)
      if(Number(supplierBillDate))
      supplierBillDate = epochToYmd(supplierBillDate)
      if(Number(challanDate))
      challanDate = epochToYmd(challanDate)
      if(Number(inspectionDate))
      inspectionDate = epochToYmd(inspectionDate)
      const  receiptDate_ = new Date(receiptDate)
      const  supplierBillDate_ = new Date(supplierBillDate)
      const  challanDate_ = new Date(challanDate)
      const  inspectionDate_ = new Date(inspectionDate)
      let IsValidDate = true
      let IsValidStartDate = true  
      if(receiptDate_>CurrentDate || supplierBillDate_> CurrentDate|| challanDate_> CurrentDate|| inspectionDate_> CurrentDate)
    {
      IsValidDate = false
    }
    if(IsValidDate)
    {
      let activeStep = get(
        state.screenConfiguration.screenConfig["createMaterialReceiptNote"],
        "components.div.children.stepper.props.activeStep",
        0
      );
        if(activeStep ===0)
        {
          getpurchaseOrder(state, dispatch);
        }
        if(activeStep ===1)
        {
        // check validation for file uplaod
        if (get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux") !== undefined) {
        let fileUrl =
        get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux[0].documents[0].fileUrl",'') 
        let fileName =
        get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux[0].documents[0].fileName",'') 
        if(fileUrl) 
        {
        fileUrl = getFileUrl(fileUrl)
        }
        let  documentsPreview= [
        {
        title: "STORE_DOCUMENT_TYPE_MATERIAL_RECEIPT_NOTE",
        linkText: "VIEW", 
        link:fileUrl,//"https://chstage.blob.core.windows.net/fileshare/ch/undefined/July/15/1594826295177document.pdf?sig=R3nzPxT9MRMfROREe6LHEwuGfeVxB%2FKneAeWrDJZvOs%3D&st=2020-07-15T15%3A21%3A01Z&se=2020-07-16T15%3A21%3A01Z&sv=2016-05-31&sp=r&sr=b",
        name: fileName, 
        },]

        dispatch(
        prepareFinalObject("documentsPreview", documentsPreview)
        );
        changeStep(state, dispatch);
        }

        else{
        dispatch(
        toggleSnackbar(
        true,
        { labelName: "Please uplaod mandatory documents!", labelKey: "" },
        "warning"
        ))

        }
        }
        else{
          changeStep(state, dispatch);
        }

       

      }
      else{
        const errorMessage = {
          labelName: "Input Date Must be less then or equal to current date",
          labelKey: "STORE_MATERIAL_MASTER_CURRENT_DATE_VALIDATION"
        };
        dispatch(toggleSnackbar(true, errorMessage, "warning"));

      }
     
    } 
    else {
      const errorMessage = {
        labelName: "Please fill all fields",
        labelKey: "ERR_FILL_ALL_FIELDS"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
};
export const getFileUrl = (linkText="") => {
  const linkList = linkText.split(",");
  let fileURL = '';
  linkList&&linkList.map(link => {
    if (!link.includes('large') && !link.includes('medium') && !link.includes('small')) {
      fileURL = link;
    }
  })
  return fileURL;
}
export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["createMaterialReceiptNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 4 ? true : false;
  const isPayButtonVisible = activeStep === 4 ? true : false;
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
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("createMaterialReceiptNote", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "createMaterialReceiptNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "createMaterialReceiptNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "createMaterialReceiptNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    case 3:
      dispatchMultipleFieldChangeAction(
        "createMaterialReceiptNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "createMaterialReceiptNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFifthStep"
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
    },
   
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
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
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
        labelKey: "STORE_COMMON_BUTTON_PREV_STEP"
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
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "STORE_COMMON_BUTTON_NXT_STEP"
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
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "STORE_COMMON_BUTTON_SUBMIT"
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
