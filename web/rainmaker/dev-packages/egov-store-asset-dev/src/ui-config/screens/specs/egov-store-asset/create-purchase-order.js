import {
    getStepperObject,
    getCommonHeader,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { footer } from "./createPurchaseOrderResource/footer";
  import {purchaseOrderHeader  } from "./createPurchaseOrderResource/purchaseOrderHeader";
  import { contractDetails } from "./createPurchaseOrderResource/contractDetails";
  import { purchaseOrderDetails } from "./createPurchaseOrderResource/purchaseOrderDetails";
  import { poApprovalInfo } from "./createPurchaseOrderResource/poApprovalInfo";
  

  import get from "lodash/get";
  import map from "lodash/map";
  import { httpRequest } from "../../../../ui-utils";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

  
  export const stepsData = [
    { labelName: "Purchase Order", labelKey: "STORE_PO_HEADER" },
    { labelName: "Tender/Quotation/Rate Contract Detail",  labelKey: "STORE_PO_RC_DETAIL_HEADER"},
    { labelName: "Purchase Order Details", labelKey: "STORE_PO_DETAILS_HEADER" },
    { labelName: "Approval Information", labelKey: "STORE_PO_APPROVAL_INFO_HEADER" },
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
  

  
  const getMdmsData = async (state, dispatch, tenantId) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Department",
                filter: "[?(@.active == true)]"
              },
              {
                name: "Designation",
                filter: "[?(@.active == true)]"
              }
            ]
          },
          {
            moduleName: "ACCESSCONTROL-ROLES",
            masterDetails: [
              {
                name: "roles",
                filter: "$.[?(@.code!='CITIZEN')]"
              }
            ]
          },
          {
            moduleName: "egov-location",
            masterDetails: [
              {
                name: "TenantBoundary"
                // filter: "$.*.hierarchyType"
              }
            ]
          },
          {
            moduleName: "egov-hrms",
            masterDetails: [
              {
                name: "Degree",
                filter: "[?(@.active == true)]"
              },
              {
                name: "EmployeeStatus",
                filter: "[?(@.active == true)]"
              },
              {
                name: "EmployeeType",
                filter: "[?(@.active == true)]"
              },
              {
                name: "DeactivationReason",
                filter: "[?(@.active == true)]"
              },
              {
                name: "EmploymentTest",
                filter: "[?(@.active == true)]"
              },
              {
                name: "Specalization",
                filter: "[?(@.active == true)]"
              }
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
      dispatch(
        prepareFinalObject("createScreenMdmsData", get(response, "MdmsRes"))
      );
      setRolesList(state, dispatch);
      setHierarchyList(state, dispatch);
      return true;
    } catch (e) {
      console.log(e);
    }
  };
  
  const getYearsList = (startYear, state, dispatch) => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
  
    while (startYear <= currentYear) {
      years.push({ value: (startYear++).toString() });
    }
  
    dispatch(prepareFinalObject("yearsList", years));
  };
  
  const setRolesList = (state, dispatch) => {
    let rolesList = get(
      state.screenConfiguration.preparedFinalObject,
      `createScreenMdmsData.ACCESSCONTROL-ROLES.roles`,
      []
    );
    let furnishedRolesList = rolesList.filter(item => {
      return item.code;
    });
    dispatch(
      prepareFinalObject(
        "createScreenMdmsData.furnishedRolesList",
        furnishedRolesList
      )
    );
  };
  
  const setHierarchyList = (state, dispatch) => {
    let tenantBoundary = get(
      state.screenConfiguration.preparedFinalObject,
      `createScreenMdmsData.egov-location.TenantBoundary`,
      []
    );
    let hierarchyList = map(tenantBoundary, "hierarchyType", []);
    dispatch(
      prepareFinalObject("createScreenMdmsData.hierarchyList", hierarchyList)
    );
  };
  
  const freezeEmployedStatus = (state, dispatch) => {
    let employeeStatus = get(
      state.screenConfiguration.preparedFinalObject,
      "Employee[0].employeeStatus"
    );
    if (!employeeStatus) {
      dispatch(prepareFinalObject("Employee[0].employeeStatus", "EMPLOYED"));
    }
  };
  
  const screenConfig = {
    uiFramework: "material-ui",
    name: "create-purchase-order",
    // hasBeforeInitAsync:true,
    beforeInitScreen: (action, state, dispatch) => {
     
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
          formwizardFourthStep,
          footer
        }
      }
    }
  };
  
  export default screenConfig;
  