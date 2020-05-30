import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCurrentFinancialYear } from "../utils";
import { tenderStepperFooter } from "./applyResource/tenderNoticeFooter";
import { eventDetails } from "./applyResource/eventDetails";
import { eventDescription } from "./applyResource/eventDescription";
import jp from "jsonpath";
import {
 
localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import { propertyDetails } from "./applyResource/propertyDetails";
import { pressnotedetails ,pressnotedata,pressnoteemailsmsdata, EmailSmsContent} from "./pressnoteresources/pressnotedetails";
import { applicantDetails } from "./applyResource/applicantDetails";
import { pressNotedocumentDetails } from "./applyResource/documentDetails";
import { getQueryArg,getFileUrlFromAPI } from "egov-ui-framework/ui-utils/commons";

import { getDetailsForOwner, getTextToLocalMapping } from "../utils";
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";

import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import {
  sampleSearch,
  sampleSingleSearch,
  sampleDocUpload
} from "../../../../ui-utils/sampleResponses";
import set from "lodash/set";
import get from "lodash/get";
import {
  prepareDocumentsUploadData,
  getSearchResults,
  furnishNocResponse,
  furnishNocResponsePressNote,
  setApplicationNumberBox,
  getSearchResultsViewEvent,
  getSearchResultsViewPressnotedata
} from "../../../../ui-utils/commons";
import {setCommittiee,getPressGridDatanote} from "./searchResource/citizenSearchFunctions";
import { searchResultsPressMasterList,searchGridSecondstep } from "./searchResource/searchResults";
import { getPressGridData } from "./searchResource/citizenSearchFunctions";
export const stepsData = [
  { labelName: "PRESS NOTE DETAILS", labelKey: "PR_GENERATE_PRESS_NOTE_DETAILS" },
  { labelName: "PUBLICATION NAME LISXT", labelKey: "PR_PUBLICATION_NAME_LIST" },
  { labelName: "EMAIL SMS CONTENT", labelKey: "PR_EMAIL_SMS_CONTENT" }
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);


export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Generate press note`, //later use getFinancialYearDates
    labelKey: "PR_GENERATE_PRESS_NOTE"
  }),
  //applicationNumber: applicationNumberContainer()
  // applicationNumber: {
  //   uiFramework: "custom-atoms-local",
  //   moduleName: "egov-noc",
  //   componentPath: "ApplicationNoContainer",
  //   props: {
  //     number: "NA"
  //   },
  //   visible: false
  // }
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
   // eventDetails,
   searchResultsPressMasterList,
   pressnotedetails,
   pressnotedata,
   pressNotedocumentDetails
    }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    searchGridSecondstep
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    EmailSmsContent,

  },
  visible: false
};

// export const formwizardFourthStep = {
//   uiFramework: "custom-atoms",
//   componentPath: "Form",
//   props: {
//     id: "apply_form4"
//   },
//   children: {
//     documentDetails
//   },
//   visible: false
// };

const getMdmsData = async (action, state, dispatch) => {
  let tenantId = getTenantId();

    //let tenantId =    
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "pressnoteDocuments" }, { name: "localityAreaName" }]
        },
       
        //, { name: "eventStatus" }, { name: "localityAreaName" }
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },


        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "Department"
            }
          ]
        },
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
   
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};


export const prepareEditFlow = async (
  state,
  dispatch,
  applicationNumber,
  tenantId,
  action
) => {
  
  let payload={
    "requestBody":{
            "tenantId":getTenantId(),
            "pressNoteUuid":getQueryArg(window.location.href, "pressnoteuuId") ,
           "moduleCode": localStorageGet("modulecode"),
            
    }
    
          }
         // getPressGridDataforview(action, state, dispatch);
         
   let response = await getSearchResultsViewPressnotedata(payload)
  // alert(JSON.stringify(response.ResponseBody.length))
  // console.log(response)
 if(response.ResponseBody.length>0)
 {
   //alert('inn')
   let empdata=await getPressGridDatanote(action, state, dispatch);
   //alert(JSON.stringify(empdata))
   
  // alert(JSON.stringify(empd
 //  screenConfiguration.screenConfig.createCommitteeMaster.components.div.children.formwizardFirstStep.children.searchDepartmentEmployeesResults_committee.children.cardContent.children.committieegrid.componentJsonpath
 //ata))
 //here wego
 
 
 let data=''
 let selectedrowslocal=[];
 let selectedRows=[];
 empdata.map(function (item, index) {
   debugger
   if(item.pressMasterUuid){
   response.ResponseBody[0].publicationList.map(function (commiteeMember,index1) {
     if(commiteeMember.pressMasterUuid===item.pressMasterUuid){
      // alert('index'+index)

       data =response.ResponseBody[0].publicationList.map(item => ({
        [getTextToLocalMapping("Publication Name")]:
        item.publicationName || "-",
        [ getTextToLocalMapping("Type of the Press")]:
        item.pressType || "-",
        [getTextToLocalMapping("Name")]:
        item.personnelName || "-",
        [getTextToLocalMapping("Email Id")]:
        item.email || "-",
        [getTextToLocalMapping("Mobile Number")]:
        item.mobile || "-",
        [getTextToLocalMapping("Press master UUID")]:
        item.pressMasterUuid || "-",
      
        
        }));
      // let obj={}
      //  obj['Department']=commiteeMember.departmentName
      //  obj['Employee Name']=commiteeMember.Name
      //  obj['Mobile No']=commiteeMember.Mob
      //  obj['Email ID']=commiteeMember.Email
      //  obj['Department Id']=commiteeMember.departmentUuid
      //  obj['Employee ID']=commiteeMember.userUuid
       //  selectedrows.push(rowData)
   //   selectedrowslocal.push(obj)
       selectedRows.push(index)
      // localStorageSet("committeelist", JSON.stringify(selectedrowslocal));
       
     }
   });
 }
   });
 dispatch(
   handleField(
     "generateTenderNotice",
     "components.div.children.formwizardFirstStep.children.searchResultsPressMasterList",
     "props.options.rowsSelected",
     selectedRows
   )
 );
 
 
 dispatch(
  handleField(
    "generateTenderNotice",
    "components.div.children.formwizardSecondStep.children.searchGridSecondstep",
    "props.data",
    data
  ));


  let documentsPreview = [];
  debugger
  let fileStoreIds1 = response.ResponseBody[0].documentAttachment
  documentsPreview.push({
    
    fileStoreId:fileStoreIds1[0].fileStoreId ,
    
  })
  //console.log(JSON.parse(fileStoreIds))
  let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
  
 // alert(fileStoreIds.length)
  let fileUrls =
  fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
documentsPreview = documentsPreview.map(function (doc, index) {

doc["fileUrl"] = fileUrls && fileUrls[doc.fileStoreId] && fileUrls[doc.fileStoreId].split(",")[0] || "";
//  doc["name"] = `Document - ${index + 1}`
  doc["fileName"] =
    (fileUrls[doc.fileStoreId] &&
      decodeURIComponent(
        fileUrls[doc.fileStoreId]
          .split(",")[0]
          .split("?")[0]
          .split("/")
          .pop()
          .slice(13)
      )) ||
    `Document - ${index + 1}`;
   // doc["fileUrl"] ="http://a.com"
  return doc;
});


dispatch(prepareFinalObject("documentsUploadRedux[0].documents", documentsPreview));


  let Refurbishresponse = furnishNocResponsePressNote(response);
  dispatch(prepareFinalObject("pressnote", Refurbishresponse));

 }
 let documentsPreview = [];
 
     // Get all documents from response
     let firenoc = get(state, "screenConfiguration.preparedFinalObject.PublicRealation", {});
     let uploadVaccinationCertificate = firenoc.hasOwnProperty('eventImage') ?
       firenoc[0].CreateEventDetails.eventImage[0]['fileStoreId'] : '';





       //screenConfiguration.preparedFinalObject.PublicRealation[""0""].CreateEventDetails.eventImage
    //  let uploadPetPicture = firenoc.hasOwnProperty('uploadPetPicture') ?
    //    firenoc.uploadPetPicture[0]['fileStoreId'] : '';
 
     if (uploadVaccinationCertificate !== '') {
       documentsPreview.push({
         title: "PRESS_NOTE_DOCUMENT",
         fileStoreId: uploadVaccinationCertificate,
         linkText: "View"
       })
       let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
       let fileUrls =
         fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
       documentsPreview = documentsPreview.map(function (doc, index) {
 
         doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && fileUrls[doc.fileStoreId].split(",")[0] || "";
         //doc["name"] = doc.fileStoreId;
         doc["name"] =
           (fileUrls[doc.fileStoreId] &&
             decodeURIComponent(
               fileUrls[doc.fileStoreId]
                 .split(",")[0]
                 .split("?")[0]
                 .split("/")
                 .pop()
                 .slice(13)
             )) ||
           `Document - ${index + 1}`;
         return doc;
       });
       dispatch(prepareFinalObject("documentsPreview", documentsPreview));
     }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "generateTenderNotice",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const step = getQueryArg(window.location.href, "step");
    //localStorage.setItem("PressNoteList",[])
    localStorageSet("PressNoteList", []);	

    //Set Module Name
    set(state, "screenConfiguration.moduleName", "egov-pr");
    getPressGridDatanote(action, state, dispatch);
    // Set MDMS Data
    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(response => {
      prepareDocumentsUploadData(state, dispatch, 'create_pressnote');
    });

    // Search in case of EDIT flow
    prepareEditFlow(state, dispatch, applicationNumber, tenantId,action);
   

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      let intStep = parseInt(step);
      set(
        action.screenConfig,
        "components.div.children.stepper.props.activeStep",
        intStep
      );
      let formWizardNames = [
        "formwizardFirstStep",
        "formwizardSecondStep",
         "formwizardThirdStep",
        // "formwizardFourthStep"
      ];
      for (let i = 0; i < 1; i++) {
        set(
          action.screenConfig,
          `components.div.children.${formWizardNames[i]}.visible`,
          i == step
        );
        set(
          action.screenConfig,
          `components.div.children.footer.children.previousButton.visible`,
          step != 0
        );
      }
    }

   

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
       
      }
    }
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
       // searchResultsPressMasterList,
        formwizardFirstStep,
        formwizardSecondStep,
       formwizardThirdStep,
        // formwizardFourthStep,
        tenderStepperFooter
      }
    }
  }
};

export default screenConfig;
