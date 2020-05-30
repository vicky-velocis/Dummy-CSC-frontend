import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
  createUpdateNocApplication,
  prepareDocumentsUploadData
,createPressNote,updatePressNote} from "../../../../../ui-utils/commons";

import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {localStorageGet} from "egov-ui-kit/utils/localStorageUtils";
const setReviewPageRoute = (state, dispatch) => {
	             let id=getQueryArg(window.location.href, "eventuuId")            

	if(id){
		  let tenantId = getTenantId()
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/summary?eventuuId=${id}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));
	}
	else{
	
	
  let tenantId = getTenantId()
  const eventId = get(
    state,
    "screenConfiguration.preparedFinalObject.EVENT.ResponseBody.eventId"
  );
  //screenConfiguration.preparedFinalObject.
  const eventuuId = get(
    state,
    "screenConfiguration.preparedFinalObject.EVENT.ResponseBody.eventDetailUuid"
  );
  //localStorage.setItem('eventuuId',eventuuId)
  // alert(eventId)
  // alert(eventuuId)
  
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/summary?eventId=${eventId}&eventuuId=${eventuuId}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));
	}
};


const callBackForSubmit = async (state, dispatch) => {

 // alert('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  debugger
  let pressnoteuuId=getQueryArg(window.location.href, "pressnoteuuId");
  let pressdata=''
  if(pressnoteuuId){
 // alert(localStorageGet("PressNoteList"))
  if(localStorageGet("PressNoteList")===''||localStorageGet("PressNoteList")===null){
  // committeeData=[]
  // //screenConfiguration.preparedFinalObject.CommiteeGetData[0].committeeMember
  // let data= get(state.screenConfiguration.preparedFinalObject, "[0].committeeMemCommiteeGetDataber")
  // alert(JSON.stringify(data))
  }
  else{
  pressdata=JSON.parse(localStorageGet("PressNoteList"))
  
  }
  //alert(committeeData.length)
  let arr=[]
  for(let i=0;i<pressdata.length;i++)
  {
  let obj= {
    "pressMasterUuid":pressdata[i]['Press master UUID'],  
  
  }
  // console.log(obj)
  arr.push(obj)
  }
  
  let payload={
  "RequestBody":{

    "tenantId": getTenantId(),
    "pressNoteSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressSubject"),
    "pressNoteDate":get(state.screenConfiguration.preparedFinalObject, "pressnote.date"),
    "filenumber":get(state.screenConfiguration.preparedFinalObject, "pressnote.fileNumber"),
    "noteContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressnote"),
    "smsContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.smscontent"),
    "emailContent":[ {
     "emailSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.emailsubject"),
     "emailBody":get(state.screenConfiguration.preparedFinalObject, "pressnote.emailbody"),
        }],
    "moduleCode":localStorageGet("modulecode"),
    "templateType":"PRESS_RELEASE",
    "documentAttachment":[{"fileStoreId":get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux[0].documents[0].fileStoreId"),
    }],
   "moduleCode": localStorageGet("modulecode"),
  "publicationList":arr
  }
  }
 // updateCommitteemaster(dispatch,payload);
 updatePressNote(dispatch,payload);
 
  }
  
  
  
  
  else{
  
  
  console.log(localStorageGet("PressNoteList")) 
  
  let pressdata=JSON.parse(localStorageGet("PressNoteList"))
  console.log(pressdata)
  let arr=[]
  for(let i=0;i<pressdata.length;i++)
  {
    let obj= {
      "pressMasterUuid":pressdata[i]['Press master UUID'],
      
      
      }
    console.log(obj)
      arr.push(obj)
      }
      let pressnotedate=get(state.screenConfiguration.preparedFinalObject, "pressnote.date")
      pressnotedate=pressnotedate.split('-')

     let date= pressnotedate[2]+'/'+pressnotedate[1]+'/'+pressnotedate[0];
      let payload={
      "RequestBody":{
    
        "tenantId": getTenantId(),
        "pressNoteSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressSubject"),
        "pressNoteDate":date,
        "filenumber":get(state.screenConfiguration.preparedFinalObject, "pressnote.fileNumber"),
        "noteContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressnote"),
        "smsContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.smscontent"),
        "emailContent":[ {
         "emailSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.emailsubject"),
         "emailBody":get(state.screenConfiguration.preparedFinalObject, "pressnote.emailbody"),
            }],
        "moduleCode":localStorageGet("modulecode"),
        "templateType":"PRESS_RELEASE",
        "documentAttachment":[{"fileStoreId":get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux[0].documents[0].fileStoreId"),
        }],
       "moduleCode": localStorageGet("modulecode"),
      "publicationList":arr
      }
      }
  createPressNote(dispatch,payload);
  
  }
  };
