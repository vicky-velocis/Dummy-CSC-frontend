
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getFileUrlFromAPI, getMultiUnits, getQueryArg, getTransformedLocale, setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import { getapplicationNumber,seteventid,seteventuuid, getapplicationType, getTenantId, getUserInfo, setapplicationNumber, lSRemoveItemlocal, lSRemoveItem, localStorageGet, setapplicationMode, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "redux/store";
import { convertDateToEpoch, getCheckBoxJsonpath, getCurrentFinancialYear, getHygeneLevelJson, getLocalityHarmedJson, getSafetyNormsJson, getTradeTypeDropdownData, getTranslatedLabel, ifUserRoleExists, setFilteredTradeTypes, updateDropDowns, searchBill, createDemandForAdvNOC } from "../ui-config/screens/specs/utils";
import { httpRequest } from "./api";

import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";



const role_name = JSON.parse(getUserInfo()).roles[0].code


export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const getSearchResults = async queryObject => {

  let data = {
    "tenantId": getTenantId(),
    "applicationType": getapplicationType(),
    "applicationStatus": "INITIATED",
    "dataPayload": {
      "createdBy": JSON.parse(getUserInfo()).uuid,
      "applicationType": getapplicationType()
    }
  };
  try {
    const response = await httpRequest(
      "post",
      "/egov-opmsService/noc/_get",
      "",
      [],
      data
    );
    //alert(JSON.stringify(response));
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

//view
export const getSearchResultsView = async queryObject => {
  try {
    const response = await httpRequest(
      "post", "/egov-opmsService/noc/_view", "",
      [],
      {
        "tenantId": queryObject[0]["value"],
        "applicationId": queryObject[1]["value"],
        "applicationType": getapplicationType(),
        "dataPayload": {
          "createdBy": "65a14e00-ba5e-4347-be81-08fc04bb0529",
          "applicationType": getapplicationType()
        }
      }
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true, { labelName: error.message, labelCode: error.message }, "error"
      )
    );
  }
  //alert(JSON.stringify(response));
};


export const preparepopupDocumentsUploadData = (state, dispatch, applicationtype = 'PRSCP') => {

  // if(applicationtype == 'PRSCP')
  // {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PRSCP.RemarksDocuments",
    []
  );
  // }	
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "PET.REMARK_DOCUMENT_SI" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const preparepopupDocumentsADVUploadData = (state, dispatch, applicationtype = 'ADVERTISEMENTNOC') => {

  // if(applicationtype == 'PRSCP')
  // {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.AdvertisementNOC.AdvertisementNOCRemarksDocuments",
    []
  );
  // }	
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "AdvertisementNOC.REMARK_DOCUMENT" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
export const preparepopupDocumentsSellMeatUploadData = (state, dispatch, applicationtype = 'SELLMEATNOC') => {

  // if(applicationtype == 'PRSCP')
  // {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.SellMeatNOC.SellMeatNOCRemarksDocuments",
    []
  );
  // }	
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "SellMeatNOC.REMARK_DOCUMENT" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
export const preparepopupDocumentsRoadCutUploadData = (state, dispatch, applicationtype = 'ROADCUTNOC') => {

  // if(applicationtype == 'PRSCP')
  // {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RoadCutNOC.RoadCutNOCRemarksDocuments",
    []
  );
  // }	
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "RoadCutNOC.REMARK_DOCUMENT" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const prepareDocumentsUploadData = (state, dispatch, type) => {
  let documents = '';
  if (type == "popup_pet") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PRSCP.RemarksDocuments",
      []
    );
  }
  else if (type == "popup_adv") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.AdvertisementNOC.AdvertisementNOCRemarksDocuments",
      []
    );
  }
  else if (type == "popup_sellmeat") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.SellMeatNOC.SellMeatNOCRemarksDocuments",
      []
    );
  }
  else if (type == "popup_rodcut") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RoadCutNOC.RoadCutNOCRemarksDocuments",
      []
    );
  }
  else if (type == "apply_pet") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.PRSCP.Documents",
      []
    );
  }
  else if (type == "apply_sellmeat") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.SellMeatNOC.SellMeatDocuments",
      []
    );
  }
  else if (type == "apply_Advt") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.AdvNOC.AdvNOCDocuments",
      []
    );
  }
  else if (type == "apply_roadcut") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RoadCutNOC.RoadCutDocuments",
      []
    );
  }
  else if (type == "create_tender") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData[RAINMAKER-PR].tenderDocuments",
      []
    );
  }
  else if (type == "create_event") {
    // screenConfiguration.preparedFinalObject.applyScreenMdmsData[""RAINMAKER-PR""].eventDocuments
     documents = get(
       state,
       "screenConfiguration.preparedFinalObject.applyScreenMdmsData[RAINMAKER-PR].eventDocuments",
       []
     );
   }
  else if (type == "create_pressnote") {
    // screenConfiguration.preparedFinalObject.applyScreenMdmsData[""RAINMAKER-PR""].eventDocuments
     documents = get(
       state,
       "screenConfiguration.preparedFinalObject.applyScreenMdmsData[RAINMAKER-PR].pressnoteDocuments",
       []
     );
   }
  else {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RAINMAKER-PR.eventDocuments",
      []
    );
  }
  debugger
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "PET.PET_PICTURE" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    }
    else if (doc.code === "PET.REMARK_DOCUMENT_SI" && doc.hasMultipleRows && doc.options) {

      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    }
    else if (doc.code === "ADV.ADV_PHOTOCOPY_HOARDING" && doc.hasMultipleRows && doc.options) {

      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.AdvNOC.AdvNOCDocuments",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    }
    else if (doc.code === "EVENT.EVENT_FILE_DOCUMENT" && doc.hasMultipleRows && doc.options) {
      
            let buildingsData = get(state,
              "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RAINMAKER-PR.eventDocuments",
              []
            );

      
            buildingsData.forEach(building => {
              let card = {};
              card["name"] = building.name;
              card["code"] = doc.code;
              card["hasSubCards"] = true;
              card["subCards"] = [];
              doc.options.forEach(subDoc => {
                let subCard = {};
                subCard["name"] = subDoc.code;
                subCard["required"] = subDoc.required ? true : false;
                card.subCards.push(subCard);
              });
              tempDoc[doc.documentType].cards.push(card);
            });
            // let reduxDocuments = {};
            // previewdocu = get(state, "screenConfiguration.preparedFinalObject.nocApplicationDetail", {});
            // if(!previewdocu) {
            //   reduxDocuments = previewdocu;
            // } else  {      
            //   reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
            // }
      
          }

    else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};


