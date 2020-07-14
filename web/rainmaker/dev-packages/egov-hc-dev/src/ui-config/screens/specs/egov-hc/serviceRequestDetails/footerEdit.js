import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getapplicationNumber, getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { EditServiceRequest } from "../../../../../ui-utils/commons";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
import {  handleScreenConfigurationFieldChange as handleField} from "egov-ui-framework/ui-redux/screen-configuration/actions";  
  
  let role_name = JSON.parse(getUserInfo()).roles[0].code

  

  const callBackForNext = async (state, dispatch) => {
   
    let servicerequestmedia = get(state, "form.newapplication.files.media", []);
  
  
  let media = []
  let addressDetail = []
  let services = []
  let hasFieldToaster = false;
    
  
  servicerequestmedia.map((item, index) => {
    media.push(item.fileStoreId)
  });
  
  
  let serviceRequest = get(state,
    "screenConfiguration.preparedFinalObject.SERVICEREQUEST"
  );
  

  
  let validatestepformflag = false ; 
    let uploadFlag = false;
    // alert(media.length);
    if(media.length >= 0)
    {
      validatestepformflag = validatestepform(serviceRequest);
    }
    else{
      dispatch(
        toggleSnackbar(
          true,
          { labelName: "Upload At least One Image..!", labelKey: "HC_UPLOAD_IMAGE_ERROR" },
          "warning"
        )
      );
    }
  
    let activeStep = 1;
    let isFormValid = true;

    isFormValid = validatestepformflag[0];
    hasFieldToaster = validatestepformflag[1];
    services.push(serviceRequest)
  
      if (isFormValid) {
        // let responseStatus = "success";
        if (activeStep === 1) {
          
          let status = 'INITIATED'
          serviceRequest['city']= getTenantId(),
          // serviceRequest['tenantId']= getTenantId(),
          serviceRequest['media'] = media,
          serviceRequest['isEditState'] = 1,
          serviceRequest['address'] = 'hardcoded value'
          dispatch(
            handleField(
              "apply",
              "components.div.children.footerEdit.children",
              "nextButton.visible",
              false
            )
          );  
          let response = await EditServiceRequest(state, dispatch, status);
          // debugger;
          
          let responseStatus = get(response, "status", "");
          // let serviceRequestId = get(response, "service_request_id", "");
          let serviceRequestId = getapplicationNumber();
          if (responseStatus == "successful" || responseStatus == "SUCCESSFUL") {
 
            if (isFormValid) {
              
                dispatch(setRoute(`/egov-hc/acknowledgementServiceRequestUpdate?serviceRequestId=${serviceRequestId}&isEditState=${1}`));
            }
          } else {
            dispatch(
              handleField(
                "apply",
                "components.div.children.footerEdit.children",
                "nextButton.visible",
                true
              )
            );
            let errorMessage = {
              labelName: "Submission Falied, Try Again later!",
              labelKey: "ERR_DEFAULT_INPUT_FIELD_MSG" //UPLOAD_FILE_TOAST
            };
            dispatch(toggleSnackbar(true, errorMessage, "error"));
          }
        }
        // responseStatus === "success" && changeStep(state, dispatch);
      } else if (hasFieldToaster) {
        let errorMessage = {
          labelName: "Please fill all mandatory fields !",
          labelKey: "ERR_DEFAULT_INPUT_FIELD_MSG"
        };
        switch (activeStep) {
          case 1:
            errorMessage = {
              labelName:
                "Please check the Missing/Invalid field for Property Details, then proceed!",
              // labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
              labelKey:"ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            break;
          case 2:
            errorMessage = {
              labelName:
                "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            break;
        }
        dispatch(toggleSnackbar(true, errorMessage, "warning"));
      }
    };
 


  
  export const footerEdit = getCommonApplyFooter({
    
    nextButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          // minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        nextButtonLabel: getLabel({
          labelName: "HC_SUBMIT",
          labelKey: "HC_SUBMIT_LABEL"
        }),
        // nextButtonIcon: {
        //   uiFramework: "custom-atoms",
        //   componentPath: "Icon",
        //   props: {
        //     // iconName: "keyboard_arrow_right"
        //   }
        // }
      },
      onClickDefination: {
        action: "condition",
        callBack: callBackForNext,
        
      },
      visible:true
    },
   
  });
  
  
  
  export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
    let allAreFilled = true;
  

  
    let error= false;
    //Types of Service Request
      //servicerequest form
  // debugger;
      
  
     document.getElementById("apply_form2").querySelectorAll("[required]").forEach(function (i) {
      // alert("inside validate form")
      if (!i.value) {
        if(error==false)
        {
          error=true;
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
    }
    })
  
    
  
    document.getElementById("apply_form2").querySelectorAll("input[type='hidden']").forEach(function (i) {
      
      // alert("inside validate form part 2")
      if (i.value == i.placeholder) {
        i.focus();
        allAreFilled = false;
        i.parentNode.classList.add("MuiInput-error-853");
        i.parentNode.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
        allAreFilled = false;
        isFormValid = false;
        hasFieldToaster = true;
      }
    })
 
  
      if(!error)
      {
  
    let error_owner = false;
    //owner form 
    document.getElementById("apply_form3").querySelectorAll("[required]").forEach(function (i) {
      // alert("inside validate form")
      if (!i.value) {
        if(error_owner==false)
        {
          error_owner=true;
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
    }
    })
  
    
  
    document.getElementById("apply_form3").querySelectorAll("input[type='hidden']").forEach(function (i) {
      
      // alert("inside validate form part 2")
      if (i.value == i.placeholder) {
        i.focus();
        allAreFilled = false;
        i.parentNode.classList.add("MuiInput-error-853");
        i.parentNode.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
        allAreFilled = false;
        isFormValid = false;
        hasFieldToaster = true;
      }
    })
      }
  
    
    
    if (allAreFilled == false) {
      //alert('Fill all fields')
      isFormValid = false;
      hasFieldToaster = true;
    }
    else {
      isFormValid = true;
      hasFieldToaster = false;
    }
    return [isFormValid, hasFieldToaster]
  };