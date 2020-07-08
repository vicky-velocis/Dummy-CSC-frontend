import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import {
  createOpeningBalance,
  getOpeningBalanceSearchResults,
  updateOpeningBalance
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
export const handleCreateUpdateOpeningBalence = (state, dispatch) => {
    let uuid = get(
      state.screenConfiguration.preparedFinalObject,
      "Employee[0].uuid",
      null
    );

    // Validation for Openning Balance

    const isFinancialYearContainerValid = validateFields(
      "components.div.children.OpeningBalanceDetails.children.cardContent.children.View1.children.cardContent.children.FinancialYearContainer.children",
      state,
      dispatch,
      "createopeningbalence"
    );
    const isOpeningBalanceContainer = validateFields(
      "components.div.children.OpeningBalanceDetails.children.cardContent.children.View2.children.cardContent.children.OpeningBalanceContainer.children",
      state,
      dispatch,
      "createopeningbalence"
    );
    
    if(isFinancialYearContainerValid && isOpeningBalanceContainer)
    {
      // Date vadiation 
      let expiryDateValid = true
      let receiptDateValid = true
      const CurrentDate = new Date();
      let receiptDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].receiptDate",
        null
      );
      let expiryDate = get(
        state.screenConfiguration.preparedFinalObject,
        "materialReceipt[0].receiptDetailsAddnInfo[0].expiryDate",
        null
      );
      if(Number(receiptDate))
      {
        //alert('i am number')
        receiptDate = epochToYmd(receiptDate)
      }
      if(Number(expiryDate))
    {
      //alert('i am number')
      expiryDate = epochToYmd(expiryDate)
    }
    const  receiptDate_ = new Date(receiptDate)
    const  expiryDate_ = new Date(expiryDate)
    if(receiptDate_>=CurrentDate)
    {
      receiptDateValid = false
    }
    if(expiryDate_<CurrentDate)
    {
      expiryDateValid = false
    }
    if(!expiryDateValid)
    {
      const errorMessage = {
        labelName: "Expiry Date Must be greater then current date ",
        labelKey: "STORE_OPENING_BALANCE_EXPIRY_DATE_VALIDATION"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
    else if (!receiptDateValid)
    {
      const errorMessage = {
        labelName: "Receipt Date Must be less then or equal current date",
        labelKey: "STORE_OPENING_BALANCE_RECEIPT_DATE_VALIDATION"
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
   else{
     
   

    if (uuid) {
      createUpdateOpeningBalence(state, dispatch, "UPDATE");
    } else {
      createUpdateOpeningBalence(state, dispatch, "CREATE");
    }
  }
  }
  };
  
  export const createUpdateOpeningBalence = async (state, dispatch, action) => {
    const pickedTenant = get(
      state.screenConfiguration.preparedFinalObject,
      "materialReceipt[0].tenantId"
    );
    const tenantId =  getTenantId();
    let queryObject = [
      {
        key: "tenantId",
        value: tenantId
      }
    ];
   
    let materialReceiptObject = get(
      state.screenConfiguration.preparedFinalObject,
      "materialReceipt",
      []
    );
  

     // set date field in eoch formate

    let receivedDate =
  get(state, "screenConfiguration.preparedFinalObject.materialReceipt[0].receiptDetailsAddnInfo[0].receivedDate",0) 
  receivedDate = convertDateToEpoch(receivedDate);
  set(materialReceiptObject[0],"receiptDate", receivedDate);

  let expiryDate =
  get(state, "screenConfiguration.preparedFinalObject.materialReceipt[0].receiptDetailsAddnInfo[0].expiryDate",0) 
  expiryDate = convertDateToEpoch(expiryDate);
  set(materialReceiptObject[0],"receiptDetailsAddnInfo[0].expiryDate", expiryDate);


  
    if (action === "CREATE") {
      try {
       
        let response = await createOpeningBalance(
          queryObject,         
          materialReceiptObject,
          dispatch
        );
        // let employeeId = get(response, "Employees[0].code");
        // const acknowledgementUrl =
        //   process.env.REACT_APP_SELF_RUNNING === "true"
        //     ? `/egov-ui-framework/hrms/acknowledgement?purpose=create&status=success&applicationNumber=${employeeId}`
        //     : `/hrms/acknowledgement?purpose=create&status=success&applicationNumber=${employeeId}`;
        // dispatch(setRoute(acknowledgementUrl));
      } catch (error) {
        //furnishmaterialsData(state, dispatch);
      }
    } else if (action === "UPDATE") {
      try {
        let response = await updateOpeningBalance(
          queryObject,
          materialReceiptObject,
          dispatch
        );
        // let employeeId = response && get(response, "Employees[0].code");
        // const acknowledgementUrl =
        //   process.env.REACT_APP_SELF_RUNNING === "true"
        //     ? `/egov-ui-framework/hrms/acknowledgement?purpose=update&status=success&applicationNumber=${employeeId}`
        //     : `/hrms/acknowledgement?purpose=update&status=success&applicationNumber=${employeeId}`;
        // dispatch(setRoute(acknowledgementUrl));
      } catch (error) {
        //furnishmaterialsData(state, dispatch);
      }
    }
  
  };
  
  export const getOpeningBalanceData = async (
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
  
   let response = await getOpeningBalanceSearchResults(queryObject, dispatch);
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