import {
    getStepperObject,
    getCommonHeader,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getTenantId,getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
  import { footer } from "./createPurchaseOrderResource/footer";
  import {purchaseOrderHeader  } from "./createPurchaseOrderResource/purchaseOrderHeader";
  import { contractDetails } from "./createPurchaseOrderResource/contractDetails";
  import { purchaseOrderDetails } from "./createPurchaseOrderResource/purchaseOrderDetails";
  import { poApprovalInfo } from "./createPurchaseOrderResource/poApprovalInfo";
  import commonConfig from '../../../../config/common';

  import get from "lodash/get";
  import map from "lodash/map";
  import { httpRequest } from "../../../../ui-utils";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getSearchResults } from "../../../../ui-utils/commons";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  export const stepsData = [
    { labelName: "Purchase Order", labelKey: "STORE_PO_HEADER" },
    { labelName: "Tender/Quotation/Rate Contract Detail",  labelKey: "STORE_PO_RC_DETAIL_HEADER"},
    { labelName: "Purchase Order Details", labelKey: "STORE_PO_DETAILS_HEADER" },
  //  { labelName: "Approval Information", labelKey: "STORE_PO_APPROVAL_INFO_HEADER" },
  ];
  export const stepper = getStepperObject(
    { props: { activeStep: 0 } },
    stepsData
  );
  
  
  export const header = getCommonContainer({
    header: getCommonHeader({
      labelName: `Create Purchase Order`,
      labelKey: "STORE_PO_CREATE_HEADER"
    })
  });
  
  export const formwizardFirstStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form1"
    },
    children: {
     purchaseOrderHeader
    }
  };
  
  export const formwizardSecondStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form2"
    },
    children: {
      contractDetails
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
      purchaseOrderDetails
    },
    visible: false
  };
  
  export const formwizardFourthStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form4"
    },
    children: {
      poApprovalInfo
    },
    visible: false
  };
  

  
  const getMdmsData = async (action, state, dispatch) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [ 
          {
            moduleName: "store-asset",
            masterDetails: [
              { name: "RateType", filter: "[?(@.active == true)]" },
            ]
          },
          {
            moduleName: "common-masters",
            masterDetails: [
              { name: "UOM", filter: "[?(@.active == true)]" },
            ]
          }
        ]
      }
    };
    try {
      const response = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
      dispatch( prepareFinalObject("createScreenMdmsData", get(response, "MdmsRes")) );
    } catch (e) {
      console.log(e);
    }
  };
  
  const getData = async (action, state, dispatch) => {
    await getMdmsData(action, state, dispatch);
    //fetching supplier master
    const queryObject = [{ key: "tenantId", value: getTenantId()  }];
  
    getSearchResults(queryObject, dispatch,"supplier")
    .then(response =>{
      if(response){
        const supplierNames = response.suppliers.map(item => {
          let code = item.code;
          let name = item.name;
          return{code,name}
        } )
        dispatch(prepareFinalObject("searchMaster.supplierName", supplierNames));
      }
    });

    //fetching store name
    getSearchResults(queryObject, dispatch,"storeMaster")
    .then(response =>{
      if(response){
        const storeNames = response.stores.map(item => {
          let code = item.code;
          let name = item.name;
          return{code,name}
        } )
        dispatch(prepareFinalObject("searchMaster.storeNames", storeNames));
      }
    });

    // fetching employee designation
    const userInfo = JSON.parse(getUserInfo());
    if(userInfo){
      dispatch(prepareFinalObject("purchaseOrders[0].createdBy", userInfo.name));
      const queryParams = [{ key: "codes", value: userInfo.userName },{ key: "tenantId", value:  getTenantId() }];
      try { 
        const payload = await httpRequest(
          "post",
          "/egov-hrms/employees/_search",
          "_search",
          queryParams
        );
        if(payload){
          const {designationsById} = state.common;
          const empdesignation = payload.Employees[0].assignments[0].designation;
          if(designationsById){
          const desgnName = Object.values(designationsById).filter(item =>  item.code === empdesignation )
          dispatch(prepareFinalObject("purchaseOrders[0].designation", desgnName[0].name));
          }
        }
        
      } catch (e) {
        console.log(e);
      }
    }

  }
  const screenConfig = {
    uiFramework: "material-ui",
    name: "create-purchase-order",
    // hasBeforeInitAsync:true,
    beforeInitScreen: (action, state, dispatch) => {
      getData(action, state, dispatch);
      let indentNumber="";
      indentNumber = getQueryArg(window.location.href, "indentNumber");
      if(indentNumber){     
          dispatch(prepareFinalObject("purchaseOrders[0].purchaseType", "Indent"));   
          dispatch(prepareFinalObject("purchaseOrders[0].indentNumbers", [indentNumber]));
      }
      return action;
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
          formwizardFirstStep,
          formwizardSecondStep,
          formwizardThirdStep,
        //  formwizardFourthStep,
          footer
        }
      }
    }
  };
  
  export default screenConfig;
  