export const createUpdateEvent = async (state, dispatch, status) => {
  let response = '';
  let response_updatestatus = '';
  let uuId = getQueryArg(window.location.href, "eventuuId") === 'null' ? '' : getQueryArg(window.location.href, "eventuuId") // get(state, "screenConfiguration.preparedFinalObject.PRSCP.applicationId");

 let method =  "CREATE";
  try {
    let data=[]
    let payload = get(state.screenConfiguration.preparedFinalObject, "PublicRelation[0].CreateEventDetails", []);
	
	let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.EventDocuments", {});

	console.log("reduxDocuments");
	console.log(reduxDocuments);
	
    // Set owners & other documents
	let event_documents = [];
    let ownerDocuments = [];
    let otherDocuments = [];
    let Remarks = "";
   let startdate1=get(state,"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.startDate1")
   let endDate1=get(state,"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.endDate1")
 
   startdate1=startdate1.split('-')
   endDate1=endDate1.split('-')
  
   let moduleCode=localStorageGet("modulecode")
    set(payload, "eventStatus", "PUBLISHED");
    set(payload, "startDate",startdate1[2]+'/'+startdate1[1]+'/'+startdate1[0]);
    set(payload, "endDate", endDate1[2]+'/'+endDate1[1]+'/'+endDate1[0]);
    set(payload, "tenantId", getTenantId());
    set(payload, "moduleCode",moduleCode);
 
    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentCode === "EVENT.EVENT_FILE_DOCUMENT") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        } else if (!doc.documentSubCode) {
        
          otherDocuments = [
            ...otherDocuments,
            {
              
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
	  else{
			let temp =  {"fileStoreId":doc.fileStoreId, "fileName:": doc.fileName}
			event_documents.push(temp)
	  }
    });

   
    set(payload, "eventImage", event_documents);
  
    console.log('payload : ', payload)
    setapplicationMode(status);

    if (uuId==='' || uuId===null) {
      response = await httpRequest("post", "/prscp-services/v1/event/_create", "", [], { requestBody: payload });
      console.log('event response : ', response)
     
     
      if (response.ResponseBody.eventDetailUuid!=='null' || response.ResponseBody.eventDetailUuid!=='') {
        dispatch(prepareFinalObject("EVENT", response));
        dispatch(prepareFinalObject("PublicRelation[0].CreateEventDetails", {}));
        
       setApplicationNumberBox(state, dispatch);

        return { status: "success", message: response };
      } else {
        return { status: "fail", message: response };
      }
    } else
    {
    set(payload, "eventDetailUuid",uuId);
      response = await httpRequest("post", "/prscp-services/v1/event/_update", "", [], { requestBody: payload });
      dispatch(prepareFinalObject("EVENT", response));
      dispatch(prepareFinalObject("EventDocuments",[]));
      dispatch(prepareFinalObject("PublicRelation[0].CreateEventDetails", {}));
      
      return { status: "success", message: response };
    }

  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let PublicRelationData = get(
      state,
      "screenConfiguration.preparedFinalObject.PRSCP",
      []
    );
    dispatch(prepareFinalObject("PRSCP", PublicRelationData));

    return { status: "failure", message: error };
  }
};


export const setDocsForEditFlow = async (state, dispatch) => {
  
  const applicationDocuments = get(
    state.screenConfiguration.preparedFinalObject,
    "SELLMEATNOC.uploadDocuments",
    []
  );
  let uploadedDocuments = {};
  let fileStoreIds =
    applicationDocuments &&
    applicationDocuments.map(item => item.fileStoreId).join(",");
  const fileUrlPayload =
    fileStoreIds && (await getFileUrlFromAPI(fileStoreIds));
  applicationDocuments &&
    applicationDocuments.forEach((item, index) => {
      uploadedDocuments[index] = [
        {
          fileName:
            (fileUrlPayload &&
              fileUrlPayload[item.fileStoreId] &&
              decodeURIComponent(
                fileUrlPayload[item.fileStoreId]
                  .split(",")[0]
                  .split("?")[0]
                  .split("/")
                  .pop()
                  .slice(13)
              )) ||
            `Document - ${index + 1}`,
          fileStoreId: item.fileStoreId,
          fileUrl: Object.values(fileUrlPayload)[index],
          documentType: item.documentType,
          tenantId: item.tenantId,
          id: item.id
        }
      ];
    });
  dispatch(
    prepareFinalObject("SELLMEAT.uploadedDocsInRedux", uploadedDocuments)
  );
};

const convertOwnerDobToEpoch = owners => {
  let updatedOwners =
    owners &&
    owners
      .map(owner => {
        return {
          ...owner,
          dob:
            owner && owner !== null && convertDateToEpoch(owner.dob, "dayend")
        };
      })
      .filter(item => item && item !== null);
  return updatedOwners;
};

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileValid = (file, acceptedFiles) => {

  console.log("Id file valid");
 
  console.log(acceptedFiles)
  const mimeType = file["type"];
  console.log("mimeType");
  console.log(mimeType)
  console.log(file);
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const furnishResponsePressNote = response => {
  let refurnishresponse = {};
 
  if(response.ResponseBody[0]!==null && response.ResponseBody[0]!=='')
  {
    
  set(refurnishresponse, "date", response.ResponseBody[0].pressNoteDate);
  set(refurnishresponse,"fileNumber", response.ResponseBody[0].fileNumber);

  set(refurnishresponse, "pressSubject", response.ResponseBody[0].pressNoteSubject);
  set(refurnishresponse, "pressnote", response.ResponseBody[0].pressNoteUuid);
  set(refurnishresponse, "emailsubject", response.ResponseBody[0].emailContent[0].emailSubject);
  set(refurnishresponse, "emailbody", response.ResponseBody[0].emailContent[0].emailBody);
  set(refurnishresponse,"smscontent", response.ResponseBody[0].smsContent);

  localStorageSet("pressnote",response.ResponseBody[0].noteContent);
  return refurnishresponse;
  }
};
export const furnishResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};
  
 
  if(response.ResponseBody[0]!==null && response.ResponseBody[0]!=='')
  {
    let startdate=response.ResponseBody[0].startDate
    startdate= startdate.split(' ');
    let enddate=response.ResponseBody[0].endDate
    enddate= enddate.split(' ');
   let starttime=response.ResponseBody[0].startTime
 
   let endtime=response.ResponseBody[0].endTime

  set(refurnishresponse, "eventTitle", response.ResponseBody[0].eventTitle);
  set(refurnishresponse,"eventLocation", response.ResponseBody[0].eventLocation);

  set(refurnishresponse, "sector", response.ResponseBody[0].sector);
  set(refurnishresponse, "organizerDepartmentName", response.ResponseBody[0].organizerDepartmentName);
  set(refurnishresponse, "organizerUsernName", response.ResponseBody[0].organizerUsernName);
  set(refurnishresponse, "eventType", response.ResponseBody[0].eventType);
  set(refurnishresponse,"eventBudget", response.ResponseBody[0].eventBudget);

  set(refurnishresponse,"committeeUuid", response.ResponseBody[0].committeeUuid);
  set(refurnishresponse,"eventDescription", response.ResponseBody[0].eventDescription);
  set(refurnishresponse,"area", response.ResponseBody[0].area);

set(refurnishresponse, "startDate1",startdate[0]);
  

  set(refurnishresponse, "endDate1",enddate[0]);
  set(refurnishresponse, "startTime",   starttime);
  set(refurnishresponse, "endTime",   endtime);
  set(refurnishresponse, "facebookUrl", response.ResponseBody[0].facebookUrl);
  set(refurnishresponse,"twitterUrl", response.ResponseBody[0].twitterUrl);

  set(refurnishresponse,"instagramUrl", response.ResponseBody[0].instagramUrl);
  
  return refurnishresponse;
  }
};

