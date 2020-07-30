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
        })
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
          label: { labelName: "Material Type", labelKey: "STORE_COMMON_MATERIAL_TYPE" },
          placeholder: {
            labelName: "Select Material Type",
            labelKey: "STORE_MATERIAL_TYPE_NAME_SELECT"
          },
          props: {
            disabled: true,       
          },
          required: true,
          jsonPath: "materialIssues[0].toStore",
          
        })
      },
      IndentingDetpName: {
        ...getTextField({
          label: {
            labelName: "Indenting Dept. Name",
            labelKey: "STORE_MATERIAL_NAME"
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
          jsonPath: "materialIssues[0].name"
        })
      },
      IssueToEmployee: {
        ...getSelectField({
          label: {
            labelName: "Issue To Employee",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_TO_EMPLOYEE"
          },
          placeholder: {
            labelName: "Select Issue To Employee",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_TO_EMPLOYEE_SELECT"
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 4,
          },
          required: false,
          jsonPath: "materialIssues[0].indent.issuedToEmployee",
          sourceJsonPath: "store.stores",
            props: {
              optionValue: "code",
              optionLabel: "name",
            },
        })
      },
      DesignationEmp: {
        ...getTextField({
          label: { labelName: "Designation", labelKey: "STORE_BASSTORE_MATERIAL_INDENT_NOTE_DESIGNATIONE_UOM_NAME" },
          placeholder: {
            labelName: "Enter Designation",
            labelKey: "STORE_MATERIAL_INDENT_NOTE_DESIGNATION_PLACEHOLDER"
          },
          required: false,
          jsonPath: "materialIssues[0].designation",
          
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
          pattern: getPattern("Name") || null,
          jsonPath: "materialIssues[0].oldCode"
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