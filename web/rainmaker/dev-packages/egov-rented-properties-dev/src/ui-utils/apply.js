import { httpRequest } from "./api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
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
  import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import store from "redux/store";
  import get from "lodash/get";
  import set from "lodash/set";
  import {
    getQueryArg,
    getFileUrl,
    getFileUrlFromAPI
  } from "egov-ui-framework/ui-utils/commons";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import {
    setBusinessServiceDataToLocalStorage,
    getMultiUnits,
    acceptedFiles,
  } from "egov-ui-framework/ui-utils/commons";
  import commonConfig from "config/common.js";
  import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";


  export const applyRentedProperties = async (state, dispatch, activeIndex) => {
    try {
        let queryObject = JSON.parse(
            JSON.stringify(
              get(state.screenConfiguration.preparedFinalObject, "Properties", [])
            )
          );
        const tenantId = getQueryArg(window.location.href, "tenantId");
        set(queryObject[0], "tenantId", tenantId);

        console.log("========query Object =======", queryObject, activeIndex)

    } catch (error) {
        dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
        console.log(error);
        return false;
    }
  }