export const furnishSellMeatNocResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};

  let applicationdetail = response.nocApplicationDetail[0].applicationdetail.length > 0 ? JSON.parse(response.nocApplicationDetail[0].applicationdetail) : '';

  set(refurnishresponse, "applicantName", response.nocApplicationDetail[0].applicantname);
  set(refurnishresponse, "houseNo", response.nocApplicationDetail[0].housenumber);
  set(refurnishresponse, "sector", response.nocApplicationDetail[0].sector);

  set(refurnishresponse, "fatherHusbandName", applicationdetail.fatherHusbandName);
  set(refurnishresponse, "division", applicationdetail.division);
  set(refurnishresponse, "shopNumber", applicationdetail.shopNumber);
  set(refurnishresponse, "ward", applicationdetail.ward);
  set(refurnishresponse, "nocSought", applicationdetail.nocSought);

  set(refurnishresponse, "uploadDocuments", applicationdetail.uploadDocuments);
  set(refurnishresponse, "remarks", applicationdetail.remarks);

  return refurnishresponse;
};

export const furnishRoadcutNocResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};

  let applicationdetail = response.nocApplicationDetail[0].applicationdetail.length > 0 ? JSON.parse(response.nocApplicationDetail[0].applicationdetail) : '';

  set(refurnishresponse, "applicantName", response.nocApplicationDetail[0].applicantname);
  set(refurnishresponse, "sector", response.nocApplicationDetail[0].sector);

  set(refurnishresponse, "typeOfApplicant", applicationdetail.typeOfApplicant);
  set(refurnishresponse, "length", applicationdetail.length);
  set(refurnishresponse, "ward", applicationdetail.ward);
  set(refurnishresponse, "requestedLocation", applicationdetail.requestedLocation);
  set(refurnishresponse, "landmark", applicationdetail.landmark);
  set(refurnishresponse, "width", applicationdetail.width);
  set(refurnishresponse, "purposeOfRoadCutting", applicationdetail.purposeOfRoadCutting);
  set(refurnishresponse, "division", applicationdetail.division);
  set(refurnishresponse, "uploadDocuments", applicationdetail.uploadDocuments);
  set(refurnishresponse, "remarks", applicationdetail.remarks);

  return refurnishresponse;
};

export const furnishAdvertisementNocResponse = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};

  let applicationdetail = response.nocApplicationDetail[0].applicationdetail.length > 0 ? JSON.parse(response.nocApplicationDetail[0].applicationdetail) : '';

  //set(refurnishresponse, "applicationId", response.nocApplicationDetail[0].nocnumber);
  set(refurnishresponse, "applicantName", response.nocApplicationDetail[0].applicantname);
  set(refurnishresponse, "typeOfApplicant", applicationdetail.typeOfApplicant);
  set(refurnishresponse, "tan", applicationdetail.tan);
  set(refurnishresponse, "pan", applicationdetail.pan);
  set(refurnishresponse, "cin", applicationdetail.cin);
  set(refurnishresponse, "gstin", applicationdetail.gstin);
  set(refurnishresponse, "applicantAddress", applicationdetail.applicantAddress);
  set(refurnishresponse, "applicantLandmark", applicationdetail.applicantLandmark);
  set(refurnishresponse, "applicantDivision", applicationdetail.applicantDivision);
  set(refurnishresponse, "applicantWard", applicationdetail.applicantWard);
  set(refurnishresponse, "applicantSector", applicationdetail.applicantSector);
  set(refurnishresponse, "applicantVillageSuSector", applicationdetail.applicantVillageSuSector);
  set(refurnishresponse, "mobileNo", applicationdetail.mobileNo);
  set(refurnishresponse, "emailId", applicationdetail.emailId);
  set(refurnishresponse, "typeOfAdvertisement", applicationdetail.typeOfAdvertisement);
  set(refurnishresponse, "subTypeOfAdvertisement", applicationdetail.subTypeOfAdvertisement);
  set(refurnishresponse, "fromDateToDisplay", applicationdetail.fromDateToDisplay);
  set(refurnishresponse, "toDateToDisplay", applicationdetail.toDateToDisplay);
  set(refurnishresponse, "duration", applicationdetail.duration);
  set(refurnishresponse, "locationOfAdvertisement", applicationdetail.locationOfAdvertisement);
  set(refurnishresponse, "advertisementLandmark", applicationdetail.advertisementLandmark);
  set(refurnishresponse, "advertisementSector", applicationdetail.advertisementSector);
  set(refurnishresponse, "advertisementVillageSubSector", applicationdetail.advertisementVillageSubSector);
  set(refurnishresponse, "advertisementMatterDescription", applicationdetail.advertisementMatterDescription);
  set(refurnishresponse, "space", applicationdetail.space);
  set(refurnishresponse, "date", applicationdetail.date);
  set(refurnishresponse, "exemptedCategory", applicationdetail.exemptedCategory);
  set(refurnishresponse, "uploadDocuments", applicationdetail.uploadDocuments);
  set(refurnishresponse, "remarks", applicationdetail.remarks);

  return refurnishresponse;
};


export const setApplicationNumberBox = (state, dispatch) => {

  let applicationNumber = get(state, "state.screenConfiguration.preparedFinalObject.PRSCP.applicationId", null);

  if (applicationNumber) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "props.number",
        applicationNumber
      )
    );
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};



export const getOPMSCards = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "authToken": "a5b5f52c-59af-4c58-b9b0-ccca80b65c12",
      "USER_INFO": {
        "id": 107,
        "roles": [{
          "name": "CITIZEN",
          "code": "CITIZEN"
        }
        ],
        "tenantId": `${getTenantId()}`,
        "uuid": "d3486db7-fb32-4528-af81-e33c4d05538a"
      }
    }
  }

  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_get?moduleName=egpm&masterName=ApplicationType&tenantId=ch",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }




};


export const getGridData1 = async () => {

  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",

      "userInfo": {
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
          "id": JSON.parse(getUserInfo()).id

        }],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": `${getTenantId()}`,
    "applicationType": 'PRSCP',

    "dataPayload": {
      "applicationType": 'PRSCP',
      "applicationStatus": JSON.parse(getUserInfo()).roles[0].code == 'SI' ? 'INITIATED,REASSIGNTOSI,PAID,RESENT' : JSON.parse(getUserInfo()).roles[0].code == "MOH" ? 'FORWARD' : ''

    }

  }

  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
  }




};

