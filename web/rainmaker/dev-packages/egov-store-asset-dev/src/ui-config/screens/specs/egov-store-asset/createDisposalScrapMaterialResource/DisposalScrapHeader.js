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

export const DisposalScrapHeader = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Disposal",
      labelKey: "STORE_DISPOSAL_SCRAP_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  DisposalScrapHeaderContainer: getCommonContainer({
    storeName: {
      ...getSelectField({
        label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
        placeholder: {
          labelName: "Select Store Name",
          labelKey: "STORE_DETAILS_STORE_NAME_SELECT"
        },
       
        required: true,
        jsonPath: "purchaseOrders[0].purchaseType",
       // sourceJsonPath: "searchMaster.storeNames",
        props: {
          className: "hr-generic-selectfield",
          optionValue: "value",
          optionLabel: "label",
        }
      }),
    },
    disposalDate: {
      ...getDateField({
        label: {
          labelName: "Disposal Date",
          labelKey: "STORE_DISPOSAL_SCRAP_DATE",
        },
        placeholder: {
          labelName: "Disposal Date",
          labelKey: "STORE_DISPOSAL_SCRAP_DATE",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "purchaseOrders[0].purchaseOrderDate",
        props: {
          inputProps: {
            min: new Date().toISOString().slice(0, 10),
          }
        }
      }),
    },  
    companyName: {
      ...getTextField({
        label: {
          labelName: "Handover to Person/Company Name",
          labelKey: "STORE_DISPOSAL_SCRAP_PERSON_COMPANY"
        },
        placeholder: {
          labelName: "Enter Handover to Person/Company Name",
          labelKey: "STORE_DISPOSAL_SCRAP_PERSON_COMPANY_PLCEHLDER"
        },
        required:true,
        pattern: getPattern("alpha-numeric"),
        jsonPath: "purchaseOrders[0].MTIDetails[0].indentQuantity"
      })
    },
    auctionOrder: {
      ...getTextField({
        label: {
          labelName: "Auction Order No.",
          labelKey: "STORE_DISPOSAL_SCRAP_ACTION_ORDER"
        },
        placeholder: {
          labelName: "Enter Auction Order No.",
          labelKey: "STORE_DISPOSAL_SCRAP_ACTION_ORDER_PLCEHLDER"
        },
        required:true,
        pattern: getPattern("alpha-numeric"),
        jsonPath: "purchaseOrders[0].MTIDetails[0].indentQuantity"
      })
    },
   
    disposalRemark: getTextField({
      label: {
        labelName: "Disposal Remarks",
        labelKey: "STORE_DISPOSAL_SCRAP_DISPOSAL_RMK",
      },
      props: {
        className: "applicant-details-error",
        multiline: "multiline",
        rowsMax: 2,
      },
      placeholder: {
        labelName: "Enter Disposal Remarks",
        labelKey: "STORE_DISPOSAL_SCRAP_DISPOSAL_RMK_PLCEHLDER",
      },
      required:true,
      pattern: getPattern("alpha-numeric-with-space-and-newline"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "purchaseOrders[0].remarks",
    }),
    disposalBy: {
      ...getTextField({
        label: {
          labelName: "Disposal by",
          labelKey: "STORE_DISPOSAL_SCRAP_DISPOSALBY"
        },
        placeholder: {
          labelName: "Enter Disposal by",
          labelKey: "STORE_DISPOSAL_SCRAP_DISPOSALBY_PLCEHLDER"
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

