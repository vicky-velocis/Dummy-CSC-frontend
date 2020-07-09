import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import {
  createPriceList,
  getMaterialMasterSearchResults,
  getPriceListSearchResults,
  UpdatePriceList
} from "../../../../../ui-utils/storecommonsapi";
import {
  convertDateToEpoch,
  epochToYmdDate,
  showHideAdhocPopup,
  validateFields
} from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {  
  samplematerialsSearch,
  
  } from "../../../../../ui-utils/sampleResponses";
// SET ALL SIMPLE DATES IN YMD FORMAT
const setDateInYmdFormat = (obj, values) => {
  values.forEach(element => {
    set(obj, element, epochToYmdDate(get(obj, element)));
  });
};

// SET ALL MULTIPLE OBJECT DATES IN YMD FORMAT
const setAllDatesInYmdFormat = (obj, values) => {
  values.forEach(element => {
    let elemObject =
      get(obj, `${element.object}`, []) === null
        ? []
        : get(obj, `${element.object}`, []);
    for (let i = 0; i < elemObject.length; i++) {
      element.values.forEach(item => {
        set(
          obj,
          `${element.object}[${i}].${item}`,
          epochToYmdDate(get(obj, `${element.object}[${i}].${item}`))
        );
      });
    }
  });
};

// SET ALL MULTIPLE OBJECT EPOCH DATES YEARS
const setAllYears = (obj, values) => {
  values.forEach(element => {
    let elemObject =
      get(obj, `${element.object}`, []) === null
        ? []
        : get(obj, `${element.object}`, []);
    for (let i = 0; i < elemObject.length; i++) {
      element.values.forEach(item => {
        let ymd = epochToYmdDate(get(obj, `${element.object}[${i}].${item}`));
        let year = ymd ? ymd.substring(0, 4) : null;
        year && set(obj, `${element.object}[${i}].${item}`, year);
      });
    }
  });
};

const setRolesData = obj => {
  let roles = get(obj, "user.roles", []);
  let newRolesArray = [];
  roles.forEach(element => {
    newRolesArray.push({
      label: element.name,
      value: element.code
    });
  });
  set(obj, "user.roles", newRolesArray);
};

const returnEmptyArrayIfNull = value => {
  if (value === null || value === undefined) {
    return [];
  } else {
    return value;
  }
};

export const setRolesList = (state, dispatch) => {
  let rolesList = get(
    state.screenConfiguration.preparedFinalObject,
    `Employee[0].user.roles`,
    []
  );
  let furnishedRolesList = rolesList.map(item => {
    return " " + item.label;
  });
  dispatch(
    prepareFinalObject(
      "hrms.reviewScreen.furnishedRolesList",
      furnishedRolesList.join()
    )
  );
};

const setDeactivationDocuments = (state, dispatch) => {
  // GET THE DEACTIVATION DOCUMENTS FROM UPLOAD FILE COMPONENT
  let deactivationDocuments = get(
    state.screenConfiguration.preparedFinalObject,
    `deactivationDocuments`,
    []
  );
  // FORMAT THE NEW DOCUMENTS ARRAY ACCORDING TO THE REQUIRED STRUCTURE
  let addedDocuments = deactivationDocuments.map(document => {
    return {
      documentName: get(document, "fileName", ""),
      documentId: get(document, "fileStoreId", ""),
      referenceType: "DEACTIVATION"
    };
  });
  // GET THE PREVIOUS DOCUMENTS FROM EMPLOYEE OBJECT
  let documents = get(
    state.screenConfiguration.preparedFinalObject,
    `Employee[0].documents`,
    []
  );
  // ADD THE NEW DOCUMENTS TO PREVIOUS DOCUMENTS
  documents = [...documents, ...addedDocuments];
  // SAVE THE DOCUMENTS BACK TO EMPLOYEE
  dispatch(prepareFinalObject("Employee[0].documents", documents));
};

// Remove objects from Arrays not having the specified key (eg. "id")
// and add the key-value isActive:false in those objects having the key
// so as to deactivate them after the API call
const handleDeletedCards = (jsonObject, jsonPath, key) => {
  let originalArray = get(jsonObject, jsonPath, []);
  let modifiedArray = originalArray.filter(element => {
    return element.hasOwnProperty(key) || !element.hasOwnProperty("isDeleted");
  });
  modifiedArray = modifiedArray.map(element => {
    if (element.hasOwnProperty("isDeleted")) {
      element["isActive"] = false;
    }
    return element;
  });
  set(jsonObject, jsonPath, modifiedArray);
};