export const getSearchResultsForNocCretificate = async queryObject => {

  try {
    const response = await httpRequest("post", get(queryObject[3], "value"), "", [], get(queryObject[2], "value"));
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

export const getSearchResultsForNocCretificateDownload = async queryObject => {

  try {
    let filestoreIds = get(queryObject[2], "value");

    const response = await httpRequest(
      "get",
      get(queryObject[3], "value") + filestoreIds,
      "",
      []
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};


export const getGridDataAdvertisement1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",

      "userInfo": {
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
          "id": JSON.parse(getUserInfo()).id

        }],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": `${getTenantId()}`,
    "applicationType": 'ADVERTISEMENTNOC',

    "dataPayload": {
      "applicationType": 'ADVERTISEMENTNOC',
      "applicationStatus": JSON.parse(getUserInfo()).roles[0].code == 'SI' ? 'INITIATE,REASSIGNTOSI,PAID,RESENT' : JSON.parse(getUserInfo()).roles[0].code == "MOH" ? 'FORWARD' : ''

    }

  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
  }
};


export const getGridDataRoadcut1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",

      "userInfo": {
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
          "id": JSON.parse(getUserInfo()).id

        }],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": `${getTenantId()}`,
    "applicationType": 'ROADCUTNOC',

    "dataPayload": {
      "applicationType": 'ROADCUTNOC',
      "applicationStatus": JSON.parse(getUserInfo()).roles[0].code == 'SI' ? 'INITIATE,REASSIGNTOSI,PAID,RESENT' : JSON.parse(getUserInfo()).roles[0].code == "MOH" ? 'FORWARD' : ''

    }

  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
  }
};


export const getGridDataSellMeat1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",

      "userInfo": {
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
          "id": JSON.parse(getUserInfo()).id

        }],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": `${getTenantId()}`,
    "applicationType": 'SELLMEATNOC',

    "dataPayload": {
      "applicationType": 'SELLMEATNOC',
      "applicationStatus": JSON.parse(getUserInfo()).roles[0].code == 'SI' ? 'INITIATE,REASSIGNTOSI,PAID,RESENT' : JSON.parse(getUserInfo()).roles[0].code == "MOH" ? 'FORWARD' : ''

    }

  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};
export const UpdateMasterPrice
  = async (
    state, dispatch,
    queryObject,
    code
  ) => {

    try {
      const response = await httpRequest("post", "/egov-opmsService/noc/_updatepricebook", "", [], code);

      if (response.ResposneInfo.status === 'SUCCESS') {
       
        store.dispatch(
          toggleSnackbar(
            true,
            { labelName: 'Price Updated Successfully', labelCode: 'Price Updated Successfully' },
            "success"
          ),
          dispatch(setRoute(`/egov-pr/masterAdvertisement?purpose=updated`))
        );
        return response
      }
      else {
        store.dispatch(
          toggleSnackbar(
            true, { labelName: response.ResponseInfo.msgId, labelCode: response.ResponseInfo.msgId }, "error")
        );
      }
    } catch (error) {
      
    }
  };

export const createUpdateSellMeatNocApplication = async (state, dispatch, status) => {
  let response = '';
  let response_updatestatus = '';
  let nocId = getapplicationNumber() === 'null' ? '' : getapplicationNumber(); 
  let method = nocId ? "UPDATE" : "CREATE";

  try {
    let payload = get(state.screenConfiguration.preparedFinalObject, "SELLMEATNOC", []);
    let tenantId = get(state.screenConfiguration.preparedFinalObject, "", getTenantId());

    let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.EventDocuments", {});

	console.log("reduxDocuments");
	console.log(reduxDocuments);
    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    let Remarks = "";

    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentCode === "SELLMEAT.PROOF_POSSESSION_RENT_AGREEMENT") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });
    set(payload, "uploadDocuments", ownerDocuments);
    set(payload, "remarks", Remarks);
    console.log('payload : ', payload)
    //
    let response = '';
    setapplicationMode(status);

    if (method === "CREATE") {

      response = await httpRequest("post", "/egov-opmsService/noc/_create", "", [], { dataPayload: payload });
      console.log('pet response : ', response)
      if (response.applicationId !== 'null' || response.applicationId !== '') {
        dispatch(prepareFinalObject("SELLMEATNOC", response));
        setapplicationNumber(response.applicationId);
        setApplicationNumberBox(state, dispatch);
        return { status: "success", message: response };
      } else {
        return { status: "fail", message: response };
      }
    } else if (method === "UPDATE") {
      response = await httpRequest("post", "/egov-opmsService/noc/_update", "", [], { dataPayload: payload });
      if (status === 'RESENT') {
        response_updatestatus = await httpRequest("post", "/egov-opmsService/noc/_updateappstatus", "", [], { dataPayload: {} });
      }
      setapplicationNumber(response.applicationId);
      dispatch(prepareFinalObject("SELLMEATNOC", response));
      return { status: "success", message: response };
    }

  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let PublicRelationData = get(
      state,
      "screenConfiguration.preparedFinalObject.SELLMEATNOC",
      []
    );
    dispatch(prepareFinalObject("SELLMEATNOC", PublicRelationData));

    return { status: "failure", message: error };
  }
};


export const createUpdateRoadCutNocApplication = async (state, dispatch, status) => {
  let response = '';
  let response_updatestatus = '';
  let nocId = getapplicationNumber() === 'null' ? '' : getapplicationNumber();
  let method = nocId ? "UPDATE" : "CREATE";
  try {
    let payload = get(state.screenConfiguration.preparedFinalObject, "ROADCUTNOC", []);
    let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    let Remarks = "";

    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentCode === "ROADCUT.FILE_NAME") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        } else if (!doc.documentSubCode) {
          // SKIP BUILDING PLAN DOCS
          otherDocuments = [
            ...otherDocuments,
            {
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });

    set(payload, "uploadDocuments", ownerDocuments);
    set(payload, "remarks", Remarks);

    console.log('Road CUt payload : ', payload)
    setapplicationMode(status);

    if (method === "CREATE") {
      response = await httpRequest("post", "/egov-opmsService/noc/_create", "", [], { dataPayload: payload });
      console.log('pet response : ', response)
      if (response.applicationId !== 'null' || response.applicationId !== '') {
        dispatch(prepareFinalObject("ROADCUTNOC", response));
        setapplicationNumber(response.applicationId);
        setApplicationNumberBox(state, dispatch);
        return { status: "success", message: response };
      } else {
        return { status: "fail", message: response };
      }
    } else if (method === "UPDATE") {
      response = await httpRequest("post", "/egov-opmsService/noc/_update", "", [], { dataPayload: payload });
      if (status === 'RESENT') {
        response_updatestatus = await httpRequest("post", "/egov-opmsService/noc/_updateappstatus", "", [], { dataPayload: payload });
      }
      setapplicationNumber(response.applicationId);
      dispatch(prepareFinalObject("ROADCUTNOC", response));
      return { status: "success", message: response };
    }

  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let PublicRelationData = get(state, "screenConfiguration.preparedFinalObject.ROADCUTNOC", []);
    dispatch(prepareFinalObject("ROADCUTNOC", PublicRelationData));

    return { status: "failure", message: error };
  }
};

