
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar,toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getFileUrlFromAPI, getMultiUnits, getQueryArg,   } from "egov-ui-framework/ui-utils/commons";
import {  getTenantId, getUserInfo,  } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "redux/store";

import { httpRequest } from "./api";

import { setRoute } from "egov-ui-framework/ui-redux/app/actions";


const role_name = JSON.parse(getUserInfo()).roles[0].code
export const getstoreTenantId = () => {
  let gettenantId = getTenantId()
  gettenantId = gettenantId.split('.')  
  return gettenantId[0];
};
export const getMaterialMasterSearchResults = async queryObject => {

  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "/store-asset-services/materials/_search",     
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
   // throw error;
  }

};
export const createMaterial = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/materials/_create",
      "",
      queryObject,
      { materials: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
export const updateMaterial = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/materials/_update",
      "",
      queryObject,
      { materials: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
export const getStoresSearchResults = async queryObject => {

  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "store-asset-services/stores/_search",     
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    store.dispatch(toggleSpinner());
    //throw error;
  }

};
// price List API 
export const getPriceListSearchResults = async queryObject => {

  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "/store-asset-services/pricelists/_search",     
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
   // throw error;
  }

};
export const createPriceList = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/pricelists/_create",
      "",
      queryObject,
      { pricelists: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
export const UpdatePriceList = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/pricelists/_update",
      "",
      queryObject,
      { priceLists: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
// Opening Balance API
// price List API 
export const getOpeningBalanceSearchResults = async queryObject => {

  try {
    store.dispatch(toggleSpinner());
    const response = await httpRequest(
      "post",
      "/store-asset-services/openingbalance/_search",     
      "",
      queryObject
    );
    store.dispatch(toggleSpinner());
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
   // throw error;
  }

};
export const createOpeningBalance = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/openingbalance/_create",
      "",
      queryObject,
      { materialReceipt: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};
export const updateOpeningBalance = async (queryObject, payload, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/store-asset-services/openingbalance/_update",
      "",
      queryObject,
      { materialReceipt: payload }
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};