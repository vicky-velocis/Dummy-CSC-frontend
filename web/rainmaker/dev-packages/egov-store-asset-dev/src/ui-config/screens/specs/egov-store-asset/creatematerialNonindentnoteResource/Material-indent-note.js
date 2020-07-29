import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
 // import { getTodaysDateInYMD } from "../../utils";
 import set from "lodash/set";
 import get from "lodash/get";
 import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import{getMaterialBalanceRateResults, getStoresSearchResults} from '../../../../../ui-utils/storecommonsapi'
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
 import {  handleScreenConfigurationFieldChange as handleField, prepareFinalObject  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
 import { httpRequest } from "../../../../../ui-utils/api";

 const getMaterialData = async (action, state, dispatch) => {
  const tenantId = getTenantId();
  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId(),
    },
  ];
  let storecode = get(state,"screenConfiguration.preparedFinalObject.materialIssues[0].fromStore.code",'')
  queryObject.push({
    key: "issueingStore",
    value: storecode
  });


    
  try {
    let response = await getStoresSearchResults(queryObject, dispatch);
    console.log(response);
  

  } catch (e) {
    console.log(e);
  }
};
  export const IndentMaterialIssueDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Non-Indent Material Issue",
        labelKey: "STORE_MATERIAL_INDENT_NOTE_NON_INDENT_MATERIAL_ISSUE_NOTE"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    IndentMaterialIssueContainer: getCommonContainer({
      fromStore: {
        ...getSelectField({
          label: {
            labelName: "Issuing Store Name",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME"
          },
          placeholder: {
            labelName: "Select Issuing Store Name",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME_SELECT"
          },
          required: true,
         
          jsonPath: "materialIssues[0].fromStore.code",
          sourceJsonPath: "store.stores",
            props: {
              optionValue: "code",
              optionLabel: "name",
            },
        }),
        beforeFieldChange: (action, state, dispatch) => {
          //alert(action.value)
          let store = get(state, "screenConfiguration.preparedFinalObject.store.stores",[]) 
          let fromstore = store.filter(x=> x.code === action.value)
          let toStore = get(state, "screenConfiguration.preparedFinalObject.materialIssues[0].toStore.code",'') 
          if(action.value !== toStore)
          {
            if(fromstore&&fromstore[0])
            {
                dispatch(prepareFinalObject("materialIssues[0].fromStore.id",fromstore[0].id));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.code",fromstore[0].code));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.name",fromstore[0].name));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.description",fromstore[0].description));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.billingAddress",fromstore[0].billingAddress));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.department",fromstore[0].department));
               
                dispatch(prepareFinalObject("materialIssues[0].fromStore.deliveryAddress",fromstore[0].deliveryAddress));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.storeInCharge.code",fromstore[0].storeInCharge.code));
                dispatch(prepareFinalObject("materialIssues[0].fromStore.tenantId",getTenantId()));         
                getMaterialData(action,state,dispatch)
            }
          }
          else{
           
          }
          
        }
      },
      IssueDate: {
        ...getDateField({
          label: {
            labelName: "Issue Date",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_DATE"
          },
          placeholder: {
            labelName: "Enter Issue Date",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_DATE_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Date") ,
          jsonPath: "materialIssues[0].issueDate"
        })
      },
      PurposeofIssue: {
        ...getSelectField({
          label: { labelName: "Purpose of Issue", labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_PURPOSE" },
          placeholder: {
            labelName: "Select Purpose of Issue",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_PURPOSE_SELECT"
          },
          required: true,
          jsonPath: "materialIssues[0].issuePurpose",
          //sourceJsonPath: "createScreenMdmsData.store-asset.IndentPurpose",
        props: {
          data: [
            {
              code: "Consumption",
              name: "Capital/Repair/Consumption"
            },
           
          ],
          optionValue: "code",
          optionLabel: "name",
        },
        })
      },
      supplier: {
        ...getSelectField({
          label: {
            labelName: "Supplier Name",
            labelKey: "STORE_COMMON_TABLE_COL_SUPPLIER_MASTER_NAME"
          },
          placeholder: {
            labelName: "Select  Supplier Name",
            labelKey: "STORE_COMMON_TABLE_COL_SUPPLIER_MASTER_NAME"
          },
          required: true,
         
          jsonPath: "materialIssues[0].supplier.code",
          sourceJsonPath: "supplier.suppliers",
            props: {
              optionValue: "code",
              optionLabel: "name",
            },
        }),
        beforeFieldChange: (action, state, dispatch) => {
          let supplier = get(
            state.screenConfiguration.preparedFinalObject,
            `supplier.suppliers`,
            []
          ); 
          supplier =  supplier.filter(x=> x.code === action.value)   
          dispatch(prepareFinalObject("materialIssues[0].supplier.name",supplier[0].name));
          dispatch(prepareFinalObject("materialIssues[0].supplier.tenantId",getTenantId()));
          dispatch(prepareFinalObject("materialIssues[0].supplier.type",supplier[0].type));
          dispatch(prepareFinalObject("materialIssues[0].supplier.ifsc",supplier[0].ifsc));
          dispatch(prepareFinalObject("materialIssues[0].supplier.contactNo",supplier[0].contactNo));
          dispatch(prepareFinalObject("materialIssues[0].supplier.bankCode",supplier[0].bankCode));
          dispatch(prepareFinalObject("materialIssues[0].supplier.address",supplier[0].address));
          dispatch(prepareFinalObject("materialIssues[0].supplier.acctNo",supplier[0].acctNo));
         
        }
      },
      Remark: {
        ...getTextField({
          label: {
            labelName: "Remark",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK"
          },
          placeholder: {
            labelName: "Enter Remark",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK_PLACEHOLDER"
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 2,
          },
          required: false,
          pattern: getPattern("eventDescription") || null,
          jsonPath: "materialIssues[0].description"
        })
      },
      IssueBy: {
        ...getTextField({
          label: {
            labelName: "Issue By",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_BY"
          },
          placeholder: {
            labelName: "Issue By",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_BY"
          },
          props: {
            disabled: true,       
          },
          required: false,
          visible:false,
          pattern: getPattern("Name") || null,
          jsonPath: "materialIssues[0].issuedToEmployee"
        })
      },
      designation: {
        ...getTextField({
          label: { labelName: "Designation", labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION" },
          placeholder: {
            labelName: "Designation",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION"
          },
          required: false,
          visible:false,
          jsonPath: "materialIssues[0].designation",           
           props: {
            disabled: true,       
          },
        })
      },
      Status: {
        ...getTextField({
          label: {
            labelName: "Status",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_STATUS"
          },
          placeholder: {
            labelName: "Status",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_STATUS"
          },
          props: {
            disabled: true,       
          },
          required: false,
          pattern: getPattern("Name") || null,
          jsonPath: "materialIssues[0].materialIssueStatus"
        })
      },
    })
  });