export const createUpdateADVNocApplication = async (state, dispatch, status) => {
  let response = '';
  let response_updatestatus = '';
  let nocId = getapplicationNumber() === 'null' ? '' : getapplicationNumber();
  let method = nocId ? "UPDATE" : "CREATE";
 
  try {
    let payload = get(state.screenConfiguration.preparedFinalObject, "ADVERTISEMENTNOC", []);
    let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
    // Set owners & other documents
    let ownerDocuments = [];
    let Remarks = "";
    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentCode === "ADV.ADV_PHOTOCOPY_HOARDING") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });
    set(payload, "uploadDocuments", ownerDocuments);
    set(payload, "remarks", Remarks);
    
    setapplicationMode(status);
    let responsecreateDemand = '';
    if (method === "CREATE") {
      //specially for calculating service
      dispatch(prepareFinalObject("ADVTCALCULATENOC",payload ));

      response = await httpRequest("post", "/egov-opmsService/noc/_create", "", [], { dataPayload: payload });
      if (response.applicationId !== 'null' || response.applicationId !== '') {
        dispatch(prepareFinalObject("ADVERTISEMENTNOC", response));
        setapplicationNumber(response.applicationId);
        setApplicationNumberBox(state, dispatch);
        //calculate service called
        responsecreateDemand = await createDemandForAdvNOC(state, dispatch);
        //calculate search Bill called
        responsecreateDemand.Calculations[0].taxHeadEstimates[0].estimateAmount > 0 ? 
        await searchBill(dispatch, response.applicationId, getTenantId()) :  '';

        lSRemoveItem(`exemptedCategory`);
        lSRemoveItemlocal(`exemptedCategory`);
        return { status: "success", message: response, createDemand : responsecreateDemand };
      } else {
        return { status: "fail", message: response, createDemand : responsecreateDemand };
      }
    } else if (method === "UPDATE") {
      response = await httpRequest("post", "/egov-opmsService/noc/_update", "", [], { dataPayload: payload });
     
      if (status === 'RESENT') {
        response_updatestatus = await httpRequest("post", "/egov-opmsService/noc/_updateappstatus", "", [], { dataPayload: {} });
      }
      setapplicationNumber(response.applicationId);
      setApplicationNumberBox(state, dispatch);
      dispatch(prepareFinalObject("ADVERTISEMENTNOC", response));
      return { status: "success", message: response };
    }
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    return { status: "failure", message: error };
  }
};


export const getUpdatePriceBook1 = async (pricebookid) => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",
      "authToken": "2c472bb8-c6a9-4467-8657-16066f72f559",
      "userInfo": {
       
        "roles": [

          {
            "code": JSON.parse(getUserInfo()).roles[0].code,
            "name": JSON.parse(getUserInfo()).roles[0].code,
            "id": JSON.parse(getUserInfo()).id
          }
        ],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": getTenantId(),
    "applicationType": "ADVERTISEMENTNOC",
    "applicationStatus": "UPDATE",
    "dataPayload": {
      "priceBookId": pricebookid
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_viewPriceBook",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};
export const getCategory1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {

      "authToken": "a5b5f52c-59af-4c58-b9b0-ccca80b65c12",
      "USER_INFO": {
        "id": JSON.parse(getUserInfo()).id,
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
        }
        ],
        "tenantId": getTenantId(),
        "uuid": JSON.parse(getUserInfo()).uuid,
      }
    }
    ,
    "MdmsCriteria": { "tenantId": getTenantId(), "moduleDetails": [{ "moduleName": "egpm", "masterDetails": [{ "name": "typeOfAdvertisement" }] }] }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

export const getSubCategory1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {

      "authToken": "a5b5f52c-59af-4c58-b9b0-ccca80b65c12",
      "USER_INFO": {
        "id": JSON.parse(getUserInfo()).id,
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
        }
        ],
        "tenantId": getTenantId(),
        "uuid": JSON.parse(getUserInfo()).uuid,
      }
    }
    ,
    "MdmsCriteria": { "tenantId": getTenantId(), "moduleDetails": [{ "moduleName": "egpm", "masterDetails": [{ "name": "subTypeOfAdvertisement" }] }] }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};


export const getMasterGridData1 = async () => {

  let queryObject = [];
  var requestBody = {

    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": "",
      "action": "search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",
      "authToken": "2c472bb8-c6a9-4467-8657-16066f72f559",
      "userInfo": {
     
        "roles": [

          {
            "code": JSON.parse(getUserInfo()).roles[0].code,
            "name": JSON.parse(getUserInfo()).roles[0].code,
            "id": JSON.parse(getUserInfo()).id
          }
        ],
        "uuid": JSON.parse(getUserInfo()).uuid,
        "createdDate": JSON.parse(getUserInfo()).createdDate,
        "lastModifiedDate": JSON.parse(getUserInfo()).lastModifiedDate,
        "dob": JSON.parse(getUserInfo()).dob,
        "pwdExpiryDate": JSON.parse(getUserInfo()).pwdExpiryDate
      }
    },
    "tenantId": getTenantId(),
    "applicationType": "ADVERTISEMENTNOC",
    "applicationStatus": "UPDATE",
    "dataPayload": {
      "priceBookId": ""
    }
  }

  try {
    const payload = await httpRequest(
      "post",
      "/egov-opmsService/noc/_viewPriceBook",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }




};





