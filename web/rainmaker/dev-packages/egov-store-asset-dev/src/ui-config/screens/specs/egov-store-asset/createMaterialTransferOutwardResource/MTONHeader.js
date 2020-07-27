import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

export const MTONHeader = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Material Transfer Outward",
      labelKey: "STORE_MTON_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  MTONHeaderContainer: getCommonContainer({
    issuingStoreName: {
      ...getSelectField({
        label: { labelName: "Issuing Store Name", labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME" },
        placeholder: {
          labelName: "Select Issuing Store Name",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME_SELECT"
        },
        jsonPath: "purchaseOrders[0].store.code",
        sourceJsonPath: "searchMaster.storeNames",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    issueDate: {
      ...getDateField({
        label: {
          labelName: "Issue Date",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_DATE",
        },
        placeholder: {
          labelName: "Enter Issue Date",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_DATE_PLACEHOLDER",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "purchaseOrders[0].purchaseOrderDate",
        props: {
          inputProps: {
            max: new Date().toISOString().slice(0, 10),
          }
        }
      }),
    },  
    transferIndentNo: {
      ...getSelectField({
        label: { labelName: "Transfer Indent No.", labelKey: "STORE_MTON_INDENT_NUMBER" },
        placeholder: {
          labelName: "Select Transfer Indent No.",
          labelKey: "STORE_MTON_INDENT_NUMBER_SELECT"
        },
        jsonPath: "purchaseOrders[0].purchaseType",
       // sourceJsonPath: "searchMaster.storeNames",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "value",
          optionLabel: "label",
        }
      }),
    },
    indentDate: {
      ...getDateField({
        label: {
          labelName: "Indent Date",
          labelKey: "STORE_MATERIAL_INDENT_INDENT_DATE",
        },
        placeholder: {
          labelName: "Indent Date",
          labelKey: "STORE_MATERIAL_INDENT_INDENT_DATE",
        },
        pattern: getPattern("Date"),
        jsonPath: "purchaseOrders[0].purchaseOrderDate",
        props: {
          inputProps: {
            max: new Date().toISOString().slice(0, 10),
          }
        }
      }),
    },  
    indentingStore: {
      ...getSelectField({
        label: { labelName: "Indenting Store", labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_STORE" },
        placeholder: {
          labelName: "Select Store Name",
          labelKey: "STORE_DETAILS_STORE_NAME_SELECT"
        },
        jsonPath: "purchaseOrders[0].purchaseType",
       // sourceJsonPath: "searchMaster.storeNames",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "value",
          optionLabel: "label",
        }
      }),
    },
    indentDeptName: {
      ...getTextField({
        label: {
          labelName: "Indenting Dept. Name",
          labelKey: "STORE_MTON_INDENT_DEPT_NAME"
        },
        placeholder: {
          labelName: "Enter Indenting Dept. Name",
          labelKey: "STORE_MTON_INDENT_DEPT_NAME_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].createdBy"
      })
    },
    indentPurpose: {
      ...getSelectField({
        label: { labelName: "Indent Purpose", labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE" },
        placeholder: {
          labelName: "Select Indent Purpose",
          labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE_SELECT"
        },
        required: true,
        jsonPath: "purchaseOrders[0].rateType",
        sourceJsonPath: "createScreenMdmsData.store-asset.RateType",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    indentRaisedBy: {
      ...getTextField({
        label: {
          labelName: "Indent Raised By",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_RAISED"
        },
        placeholder: {
          labelName: "Enter Indent Raised By",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_RAISED_HLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].createdBy"
      })
    },
    issuedToEmployee: {
      ...getSelectField({
        label: { labelName: "Issued to Employee", labelKey: "STORE_MTON_ISSUED_TO_EMP" },
        placeholder: {
          labelName: "Select Issued to Employee",
          labelKey: "STORE_MTON_ISSUED_TO_EMP_SELECT"
        },
        jsonPath: "purchaseOrders[0].store.code",
        sourceJsonPath: "searchMaster.storeNames",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    designation: {
      ...getTextField({
        label: {
          labelName: "Designation",
          labelKey: "STORE_PURCHASE_ORDER_DSGNTN"
        },
        placeholder: {
          labelName: "Enter Designation",
          labelKey: "STORE_PURCHASE_ORDER_DSGNTN_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].designation"
      })
    },
    remarks: getTextField({
      label: {
        labelName: "Remarks",
        labelKey: "STORE_PURCHASE_ORDER_REMARK",
      },
      props: {
        className: "applicant-details-error",
        multiline: "multiline",
        rowsMax: 2,
      },
      placeholder: {
        labelName: "Enter Remarks",
        labelKey: "STORE_PURCHASE_ORDER_REMARK_PLCEHLDER",
      },
      pattern: getPattern("alpha-numeric-with-space-and-newline"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "purchaseOrders[0].remarks",
    }),
    issuedBy: {
      ...getTextField({
        label: {
          labelName: "Issued by",
          labelKey: "STORE_PURCHASE_ORDER_ISSUEDBY"
        },
        placeholder: {
          labelName: "Enter Issued By",
          labelKey: "STORE_PURCHASE_ORDER_ISSUEDBY_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].createdBy"
      })
    },
    designationIssuedEmp: {
      ...getTextField({
        label: {
          labelName: "Designation",
          labelKey: "STORE_PURCHASE_ORDER_DSGNTN"
        },
        placeholder: {
          labelName: "Enter Designation",
          labelKey: "STORE_PURCHASE_ORDER_DSGNTN_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].designation"
      })
    },
  })
});

