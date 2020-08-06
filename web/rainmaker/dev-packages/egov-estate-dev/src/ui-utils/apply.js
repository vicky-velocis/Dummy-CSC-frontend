import {
  httpRequest
} from "./api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
  addYears,
} from "../ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTranslatedLabel,
  updateDropDowns,
  ifUserRoleExists,
  convertEpochToDate,
  calculateAge
} from "../ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "redux/store";
import get from "lodash/get";
import set from "lodash/set";
import {
  getQueryArg,
  getFileUrl,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import {
  getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import {
  setBusinessServiceDataToLocalStorage,
  getMultiUnits,
  acceptedFiles,
} from "egov-ui-framework/ui-utils/commons";
import commonConfig from "config/common.js";
import {
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import {
  getSearchResults,
  getMortgageSearchResults
} from "./commons";
import {
  getUserInfo
} from "egov-ui-kit/utils/localStorageUtils";
import {
  setDocsForEditFlow
} from "./commons";
import {
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";
let userInfo = JSON.parse(getUserInfo());

export const applyEstates = async (state, dispatch, activeIndex) => {
  try {
    let queryObject = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Properties", [])
      )
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const id = get(queryObject[0], "id");

    let response;
    set(queryObject[0], "tenantId", tenantId);
    // set(queryObject[0], "owners[0].ownerDetails.allotmentStartdate", convertDateToEpoch(queryObject[0].owners[0].ownerDetails.allotmentStartdate))
    if (!id) {
      console.log(queryObject[0]);
      set(queryObject[0], "action", "DRAFT");
      response = await httpRequest(
        "post",
        "/property-service/property-master/_create",
        "",
        [], 
        {
          Properties: queryObject
        }
      );
    } else {
      if (activeIndex === 0) {
        set(queryObject[0], "action", "MODIFY")
      } else {
        set(queryObject[0], "action", "SUBMIT")
      }
      let applicationDocuments = get(queryObject[0], "ownerDetails.applicationDocuments") || [];
      applicationDocuments = applicationDocuments.map(item => ({
        ...item,
        active: true
      }))
      const removedDocs = get(state.screenConfiguration.preparedFinalObject, "PropertiesTemp[0].removedDocs") || [];
      applicationDocuments = [...applicationDocuments, ...removedDocs]
      set(queryObject[0], "ownerDetails.applicationDocuments", applicationDocuments)
      response = await httpRequest(
        "post",
        "/csp/property/_update",
        "",
        [], {
          Properties: queryObject
        }
      );
    }
    let {
      Properties
    } = response

    let applicationDocuments = Properties[0].propertyDetails.applicationDocuments || [];
    const removedDocs = applicationDocuments.filter(item => !item.active)
    applicationDocuments = applicationDocuments.filter(item => !!item.active)
    Properties = [{
      ...Properties[0],
      propertyDetails: {
        ...Properties[0].propertyDetails,
        applicationDocuments
      }
    }]
    dispatch(prepareFinalObject("Properties", Properties));
    dispatch(
      prepareFinalObject(
        "Properties[0].removedDocs",
        removedDocs
      )
    );
    return true;
  } catch (error) {
    dispatch(toggleSnackbar(true, {
      labelName: error.message
    }, "error"));
    console.log(error);
    return false;
  }
}