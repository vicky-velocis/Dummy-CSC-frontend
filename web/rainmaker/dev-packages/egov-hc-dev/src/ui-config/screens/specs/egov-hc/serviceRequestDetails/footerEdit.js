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
    // alert(media.length);
    if(media.length >= 0)
    {
      uploadFlag = true;
      validatestepformflag = validatestepform(state , serviceRequest);
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
        document.getElementById('custom-containers-contactno').focus();
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Invalid contact number", labelKey: "HC_CONTACT_NUMBER_ERROR" },
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
            { labelName: "Invalid tree count range in between (1-99)", labelKey: "HC_TREE_COUNT_ERROR" },
            "warning"
          )
        ); 
    }
    else{
      treeCount_flag = true;
    }

    // Code Here
    let description = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.description");
    let address = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.address");
    let locality = ""
    let houseNoAndStreetName = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.houseNoAndStreetName");
    let landmark = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.landmark");
    let ownerName = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.ownerName");
    let email = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.email");
    
    // let latitude = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.latitude");
    // let longitude = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST.longitude");
    
    let validationErrorMsg = ""
    let flagValidField = true;

    if(! /^[a-zA-Z0-9#$%&?@/!~^*()_+`=|{}<>.[\\\],''"":;\s,'-]{1,256}$/.test(description))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_DESCRIPTION_ERROR" };
        flagValidField = false;
    }
    else if(! /^[a-zA-Z0-9#$%&@/.,''"":;\s,'-]{1,256}$/.test(address))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_LOCATION_ERROR" };
        flagValidField = false;
    }
    else if(! /^[a-zA-Z0-9#$%&@/.,''"":;\s,'-]{1,256}$/.test(houseNoAndStreetName))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_HOUSE_NO_ERROR" };
      flagValidField = false;
    }
    else if(! /^[a-zA-Z0-9#$%&@/.,''"":;\s,'-]{1,256}$/.test(landmark))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_LANDMARK_ERROR" };
      flagValidField = false;
    }
    else if(! /^[a-zA-Z ]+$/.test(ownerName))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_OWNER_NAME_ERROR" };
      flagValidField = false;
    }
    else if(! /^(?=^.{1,256}$)((([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/.test(email))
    {
      validationErrorMsg = { labelName: "ERROR", labelKey: "HC_FIELD_EMAIL_ERROR" };
      flagValidField = false;
    }

    if(flagValidField === false)
    {
      dispatch(
        toggleSnackbar(
          true,
          validationErrorMsg,
          "warning"
        )
       );
      
    }
    
    if(treeCount_flag == true && conno_flag == true)
    {
      isFormValid = validatestepformflag[0];
      hasFieldToaster = validatestepformflag[1];
      services.push(serviceRequest)
    }
  
      if (isFormValid && flagValidField) {
        // let responseStatus = "success";
        if (activeStep === 1) {
          let status = 'INITIATED'
          serviceRequest['city']= JSON.parse(getUserInfo()).permanentCity,
          serviceRequest['media'] = media,
          serviceRequest['isEditState'] = 1
          try
          { serviceRequest['mohalla'] = serviceRequest.mohalla["label"]
         }
         catch (e){
           serviceRequest['mohalla'] = serviceRequest.mohalla
         }
         try
           {
             serviceRequest['serviceType'] = serviceRequest.serviceType["label"]
            }
   
           catch(e){
             serviceRequest['serviceType'] = serviceRequest.serviceType
         }
          dispatch(
            handleField(
              "apply",
              "components.div.children.footerEdit.children",
              "nextButton.visible",
              false
            )
          );
          

        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Please Wait While Your request is being Edited", labelKey: "HC_SERVICE_REQUEST_BEING_EDITED" },
            "warning"
          )
        );  
          let response = await EditServiceRequest(state, dispatch, status);
          // debugger;
          
          let responseStatus = get(response, "status", "");
          // let serviceRequestId = get(response, "service_request_id", "");
          let serviceRequestId = getapplicationNumber();
          if (responseStatus == "successful" || responseStatus == "SUCCESSFUL") {
 
            if (isFormValid) {

          dispatch(
            toggleSnackbar(
              false,
              { labelName: "Please wait while your request being is generated", labelKey: "HC_SERVICE_REQUEST_BEING_GENERATED" },
              "warning"
            )
          );
              
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
              labelName: "Submission Failed, Try Again later!",
              labelKey: "ERR_SERVICE_REQUEST_FAILED_MSG" 
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
  
  
  
export const validatestepform = (state, dispatch, isFormValid, hasFieldToaster) => {
  let allAreFilled = true;
  let error= false;
  let flagValidFields= false;

   document.getElementById("apply_form2").querySelectorAll("[required]").forEach(function (i) {
    
    let serviceRequest_validate = get(state,
      "screenConfiguration.preparedFinalObject.SERVICEREQUEST"
    );
    if (serviceRequest_validate!=undefined) 
    {if (serviceRequest_validate.mohalla == undefined || serviceRequest_validate.serviceType == undefined) {
     
      // i.value = 
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
  }}

    if (!i.value && i.value != undefined) {
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
      i.parentNode.classList.add("MuiInput-error-853");
      i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
      allAreFilled = false;
      isFormValid = false;
      hasFieldToaster = true;
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
    flagValidFields = false;
  }
  else {
    isFormValid = true;
    hasFieldToaster = false;
    flagValidFields = true;
  }


  return [isFormValid, hasFieldToaster, flagValidFields]
};