import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";


export const purchaseOrderHeader = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Purchase Order",
      labelKey: "STORE_PO_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  purchaseOrderHeaderContainer: getCommonContainer({
    storeName: {
      ...getSelectField({
        label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
        placeholder: {
          labelName: "Select Store Name",
          labelKey: "STORE_DETAILS_STORE_NAME_SELECT"
        },
        required: true,
        jsonPath: "purchaseOrders[0].store.code",
        sourceJsonPath: "createScreenMdmsData1.material-type.stores",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    poDate: {
      ...getDateField({
        label: {
          labelName: "PO Date",
          labelKey: "STORE_PURCHASE_ORDER_DATE",
        },
        placeholder: {
          labelName: "PO Date",
          labelKey: "STORE_PURCHASE_ORDER_DATE",
        },
        pattern: getPattern("Date"),
        jsonPath: "purchaseOrders[0].purchaseOrderDate",
        props: {
        },
      }),
    },
    rateType: {
      ...getSelectField({
        label: { labelName: "PO Rate Type", labelKey: "STORE_PURCHASE_ORDER_RATETYPE" },
        placeholder: {
          labelName: "Select PO Rate Type",
          labelKey: "STORE_PURCHASE_ORDER_RATETYPE_SELECT"
        },
        required: true,
        jsonPath: "purchaseOrders[0].rateType",
        sourceJsonPath: "createScreenMdmsData1.material-type.stores",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    supplier: {
      ...getSelectField({
        label: { labelName: "Supplier", labelKey: "STORE_SUPPLIER_MASTER_SUPPLIER_NAME" },
        placeholder: {
          labelName: "Select supplier",
          labelKey: "STORE_SUPPLIER_MASTER_NAME_SELECT"
        },
        required: true,
        jsonPath: "purchaseOrders[0].supplier.code",
        sourceJsonPath: "createScreenMdmsData1.material-type.stores",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "code",
          optionLabel: "name"
        }
      }),
    },
    advancePercentage: {
      ...getTextField({
        label: {
          labelName: "Advance Percentage",
          labelKey: "STORE_PURCHASE_ORDER_ADVNC_PRCNT"
        },
        placeholder: {
          labelName: "Enter Advance Percentage",
          labelKey: "STORE_PURCHASE_ORDER_ADVNC_PRCNT_PLACEHOLDER"
        },
        pattern: getPattern("MobileNo"),
        jsonPath: "purchaseOrders[0].advancePercentage"
      })
    },
    advanceAmount: {
      ...getTextField({
        label: {
          labelName: "Advance Amount",
          labelKey: "STORE_PURCHASE_ORDER_ADVNC_AMT"
        },
        placeholder: {
          labelName: "Enter Advance Amount",
          labelKey: "STORE_PURCHASE_ORDER_ADVNC_AMTT_PLACEHOLDER"
        },
        pattern: getPattern("Amount"),
        jsonPath: "purchaseOrders[0].advanceAmount"
      })
    },
    expectedDeliveryDate: {
      ...getDateField({
        label: {
          labelName: "Expected Delivery Date",
          labelKey: "STORE_PURCHASE_ORDER_EXPCT_DLVRY_DT"
        },
        placeholder: {
          labelName: "Enter Expected Delivery Date",
          labelKey: "STORE_PURCHASE_ORDER_EXPCT_DLVRY_DT"
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "purchaseOrders[0].expectedDeliveryDate",
        props: {
          inputProps: {
        //    max: getTodaysDateInYMD()
          }
        }
      })
    },
    deliveryTerms: getTextField({
      label: {
        labelName: "Delivery Terms",
        labelKey: "STORE_PURCHASE_ORDER_DLVRY_TERM",
      },
      props: {
        className: "applicant-details-error",
        multiline: "multiline",
        rowsMax: 2,
      },
      placeholder: {
        labelName: "Enter Delivery Terms",
        labelKey: "STORE_PURCHASE_ORDER_DLVRY_TERM_PLCEHLDER",
      },
      required: true,
      pattern: getPattern("alpha-numeric-with-space-and-newline"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "purchaseOrders[0].deliveryTerms",
    }),
    paymentTerms: getTextField({
      label: {
        labelName: "Payment Terms",
        labelKey: "STORE_PURCHASE_ORDER_PYMNT_TERM",
      },
      props: {
        className: "applicant-details-error",
        multiline: "multiline",
        rowsMax: 2,
      },
      placeholder: {
        labelName: "Enter Payment Terms",
        labelKey: "STORE_PURCHASE_ORDER_PYMNT_TERM_PLCEHLDER",
      },
      pattern: getPattern("alpha-numeric-with-space-and-newline"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "purchaseOrders[0].paymentTerms",
    }),
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
    status: {
      ...getTextField({
        label: {
          labelName: "PO Status",
          labelKey: "STORE_PURCHASE_ORDER_STATUS"
        },
        placeholder: {
          labelName: "Enter PO Status",
          labelKey: "STORE_PURCHASE_ORDER_STATUS_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].status"
      })
    },
    createdBy: {
      ...getTextField({
        label: {
          labelName: "Created by",
          labelKey: "STORE_PURCHASE_ORDER_CREATEBY"
        },
        placeholder: {
          labelName: "Enter Created By",
          labelKey: "STORE_PURCHASE_ORDER_CREATEBY_PLCEHLDER"
        },
        props: {
          disabled: true
        },
       // pattern: getPattern("Email"),
        jsonPath: "purchaseOrders[0].createdBy"
      })
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
  })
});

