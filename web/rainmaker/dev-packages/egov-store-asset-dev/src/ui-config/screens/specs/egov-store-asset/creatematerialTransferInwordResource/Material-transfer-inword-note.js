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
import{getMaterialMasterSearchResults} from '../../../../../ui-utils/storecommonsapi'
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
  let storecode = get(state,"screenConfiguration.preparedFinalObject.materialReceipt[0].fromStore.code",'')
  queryObject.push({
    key: "store",
    value: storecode
  });

    
  try {
    let response = await getMaterialMasterSearchResults(queryObject, dispatch);
    dispatch(prepareFinalObject("materials", response.materials));
   //set materialReceipt[0].issuedToEmployee
   const queryParams = [{ key: "roles", value: "EMPLOYEE" },{ key: "tenantId", value:  getTenantId() }];
   const payload = await httpRequest(
     "post",
     "/egov-hrms/employees/_search",
     "_search",
     queryParams,
   );
  
   let stores = get(state,"screenConfiguration.preparedFinalObject.store.stores",[])
   stores = stores.filter(x=>x.code === storecode)
   //alert(stores[0].storeInCharge.code)
   if(payload){
     if (payload.Employees) {
       const {screenConfiguration} = state;
        // const {stores} = screenConfiguration.preparedFinalObject;
       const empDetails =
       payload.Employees.filter((item, index) =>  stores[0].storeInCharge.code === item.code);
     
       if(empDetails && empDetails[0] ){
         //alert(empDetails[0].user.name)        
         dispatch(prepareFinalObject("materialReceipt[0].issuedToEmployee",empDetails[0].user.name));  
       }
       else{
        dispatch(prepareFinalObject("materialReceipt[0].issuedToEmployee",""));  
       }
     }
   }
  } catch (e) {
    console.log(e);
  }
};
  export const MaterialTransferInwordNote = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Material Transfer Inward ",
        labelKey: "STORE_MATERIAL_TRANSFER_INWARD"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    MaterialReceiptNoteContainer: getCommonContainer({
      receiptType: {
        ...getTextField({
          label: { labelName: "Receipt Type", labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_TYPE" },
          placeholder: {
            labelName: "Receipt Type",
            labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_TYPE"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialReceipt[0].receiptType",
          //sourceJsonPath: "store.stores",
            // props: {
            //   data:[
            //     {
            //       code: "SCRAP",
            //       name: "Scrap"
            //     }
            //   ],
            //   optionValue: "code",
            //   optionLabel: "name",
            // },
          
        })
      },
      receiptDate : {
        ...getDateField({
          label: {
            labelName: "Receipt Date",
            labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_DATE "
          },
          placeholder: {
            labelName: "Enter Receipt Date",
            labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_DATE_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "materialReceipt[0].receiptDate"
        })
      },
      TransferOutwordNo: {
        ...getSelectField({
          label: {
            labelName: "Transfer Outword No.",
            labelKey: "STORE_MATERIAL_OUTWORD_NO"
          },
          placeholder: {
            labelName: "Select  Transfer Outword No.",
            labelKey: "STORE_MATERIAL_OUTWORD_NO_SELECT"
          },
          required: false,
         
          jsonPath: "materialReceipt[0].TransferOutwordNo.code",
          sourceJsonPath: "store.stores",
            props: {
              optionValue: "code",
              optionLabel: "name",
            },
        }),
        beforeFieldChange: (action, state, dispatch) => {
          // let store = get(
          //   state.screenConfiguration.preparedFinalObject,
          //   `store.stores`,
          //   []
          // ); 
          // store =  store.filter(x=> x.code === action.value)   
          // dispatch(prepareFinalObject("materialReceipt[0].receivingStore.name",store[0].name));
          
        }
      },
      outwordDate: {
        ...getTextField({
          label: { labelName: "Outword Date", labelKey: "STORE_MATERIAL_OUTWORD_DATE" },
          placeholder: {
            labelName: "Outword Date",
            labelKey: "STORE_MATERIAL_OUTWORD_DATE"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialReceipt[0].outwordDate",
         
          
        })
      },
      intendingstore: {
        ...getTextField({
          label: { labelName: "Indenting Store", labelKey: "STORE_MATERIAL_TRANSFER_INDENTING_STORE" },
          placeholder: {
            labelName: "Indenting Store",
            labelKey: "STORE_MATERIAL_TRANSFER_INDENTING_STORE"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialReceipt[0].intendingstore",
         
          
        })
      },
      issuingtore: {
        ...getTextField({
          label: { labelName: "Issuing Store Name", labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME" },
          placeholder: {
            labelName: "Issuing Store Name",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialReceipt[0].issuingtore",
         
          
        })
      },
      purposeofIndent: {
        ...getTextField({
          label: { labelName: "Purpose of Indent", labelKey: "STORE_MATERIAL_TRANSFER_PURPOSE_OF_INDENT" },
          placeholder: {
            labelName: "Purpose of Indente",
            labelKey: "STORE_MATERIAL_TRANSFER_PURPOSE_OF_INDENT"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialReceipt[0].receiptType",
         
          
        })
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
          jsonPath: "materialReceipt[0].description"
        })
      }, 
      receiveBy: {
        ...getTextField({
          label: { labelName: "Receive By", labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_TYPE" },
          placeholder: {
            labelName: "Receive By",
            labelKey: "STORE_MATERIAL_RECEIPT_RECEIPT_TYPE"
          },
          props: {
            disabled: true,       
          },
          required: false,
          visible:false,
          jsonPath: "materialReceipt[0].receiptType",
         
          
        })
      },
      degignation: {
        ...getTextField({
          label: { labelName: "degignation", labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION" },
          placeholder: {
            labelName: "degignation",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION"
          },
          props: {
            disabled: true,       
          },
          required: false,
          visible:false,
          jsonPath: "materialReceipt[0].degignation",
         
          
        })
      },
      status: {
        ...getTextField({
          label: { labelName: "status", labelKey: "STORE_MATERIAL_INDENT_NOTE_STATUS" },
          placeholder: {
            labelName: "status",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_STATUS"
          },
          props: {
            disabled: true,       
          },
          required: false,
          visible:false,
          jsonPath: "materialReceipt[0].status",
         
          
        })
      },


      
    })
  });