const moveToReview = (state, dispatch) => {
  debugger
  const documentsFormat = Object.values(
    get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux")
  );

  let validateDocumentField = false;

  for (let i = 0; i < documentsFormat.length; i++) {
    let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
    let isDocumentTypeRequired = get(
      documentsFormat[i],
      "isDocumentTypeRequired"
    );

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

  if (validateDocumentField) {
    setReviewPageRoute(state, dispatch);
  }
};

const getMdmsData = async (state, dispatch) => {
  let tenantId =
  get(
    state.screenConfiguration.preparedFinalObject,
    "FireNOCs[0].fireNOCDetails.propertyDetails.address.city"
  ) || getTenantId();
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" }, { name: "eventSector" }]
        },
      ]
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.FireNoc.Documents",
        payload.MdmsRes.FireNoc.Documents
      )
    );
    prepareDocumentsUploadData(state, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["generatepressNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
 console.log(activeStep);
 debugger
  let isFormValid = true;
  let hasFieldToaster = false;

  let validatestepformflag = validatestepform(activeStep + 1)
  
    isFormValid = validatestepformflag[0];
    hasFieldToaster = validatestepformflag[1];
  if (activeStep === 0) {



    // let isPropertyLocationCardValid = validateFields(
    //   "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children",
    //   state,
    //   dispatch
    // );
    // let isSinglePropertyCardValid = validateFields(
    //   "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children",
    //   state,
    //   dispatch
    // );

    // Multiple buildings cards validations
    // let multiplePropertyCardPath =
    //   "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.children.multipleBuilding.props.items";
    // let multiplePropertyCardItems = get(
    //   state.screenConfiguration.screenConfig.generatepressNote,
    //   multiplePropertyCardPath,
    //   []
    // );
    // let isMultiplePropertyCardValid = true;
    // for (var j = 0; j < multiplePropertyCardItems.length; j++) {
    //   if (
    //     (multiplePropertyCardItems[j].isDeleted === undefined ||
    //       multiplePropertyCardItems[j].isDeleted !== false) &&
    //     !validateFields(
    //       `${multiplePropertyCardPath}[${j}].item${j}.children.cardContent.children.multipleBuildingCard.children`,
    //       state,
    //       dispatch,
    //       "generatepressNote"
    //     )
    //   )
    //     isMultiplePropertyCardValid = false;
    // }

    // let noOfBuildings = get(
    //   state,
    //   "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings"
    // );
    // if (noOfBuildings === "SINGLE") {
    //   isMultiplePropertyCardValid = true;
    // } else {
    //   isSinglePropertyCardValid = true;
    // }

  //   if (
  //     !isSinglePropertyCardValid ||
  //     !isPropertyLocationCardValid ||
  //     !isMultiplePropertyCardValid
  //   ) {
  //     isFormValid = false;
  //     hasFieldToaster = true;
  //   }
 }



  if (activeStep === 1) {
 //   moveToReview(state, dispatch);

   // setReviewPageRoute(state, dispatch);
  }

  if (activeStep !== 2) {
    debugger

    if (isFormValid) {
      let responseStatus = "success";
      if (activeStep === 1) {
      //  prepareDocumentsUploadData(state, dispatch, 'create_pressnote');
        
        
      }
      if (activeStep === 1) {
        prepareDocumentsUploadData(state, dispatch, 'create_pressnote');
        
        
      } 
      


     // V
      // if (activeStep === 2) {
      //   prepareDocumentsUploadData(state, dispatch, 'create_pressnote');
        
      // //  getMdmsData(state, dispatch);
      //   let response = await createUpdateNocApplication(
      //     state,
      //     dispatch,
      //     "CREATE"
      //   );
      //   responseStatus = get(response, "status", "");
      //  // alert(responseStatus)
      //   if(responseStatus === "success")
      //   {
          
      //  setReviewPageRoute(state, dispatch);
      //   }
      // }
      responseStatus === "success" && changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents!",
        labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
      };
      switch (activeStep) {
        case 1:
          errorMessage = {
            labelName:
              "Please check the Missing/Invalid field for Property Details, then proceed!",
            labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
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
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {

  
  let activeStep = get(
    state.screenConfiguration.screenConfig["generatepressNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    // if (activeStep === 2 && mode === "next") {
    //   const isDocsUploaded = get(
    //     state.screenConfiguration.preparedFinalObject,
    //     "LicensesTemp[0].reviewDocData",
    //     null
    //   );
    //   activeStep = isDocsUploaded ? 3 : 2;
    // } else {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    // }
  } else {
    activeStep = defaultActiveStep;
  }
//alert(activeStep)
debugger
  const isPreviousButtonVisible = activeStep ===1 ? true : false;
  const isNextButtonVisible = activeStep < 2 ? true : false;
  const isPayButtonVisible = activeStep === 2 ? true : false;
 // alert(isPreviousButtonVisible)
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.tenderStepperFooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.tenderStepperFooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.tenderStepperFooter.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("generatepressNote", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
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
    {
      path: "components.div.children.formwizardFourthStep",
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

export const tenderStepperFooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
       // minWidth: "200px",
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
        labelKey: "NOC_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
  visible:false

  },
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
        labelName: "Next Step",
        labelKey: "NOC_COMMON_BUTTON_NXT_STEP"
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
        //minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "NOC_COMMON_BUTTON_SUBMIT"
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
      callBack: callBackForSubmit
    },
visible:false
  }
});




export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
 // alert(activeStep)
  let allAreFilled = true;
  if (activeStep == 1) {
    document.getElementById("apply_form" + activeStep).querySelectorAll("[required]").forEach(function (i) {
   //  alert(i+"::::"+i.value)
    //  alert(i.getAttribute("aria-invalid"))
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


    document.getElementById("apply_form" + activeStep).querySelectorAll("input[type='hidden']").forEach(function (i) {
      // alert("hidden "+i+"::::"+i.value)
      //  alert(i.getAttribute("aria-invalid"))
      // if (i.value == i.placeholder) {
      // 	 alert(" inside hidden "+i+"::"+i.placeholder+"::"+i.value)
      //   i.focus();
      //   allAreFilled = false;
      //   i.parentNode.classList.add("MuiInput-error-853");
      //   i.parentNode.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
      //   allAreFilled = false;
      //   isFormValid = false;
      //   hasFieldToaster = true;
      // }

    })
  } 
  if (allAreFilled == false) {
  //  alert('Fill all fields')
    isFormValid = false;
    hasFieldToaster = true;
  }
  else {
    isFormValid = true;
    hasFieldToaster = false;
  }
  return [isFormValid, hasFieldToaster]
};