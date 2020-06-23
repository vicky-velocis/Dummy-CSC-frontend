import { httpRequest } from "./api";
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
        const id = get(queryObject[0], "id");
        let response;
        set(queryObject[0], "tenantId", tenantId);
        set(queryObject[0], "owners[0].allotmentStartdate", convertDateToEpoch(queryObject[0].owners[0].allotmentStartdate))
        set(queryObject[0], "owners[0].posessionStartdate", convertDateToEpoch(queryObject[0].owners[0].posessionStartdate))
        set(queryObject[0], "owners[0].dateOfBirth", convertDateToEpoch(queryObject[0].owners[0].dateOfBirth))
        set(queryObject[0], "owners[0].payment[0].paymentDate", convertDateToEpoch(queryObject[0].owners[0].payment[0].paymentDate))
        set(queryObject[0], "owners[0].allotmentEnddate", addYears(queryObject[0].owners[0].allotmentStartdate, 5))
        set(queryObject[0], "owners[0].posessionEnddate", addYears(queryObject[0].owners[0].posessionStartdate, 5))
        set(queryObject[0], "propertyDetails.floors", "")
        set(queryObject[0], "propertyDetails.additionalDetails", "")
        set(queryObject[0], "owners[0].applicationStatus", "")
        set(queryObject[0], "owners[0].activeState", true)
        set(queryObject[0], "owners[0].isPrimaryOwner", true)
        set(queryObject[0], "owners[0].payment.amountDue", "")
        set(queryObject[0], "owners[0].payment.receiptNumber", "")
        if(!id) {
          set(queryObject[0], "masterDataAction", "INITIATE");
          response = await httpRequest(
            "post",
            "/csp/property/_create",
            "",
            [],
            { Properties: queryObject }
          );
        } else {
          if(activeIndex === 0) {
            set(queryObject[0], "masterDataAction", "MODIFY")
          } else {
            set(queryObject[0], "masterDataAction", "SUBMIT")
          }
          response = await httpRequest(
            "post",
            "/csp/property/_update",
            "",
            [],
            { Properties: queryObject }
          );
        }
        const {Properties} = response
        dispatch(prepareFinalObject("Properties", Properties));
        return true;
    } catch (error) {
        dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
        console.log(error);
        return false;
    }
  }