export const getMISSummaryReport = async data => {


  try {
    const response = await httpRequest(
      "post",
      "/report/egov-opmsService/MISSummaryReport/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};



export const getMISApplicationTypeReport = async data => {


  try {
    const response = await httpRequest(
      "post",
      "/report/egov-opmsService/RevenueCollectionReportApplicationTypeWise/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const getMISSectorReport = async data => {


  try {
    const response = await httpRequest(
      "post",
      "/report/egov-opmsService/RevenueCollectionReportSectorWise/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};



export const getSectordata1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {
      "apiId": "Rainmaker",
      "ver": ".01",
      "ts": 0,
      "action": "_search",
      "did": "1",
      "key": "",
      "msgId": "20170310130900|en_IN",
      "authToken": "d21b7506-31be-4280-a94d-6c89b0805392",
      "correlationId": "",
      
    },
    "applicationType": "PRSCP",
    "applicationStatus": "Create",
    "tenantId": getTenantId(),
    
    "MdmsCriteria": {
      "tenantId": getTenantId(),
      "moduleDetails": [
        {
          "moduleName": "egpm",
          "masterDetails": [
            {
              "name": "sector"
            }
          ]
        }
      ]
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};





export const getrepotforproccessingTime1 = async () => {

  let data = {
    "RequestInfo": {
      "apiId": "emp",
      "ver": "1.0",
      "ts": "10-03-2017 00:00:00",
      "action": "create",
      "did": "1",
      "key": "abcdkey",
      "msgId": "20170310130900",
      "requesterId": "rajesh",
      "authToken": "3081f773-159b-455b-b977-acfd6ed2c61b"
    },
    "tenantId": getTenantId(),
    "reportName": "ApplicationProcessingTimeReport"
  }
  try {
    const response = await httpRequest(
      "post",
      "/report/egov-opmsService/ApplicationProcessingTimeReport/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};
export const getMonthwiseReport = async data => {


  try {
    const response = await httpRequest(
      "post",
      "/report/egov-opmsService/RevenueCollectionReportMonthWise/_get",
      "",
      [],
      data
    );
    //alert(JSON.stringify(response));
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};



export const getMonth1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {

      "authToken": "a5b5f52c-59af-4c58-b9b0-ccca80b65c12",
      "USER_INFO": {
        "id": JSON.parse(getUserInfo()).id,
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
        }
        ],
        "tenantId": getTenantId(),
        "uuid": JSON.parse(getUserInfo()).uuid,
      }
    }
    ,
    "MdmsCriteria": {
      "tenantId": getTenantId(),
      "moduleDetails": [
        {
          "moduleName": "egpm",
          "masterDetails": [
            {
              "name": "reportMonth"
            }
          ]
        }
      ]
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};
export const getYear1 = async () => {
  let queryObject = [];
  var requestBody = {
    "RequestInfo": {

      "authToken": "a5b5f52c-59af-4c58-b9b0-ccca80b65c12",
      "USER_INFO": {
        "id": JSON.parse(getUserInfo()).id,
        "roles": [{
          "code": JSON.parse(getUserInfo()).roles[0].code,
          "name": JSON.parse(getUserInfo()).roles[0].code,
        }
        ],
        "tenantId": getTenantId(),
        "uuid": JSON.parse(getUserInfo()).uuid,
      }
    }
    ,
    "MdmsCriteria": {
      "tenantId": getTenantId(),
      "moduleDetails": [
        {
          "moduleName": "egpm",
          "masterDetails": [
            {
              "name": "reportYear"
            }
          ]
        }
      ]
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

export const UpdateStatus = async (dispatch, url, queryObject, code) => {
  try {
    const response = await httpRequest(
      "post", "/egov-opmsService/noc/_updateappstatus", "", [], code
    );
    // return response;
    if (response.ResponseInfo.status == "success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
       
      dispatch(setRoute(url))
    }
    else {
      dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
     
    }
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};



export const getEventGridData = async () => {
  
  let queryObject = [];
  var data = {
    "tenantId": `${getTenantId()}`,
    "RequestBody": {
      "tenantId":`${getTenantId()}`,
      "eventDetailUuid":"",
      "scheduledStatus":"",
      "eventStatus":"",
      "moduleCode": localStorageGet("modulecode"),
      "defaultGrid":true
    }

  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/event/_get",
      "",
      queryObject,
      data
    );
    return payload;
  } catch (error) {
  }
  
  };
  
  export const getLibraryGridData = async () => {
  
    let queryObject = [];
    var data = {
      "tenantId": `${getTenantId()}`,
      "RequestBody": {
        "tenantId":`${getTenantId()}`,
        "eventDetailUuid":"",
        "status":"EXPIRED",
        "eventStatus":"PUBLISHED",
        "defaultGrid":true,
        "moduleCode": localStorageGet("modulecode")
      }
  
    }
  
    try {
      const payload = await httpRequest(
        "post",
        "/prscp-services/v1/event/_get",
        "",
        queryObject,
        data
      );
      return payload;
    } catch (error) {
    }
    
    };
 export const getPressNoteGridData = async () => {
  
      let queryObject = [];
      var data = {
        "tenantId": `${getTenantId()}`,


        "RequestBody": {
          "tenantId":`${getTenantId()}`,
          "pressNoteUuid":getQueryArg(window.location.href, "pressnoteuuId") ,
       
          "defaultGrid":true,
          "moduleCode": localStorageGet("modulecode")
        }
    
      }
    
      try {
        const payload = await httpRequest(
          "post",
          "/prscp-services/v1/pressnote/_get",
          "",
          queryObject,
          data
        );
        return payload;
      } catch (error) {
      }
      
      };  
export const getInviteGuestGridData = async () => {
  
    let queryObject = [];
    var requestBody = {
      "tenantId": `${getTenantId()}`,
      "applicationType": 'PRSCP',
  
      "dataPayload": {
        "applicationType": 'PRSCP',
        "applicationStatus": JSON.parse(getUserInfo()).roles[0].code == 'SI' ? 'INITIATED,REASSIGNTOSI,PAID,RESENT' : JSON.parse(getUserInfo()).roles[0].code == "MOH" ? 'FORWARD' : ''
  
      }
  
    }
  
    try {
      const payload = await httpRequest(
        "post",
        "/pm-services/noc/_get",
        "",
        queryObject,
        requestBody
      );
      return payload;
    } catch (error) {
    }
  
  
  
  
  };

  export const getTenderGridData = async () => {
  
 
   let queryObject = [];
  
  
 let requestBody={"RequestBody":{
  "tenantId": getTenantId(),
  "moduleCode": localStorageGet("modulecode"),
  "tenderNoticeUuid":"",
  "tenderNoticeStatus":"CREATED",
 }}
    try {
      const payload = await httpRequest(
        "post",
        "/prscp-services/v1/tender/_get",
        "",
        queryObject,
        requestBody
      );
      return payload;
    } catch (error) {
    }
  };

  export const getBillingGrid = async () => {
  
    let queryObject = [];
    let requestBody={"RequestBody":{
      "tenantId":getTenantId(),
      "tenderNoticeUuid":"",
      "tenderNoticeStatus":"FORWARD",
     }}
  
    try {
      const payload = await httpRequest(
        "post",
        "/prscp-services/v1/tender/_get",
        "",
        queryObject,
        requestBody
      );
      return payload;
    } catch (error) {
    }
  };

  export const getPublishTenderGrid = async () => {
  
    let queryObject = [];
    let requestBody={"RequestBody":{
      "tenantId": getTenantId(),
      "moduleCode": localStorageGet("modulecode"),
      "tenderNoticeUuid":"",
      "tenderNoticeStatus": checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER')?"CREATED":"",
     }}
  
    try {
      const payload = await httpRequest(
        "post",
        "prscp-services/v1/tender/_get",
        "",
        queryObject,
        requestBody
      );
      return payload;
    } catch (error) {
    }
  };

  
  export const UpdateMasterTender = async (dispatch,data) => {
    debugger
      try {
        const response = await httpRequest(
          "post",
          "/prscp-services/v1/tender/_update",
          "",
          [],
          data
        );
        
       dispatch(prepareFinalObject("tenderNotice", {}));
       dispatch(prepareFinalObject("documentsUploadRedux[0]",{}));
       
        return response;
    
      } catch (error) {
        store.dispatch(
          toggleSnackbar(
            true,
            { labelName: error.message, labelCode: error.message },
            "error"
          )
        );
      }
    
    };
//craeteMaterDtat
  export const createMasterTender = async (dispatch,data) => {
    debugger
      try {
        const response = await httpRequest(
          "post",
          "/prscp-services/v1/tender/_create",
          "",
          [],
          data
        );
        //alert(JSON.stringify(response));
     dispatch(prepareFinalObject("tenderNotice", {}));
     dispatch(prepareFinalObject("documentsUploadRedux[0]",{}));
     
        return response;
    
      } catch (error) {
        store.dispatch(
          toggleSnackbar(
            true,
            { labelName: error.message, labelCode: error.message },
            "error"
          )
        );
      }
    
    };
    
    export const forwardMasterTender = async data => {
      debugger
        try {
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/tender/_forward",
            "",
            [],
            data
          );
          return response;
      
        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };



//craeteMaterDtat
  export const getCommittiee = async data => {
    
     
       try {
         const response = await httpRequest(
           "post",
           "/prscp-services/v1/committee/_get",
           "",
           [],
           data
         );
         return response;
     
       } catch (error) {
         store.dispatch(
           toggleSnackbar(
             true,
             { labelName: error.message, labelCode: error.message },
             "error"
           )
         );
       }
     
     };
     export const getSearchResultsViewEvent = async data => {
      
       
         try {
           const response = await httpRequest(
             "post",
             "/prscp-services/v1/event/_get",
             "",
             [],
             data
           );
           return response;
       
         } catch (error) {
           store.dispatch(
             toggleSnackbar(
               true,
               { labelName: error.message, labelCode: error.message },
               "error"
             )
           );
         }
       
       };
   export const getSearchResultsViewPressnotedata = async data => {
      
       
        try {
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/pressnote/_get",
            "",
            [],
            data
          );
          return response;
      
        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
       export const getSearchResultsViewLI = async data => {
      
       
        try {
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/library/_get",
            "",
            [],
            data
          );
          return response;
      
        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
	  
       export const getSearchResultsForTenderSummary = async data => {
        try {
          debugger
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/tender/_get",
            "",
            [],
            data
          );
       
          return response;
         
      
        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };


// Get InviteeeList of a event  grid data
export const getEventeelistGridData = async () => {
  
  let queryObject = [];
  var data = {
    "tenantId": `${getTenantId()}`,
    "RequestBody": {
      "tenantId":`${getTenantId()}`,
      "eventDetailUuid":localStorageGet("eventifforinvitatoin"),
      "moduleCode": localStorageGet("modulecode"),
      "createdBy":"",
	  "sentFlag":"false",
  
    }

  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/invitation/guest/_get",
      "",
      queryObject,
      data
    );
    return payload;
  } catch (error) {
    
  }
  
  };
   
   
   
// Get Sample Email Template

// Get InviteeeList of a event  grid data
export const getsampleemailtemplate = async () => {
  
  let queryObject = [];
  var data = {
    "tenantId": `${getTenantId()}`,
    "RequestBody": {
      "tenantId":`${getTenantId()}`,
      "templateMappedUuid":localStorageGet("templateMappedUuid"),
      "moduleCode": localStorageGet("modulecode"),
      "templateType":localStorageGet("templateType"),
      "moduleName":localStorageGet("templateModuleName")
    }

  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/template/_gettemplate",
      "",
      queryObject,
      data
    );
   
  let resultdata = JSON.parse(payload.ResponseBody.emailContent);
 
	localStorageSet("EmailTemplate", resultdata[0].emailBody)
	localStorageSet("EmailTemplatesubject", resultdata[0].emailSubject)
  localStorageSet("smsTemplate", payload.ResponseBody.smsContent)
  localStorageSet("email", resultdata[0].emailBody)
  localStorageSet("sms", payload.ResponseBody.smsContent)
   return payload;
  } catch (error) {
  }
  
  };   
  
//  Send Invitation to Selected guests   
export const invitationtoguests = async (state, dispatch) => {
  let subject1=get(state.screenConfiguration.preparedFinalObject, "CreateInvite.subjectemail")
  // Get all documents from response
  if(subject1!==undefined && subject1!=="")
  {
  let attachmentid = '';
   attachmentid = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux[0].documents[0].fileStoreId",
    ""
  );
  
  let queryObject = [];
  
  var data = {
    "tenantId": `${getTenantId()}`,
    "RequestBody": {
      "tenantId":`${getTenantId()}`,
      "eventDetailUuid":localStorageGet("eventifforinvitatoin"),
      "moduleCode": localStorageGet("modulecode"),
      "templateType":"CREATE_EVENT",
      "smsContent":get(state.screenConfiguration.preparedFinalObject, "CreateInvite.SMSContent"),
		"emailContent":[
		 {
			"emailSubject": get(state.screenConfiguration.preparedFinalObject, "CreateInvite.subjectemail"),
			"emailBody":localStorage.getItem('email')
		 }
		],
		"documentAttachment":[
		 {
			"fileStoreId": attachmentid
		 }
		]
  
  
  
    }

  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/invitation/_send",
      "",
      queryObject,
      data
    );
     
	console.log("Sampleeeeeeeeeeeeeeeeee");
	console.log(payload);
	
	if(payload.ResponseInfo.status === "Success")
	{
		 dispatch(toggleSnackbar(
                true,
                { labelName: 'Invitation sent successfully', labelCode: 'INVITATION_SUCCESS' },
                "success"
              ));
		
		setTimeout(function(){ 
      
      
      dispatch(setRoute("/egov-pr/eventList"));
      //window.location = "/egov-pr/eventList"; 
    }, 700);
	}
	
   return payload;
  } catch (error) {
    //  store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
}else{
  dispatch(
    toggleSnackbar(
      true,
      { labelName: "Please fill subject field!", labelKey: "PR_SUBJECT_FIELD_MANDATORY" },
      "warning"
    )
  );



}
  };   
      
      export const createPressmaster = async   (state,dispatch,data) => {
        dispatch(toggleSpinner());
        
        try {
         
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/press/_create",
            "",
            [],
            data
          );
          
          
          if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
            dispatch(toggleSpinner());
            
            store.dispatch(
              toggleSnackbar(
                true,
                { labelName: 'Success', labelCode: 'Success' },
                "success"
              ));
          
              dispatch(prepareFinalObject("PRESSDETAILS", {}));
              
             setTimeout(function(){  dispatch(setRoute(`masterSubMenu`)); }, 700);
             
           
            return response
          }
          else {
            dispatch(toggleSpinner());
            
            dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
          
          }

        } catch (error) {
          dispatch(toggleSpinner());
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };

   export const createPressNote = async   (dispatch,data) => {
        try {
          debugger
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/pressnote/_create",
            "",
            [],
            data
          );
        
          if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
            store.dispatch(
              toggleSnackbar(
                true,
                { labelName: 'Success', labelCode: 'Success' },
                "success"
              ));
             
             dispatch(prepareFinalObject("pressnote", {}));
             dispatch(prepareFinalObject("documentsUploadRedux[0]", {}));
             
            dispatch(setRoute(`pressnotesHome`))
            return response
          }
          else {
            dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
           
          }

        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
      export const publishTenderNotice = async   (dispatch,data) => {
        try {
          debugger
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/tender/_publish",
            "",
            [],
            data
          );
         
          if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
            store.dispatch(
              toggleSnackbar(
                true,
                { labelName: 'Success', labelCode: 'Success' },
                "success"
              ));
           
            dispatch(setRoute(`TenderSearch`))
            return response
          }
          else {
            dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
            
          }

        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
        

export const updatePressNote = async   (dispatch,data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/pressnote/_update",
      "",
      [],
      data
    );
  
    if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
       dispatch(prepareFinalObject("pressnote", {}));
     dispatch(prepareFinalObject("documentsUploadRedux[0]", {}));
       
      dispatch(setRoute(`pressNoteList`))
      return response
    }
    else {
      dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
    }

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};
 





      export const updatePressmaster = async   (dispatch,data) => {
        try {
          debugger
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/press/_update",
            "",
            [],
            data
          );
        
          if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
            store.dispatch(
              toggleSnackbar(
                true,
                { labelName: 'Success', labelCode: 'Success' },
                "success"
              ));
              dispatch(prepareFinalObject("PRESSDETAILS", {}));
              setTimeout(function(){  dispatch(setRoute(`masterSubMenu`)); }, 700);
       
            return response
          }
          else {
            dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
           
          }

        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };

      export const deletePressmaster = async(dispatch,data) => {
        try {
        //  debugger
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/press/_delete",
            "",
            [],
            data
          );
         
          if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
            store.dispatch(
              toggleSnackbar(
                true,
                { labelName: 'Success', labelCode: 'Success' },
                "success"
              ));
            dispatch(setRoute(`pressGrid`))
            return response
          }
          else {
            dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
           
          }

        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
	  
	  
	  
	  
	   
      export const getPressMasterGridData1 = async data => {
        try {
          let data={
           "requestBody": {
            "tenantId":getTenantId(),
            "pressMasterUuid": "",
            "moduleCode":localStorageGet("modulecode"),
              
          }
          }
          const response = await httpRequest(
            "post",
            "/prscp-services/v1/press/_get",
            "",
            [],
            data
          );
        return response;
          
          
      
        } catch (error) {
          store.dispatch(
            toggleSnackbar(
              true,
              { labelName: error.message, labelCode: error.message },
              "error"
            )
          );
        }
      
      };
	  
	  
	  export const getPressMasterSearchResultsViewMain = async data => {
        
         
           try {
             const response = await httpRequest(
               "post",
               "/prscp-services/v1/press/_get",
               "",
               [],
               data
             );
             return response;
         
           } catch (error) {
             store.dispatch(
               toggleSnackbar(
                 true,
                 { labelName: error.message, labelCode: error.message },
                 "error"
               )
             );
           }
         
         };
		 
		 
		 
		 export const furnishNocResponse_PressMaster = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};
 
  if(response.ResponseBody[0]!==null && response.ResponseBody[0]!=='')
  {
   
  set(refurnishresponse, "name", response.ResponseBody[0].personnelName);
  set(refurnishresponse,"typeOfThePress", response.ResponseBody[0].pressType);
  set(refurnishresponse,"publicationName", response.ResponseBody[0].publicationName);
  
  set(refurnishresponse, "emailId", response.ResponseBody[0].email);
  set(refurnishresponse, "mobileNo", response.ResponseBody[0].mobile);
 
  return refurnishresponse;
  }
};

export const getSearchResultsTender = async queryObject => {
  let tenantId = getTenantId();
  let data = {"RequestBody": {
    "tenantId": tenantId,
    "moduleCode":localStorageGet("modulecode"),
    "tenderNoticeStatus":"FORWARD",
    "tenderNoticeUuid":"390f31e1-6fca-469f-97a6-e2a3d0d4c724",
    "tenderNoticeId":"PMS-2020-04-20-044442"
}
  };
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const furnishResponseTender = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};
 
  if(response.ResponseBody[0]!==null && response.ResponseBody[0]!=='')
  {
     let startdate=response.ResponseBody[0].tenderDate
     startdate= startdate.split(' ');
   
  set(refurnishresponse, "tenderDate", startdate);
  set(refurnishresponse, "fileNumber", response.ResponseBody[0].fileNumber);

  set(refurnishresponse, "tenderSubject", response.ResponseBody[0].tenderSubject);
  set(refurnishresponse, "noteContent", response.ResponseBody[0].noteContent);
  
localStorageSet('tendernote',response.ResponseBody[0].noteContent)
  return refurnishresponse;
  }
};







export const createCommitteemaster = async   (dispatch,data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/committee/_create",
      "",
      [],
      data
    );
   
    if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
      

      dispatch(prepareFinalObject("PublicRelation[0].CreateCommitteeDetails", {}));
      dispatch(prepareFinalObject("PublicRelation[0].CreateMasterCommitee", {}));
      
      dispatch(setRoute(`committeeMaster`))
      return response
    }
    else {
		let errorMessage = "";
	   if(response.ResponseInfo.msgId === "Committee already exists")
	   {	   
			errorMessage = {
                labelName:
                  "Committee already exists",
                labelKey: "PR_COMMITTEE_EXISTS"
              };
	   }
		else
        {
				errorMessage = {
                labelName:
                  "Internal Error, Try Again",
                labelKey: "PR_INTERNAL_ERROR"
              };
		}				
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

 

export const deleteCommiteemaster = async(dispatch,data) => {
  try {
  //  debugger
    const response = await httpRequest(
      "post",
      "/pr-services/committee/_delete",
      "",
      [],
      data
    );
   
    if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
      dispatch(setRoute(`pressGrid`))
      return response
    }
    else {
      dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
     
    }

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


export const updateCommitteemaster = async   (dispatch,data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/committee/_update",
      "",
      [],
      data
    );
 
    if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
       // getPressMasterGridData1

      dispatch(prepareFinalObject("PublicRelation[0].CreateCommitteeDetails", {}));
      dispatch(prepareFinalObject("PublicRelation[0].CreateMasterCommitee", {}));
      dispatch(setRoute(`committeeMaster`))
      return response
    }
    else {
      dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
     
    }

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


export const getEmployeeByUUidHRMS = async data => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      data,
      []
    );
   return response
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


export const getEmployeeByUUid = async data => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/user/_search",
      "",
      [],
      data
    );
   return response
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const furnishResponse_Committee = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};
 
  if(response.ResponseBody[0]!==null && response.ResponseBody[0]!=='')
  {
   
  set(refurnishresponse, "committeename", response.ResponseBody[0].committeeName);
  set(refurnishresponse,"organizerDepartmentName", response.ResponseBody[0].committeeMember[0].departmentName);
  
 
  return refurnishresponse;
  }
};

export const cancelEventApplication = async (state,dispatch,data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/event/_updateStatus",
      "",
      [],
      data
    );
    if (response.ResponseInfo.status == "success" || response.ResponseInfo.status == "Success") {
      store.dispatch(
        toggleSnackbar(
          true,
          { labelName: 'Success', labelCode: 'Success' },
          "success"
        ));
      dispatch(setRoute(`search`))
      return response
    }
    else {
      dispatch(toggleSnackbar(true, response.ResponseInfo.msgId, "warning"));
     
    }
 

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};





export const getEventFilterResults = async (data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/event/_get",
      "",
      [],
      data
    );

   
   return response


   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};



export const getPressFilterResults = async (data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/pressnote/_get"
      ,
      "",
      [],
      data
    );

   
   return response

   
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};





export const getTenderFilterResults = async (data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get"
      ,
      "",
      [],
      data
    );

   
   return response

   
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};





export const getPressMasterFilterResults = async (data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/press/_get"
      ,
      "",
      [],
      data
    );

   
   return response

   
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};



export const getLocaliyReportData = async (data) => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/report/prscp-services/_get"
      ,
      "",
      [],
      data
    );

   
   return response

   
   

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


    



export const getSearchResultsForTenderSummary1 = async (dispatch,data)  => {
  try {
    debugger
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get",
      "",
      [],
      data
    );


    return response;
   
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


 
export const checkForRole = (roleList, roleToCheck) => {
  return roleList.map(role => {
    return role.code
  }).includes(roleToCheck)
}