export const furnishmaterialsData = (state, dispatch) => {
  let indents = get(
    state.screenConfiguration.preparedFinalObject,
    "indents",
    []
  );
  // setDateInYmdFormat(indents[0], ["dateOfAppointment", "user.dob"]);
  // setAllDatesInYmdFormat(indents[0], [
  //   { object: "assignments", values: ["fromDate", "toDate"] },
  //   { object: "priceListDetails", values: ["serviceFrom", "serviceTo"] }
  // ]);
  // setAllYears(indents[0], [
  //   { object: "education", values: ["yearOfPassing"] },
  //   { object: "tests", values: ["yearOfPassing"] }
  // ]);
  // setRolesData(indents[0]);
  // setRolesList(state, dispatch);
  dispatch(prepareFinalObject("indents", indents));
};

export const handleCreateUpdatePriceList = (state, dispatch) => {
  let uuid = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee[0].uuid",
    null
  );
  if (uuid) {
    createUpdatePriceList(state, dispatch, "UPDATE");
  } else {
    createUpdatePriceList(state, dispatch, "CREATE");
  }
};

export const createUpdatePriceList = async (state, dispatch, action) => {
  const pickedTenant = get(
    state.screenConfiguration.preparedFinalObject,
    "indents[0].tenantId"
  );
  const tenantId =  getTenantId();
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
 
  let indents = get(
    state.screenConfiguration.preparedFinalObject,
    "indents",
    []
  );
  set(indents[0], "tenantId", tenantId);
  set(indents[0], "status", true);
  // get set date field into epoch

  let indentDate =
  get(state, "screenConfiguration.preparedFinalObject.indents[0].indentDate",0) 
  indentDate = convertDateToEpoch(indentDate);
  set(indents[0],"indentDate", indentDate);

  let expectedDeliveryDate =
  get(state, "screenConfiguration.preparedFinalObject.indents[0].expectedDeliveryDate",0) 
  expectedDeliveryDate = convertDateToEpoch(expectedDeliveryDate);
  set(indents[0],"expectedDeliveryDate", agreementDate);


  // set date to epoch in  price list material name
  let priceListDetails = returnEmptyArrayIfNull(
    get(indents[0], "priceListDetails", [])
  );
 
  //handleDeletedCards(indents[0], "storeMapping", "id");
 

  



  if (action === "CREATE") {
    try {
      console.log(queryObject)
      console.log("queryObject")
      let response = await createPriceList(
        queryObject,        
        indents,
        dispatch
      );
      // let employeeId = get(response, "Employees[0].code");
      // const acknowledgementUrl =
      //   process.env.REACT_APP_SELF_RUNNING === "true"
      //     ? `/egov-ui-framework/hrms/acknowledgement?purpose=create&status=success&applicationNumber=${employeeId}`
      //     : `/hrms/acknowledgement?purpose=create&status=success&applicationNumber=${employeeId}`;
      // dispatch(setRoute(acknowledgementUrl));
    } catch (error) {
      furnishmaterialsData(state, dispatch);
    }
  } else if (action === "UPDATE") {
    try {
      let response = await UpdatePriceList(
        queryObject,
        indents,
        dispatch
      );
      // let employeeId = response && get(response, "Employees[0].code");
      // const acknowledgementUrl =
      //   process.env.REACT_APP_SELF_RUNNING === "true"
      //     ? `/egov-ui-framework/hrms/acknowledgement?purpose=update&status=success&applicationNumber=${employeeId}`
      //     : `/hrms/acknowledgement?purpose=update&status=success&applicationNumber=${employeeId}`;
      // dispatch(setRoute(acknowledgementUrl));
    } catch (error) {
      furnishmaterialsData(state, dispatch);
    }
  }

};

export const getMaterialmasterData = async (
  state,
  dispatch,
  code,
  tenantId
) => {
  let queryObject = [
    {
      key: "code",
      value: code
    },
    {
      key: "tenantId",
      value: tenantId
    }
  ];

 let response = await getMaterialMasterSearchResults(queryObject, dispatch);
// let response = samplematerialsSearch();
  dispatch(prepareFinalObject("materials", get(response, "materials")));
  dispatch(
    handleField(
      "create",
      "components.div.children.headerDiv.children.header.children.header.children.key",
      "props",
      {
        labelName: "Edit Material Maste",
        labelKey: "STORE_EDITMATERIAL_MASTER_HEADER"
      }
    )
  );
 // furnishmaterialsData(state, dispatch);
};
