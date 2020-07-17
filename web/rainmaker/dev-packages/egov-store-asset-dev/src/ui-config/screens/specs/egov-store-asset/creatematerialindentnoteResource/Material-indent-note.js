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
 import { prepareFinalObject  } from "egov-ui-framework/ui-redux/screen-configuration/actions";


 const getMaterialData = async (action, state, dispatch,storecode) => {
  const tenantId = getTenantId();
  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId(),
    },
  ];
  queryObject.push({
    key: "store",
    value: storecode
  });

    
  try {
    let response = await getMaterialMasterSearchResults(queryObject, dispatch);
    dispatch(prepareFinalObject("materials", response.materials));
    console.log(response.materials)
    console.log("response.materials")
  } catch (e) {
    console.log(e);
  }
};
  export const IndentMaterialIssueDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Indent Material Issue",
        labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENT_MATERIAL_ISSUE"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    IndentMaterialIssueContainer: getCommonContainer({
      IssueStoreName: {
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
          dispatch(prepareFinalObject("materialIssues[0].fromStore.id",fromstore[0].id));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.code",fromstore[0].code));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.name",fromstore[0].name));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.description",fromstore[0].description));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.billingAddress",fromstore[0].billingAddress));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.department.id",fromstore[0].department));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.department.name",fromstore[0].department));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.deliveryAddress",fromstore[0].deliveryAddress));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.storeInCharge.code",fromstore[0].storeInCharge.code));
          dispatch(prepareFinalObject("materialIssues[0].fromStore.tenantId",getTenantId()));

         
          getMaterialData(action,state,dispatch)
          
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
          required: false,
          pattern: getPattern("Date") || null,
          jsonPath: "materialIssues[0].issueDate"
        })
      },
      IndentingStore: {
        ...getTextField({
          label: { labelName: "Indenting Store", labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_STORE" },
          placeholder: {
            labelName: "Indenting Store",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_STORE"
          },
          props: {
            disabled: true,       
          },
          required: false,
          jsonPath: "materialIssues[0].toStore.code",
          
        })
      },
      IndentingDetpName: {
        ...getTextField({
          label: {
            labelName: "Indenting Dept. Name",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_DEP_NAME"
          },
          placeholder: {
            labelName: "Enter Indenting Dept. Name",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_DEP_NAME"
          },
          props: {
            disabled: true,       
          },
          required: false,
          pattern: getPattern("Name") || null,
          jsonPath: "materialIssues[0].fromStore.department.name"
        })
      },
      IssueToEmployee: {
        ...getTextField({
          label: {
            labelName: "Issue To Employee",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_TO_EMPLOYEE"
          },
          placeholder: {
            labelName: "Select Issue To Employee",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_TO_EMPLOYEE"
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 4,
          },
          required: false,
          jsonPath: "materialIssues[0].issuedToEmployee",
          sourceJsonPath: "store.stores",
            props: {
              optionValue: "code",
              optionLabel: "name",
            },
        })
      },
      issuedToDesignation: {
        ...getTextField({
          label: { labelName: "Designation", labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION" },
          placeholder: {
            labelName: "Enter Designation",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION_PLACEHOLDER"
          },
          required: false,
          jsonPath: "materialIssues[0].issuedToDesignation",
          
          props: {
            disabled: true,       
          },
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
          jsonPath: "materialIssues[0].IssueBy"
        })
      },
      DesignationIssueBy: {
        ...getTextField({
          label: { labelName: "Designation", labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION" },
          placeholder: {
            labelName: "Designation",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION"
          },
          required: false,
          visible:false,
          jsonPath: "materialIssues[0].DesignationIssueBy",           
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