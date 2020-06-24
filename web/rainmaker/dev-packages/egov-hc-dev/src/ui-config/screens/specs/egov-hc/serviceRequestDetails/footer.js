import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getapplicationNumber, getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { createServiceRequest } from "../../../../../ui-utils/commons";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";

import {  handleScreenConfigurationFieldChange as handleField} from "egov-ui-framework/ui-redux/screen-configuration/actions";

let role_name = JSON.parse(getUserInfo()).roles[0].code


const callBackForNext = async (state, dispatch) => {
 
  let servicerequestmedia = get(state, "form.newapplication.files.media", []);
  
  let contact_flag = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.contactNumber", []);

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
  
  if(media.length >= 1)
  {
    uploadFlag = true;
    validatestepformflag = validatestepform(state,serviceRequest);
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
  
  
  let contactNo = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.contactNumber", []);
  let treeCount = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.treeCount", []);
  let conno_flag = false;
  let treeCount_flag = false;
  
  if(contactNo.length === 10)
    {
      conno_flag = true;
    }
    else{
      isFormValid = false;
      if(contact_flag>0)
      {
        document.getElementById('custom-containers-typeofrequest').focus();
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Invalid Contact Number..!", labelKey: "HC_CONTACT_NUMBER_ERROR" },
            "warning"
          )
        );
      }
    }

    if(uploadFlag === true && (parseInt(treeCount) === 0 || parseInt(treeCount) >99))
    {
      isFormValid = false;
      
      document.getElementById('custom-containers-nooftrees').focus();
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Invalid Contact Number..!", labelKey: "HC_TREE_COUNT_ERROR" },
            "warning"
          )
        ); 
    }
    else{
      treeCount_flag = true;
    }

    if(treeCount_flag == true && conno_flag == true)
    {
      isFormValid = validatestepformflag[0];
      hasFieldToaster = validatestepformflag[1];
      services.push(serviceRequest)
    }
    
    if (isFormValid) {
      
      if (activeStep === 1) {
        // "custom-containers-nextButtonLabel"
        
        let status = 'INITIATED'
        serviceRequest['city']= getTenantId(),
        serviceRequest['tenantId']= getTenantId(),
        serviceRequest['media'] = media,
        serviceRequest['address'] = 'hardcoded value',
        serviceRequest['isEditState'] = 0
        dispatch(
          handleField(
            "servicerequest",
            "components.div.children.footer.children",
            "nextButton.visible",
            false
          )
        );        
        let response = await createServiceRequest(state, dispatch, status);
        let responseStatus = get(response, "status", "");
        
        
        let serviceRequestId = getapplicationNumber();
        if (responseStatus == "SUCCESS" || responseStatus == "success") {
          
        

          if (isFormValid) {
          get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST")
          dispatch(setRoute(`/egov-hc/acknowledgementServiceRequest?serviceRequestId=${serviceRequestId}`));
          }
        } else {
          dispatch(
            handleField(
              "servicerequest",
              "components.div.children.footer.children",
              "nextButton.visible",
              true
            )
          );           
          let errorMessage = {
            labelName: "Submission Falied, Try Again later!",
            labelKey: "ERR_DEFAULT_INPUT_FIELD_MSG" 
          };
          dispatch(toggleSnackbar(true, errorMessage, "error"));
        }
      }
      
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



export const footer = getCommonApplyFooter({

  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "HC_SUBMIT",
        labelKey: "HC_SUBMIT_LABEL"
      }),

      
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: true
  },

});



export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
  let allAreFilled = true;

  

  let error= false;

   document.getElementById("apply_form2").querySelectorAll("[required]").forEach(function (i) {
    
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
  
  document.getElementById("apply_form3").querySelectorAll("[required]").forEach(function (i) {
    
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
    
    isFormValid = false;
    hasFieldToaster = true;
  }
  else {

    hasFieldToaster = false;
  }
  return [isFormValid, hasFieldToaster]
};