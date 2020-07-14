import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonTitle,
  getLabel,
  getPattern,
  getSelectField,
  getTextField,
  getDateField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";

const resetFields = (state, dispatch) => {
  const textFields = ["store", "purpose", "inventory","indentFromDate","indentToDate","raised"];
  for (let i = 0; i < textFields.length; i++) {
    if (
      `state.screenConfiguration.screenConfig.search-purchase-order.searchForm.children.cardContent.children.searchFormContainer.children.${textFields[i]}.props.value`
    ) {
      dispatch(
        handleField(
          "search-purchase-order",
          `components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.${textFields[i]}`,
          "props.value",
          ""
        )
      );
    }
  }
  dispatch(prepareFinalObject("searchScreen", {}));
};

export const searchForm = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Criteria",
    labelKey: "STORE_SEARCH_RESULTS_HEADING",
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "STORE_HOME_SEARCH_RESULTS_DESC",
  }),
  searchFormContainer: getCommonContainer({

    store: getSelectField({
      label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
      placeholder: {
        labelName: "Select Store Name",
        labelKey: "STORE_DETAILS_STORE_NAME_SELECT",
      },
      required: false,
      jsonPath: "searchScreen.store",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData1.purchase-order.stores",
      props: {
        optionValue: "code",
        optionLabel: "name",
      },
    }),  
    purpose: getSelectField({
      label: { labelName: "Indent Purpose", labelKey: "STORE_PURCHASE_ORDER_INDENT_PRPS" },
      placeholder: {
        labelName: "Select Indent Purpose",
        labelKey: "STORE_PURCHASE_ORDER_INDENT_PRPS_HLDER",
      },
      required: false,
      jsonPath: "searchScreen.purpose",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData1.purchase-order.stores",
      props: {
        optionValue: "code",
        optionLabel: "name",
      },
    }),
    inventory: getSelectField({
      label: { labelName: "Store Inventory", labelKey: "STORE_INVENTRY_TYPE" },
      placeholder: {
        labelName: "Select store inventory",
        labelKey: "STORE_INVENTRY_TYPE_SELECT",
      },
      required: false,
      jsonPath: "searchScreen.inventory",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData.store-asset.InventoryType",
      props: {
        optionValue: "code",
        optionLabel: "name",
      },
    }),
    indentFromDate: {
      ...getDateField({
        label: {
          labelName: "Indent Date From",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_DT_FRM",
        },
        placeholder: {
          labelName: "Indent Date From",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_DT_FRM",
        },
        pattern: getPattern("Date"),
        jsonPath: "searchScreen.indentFromDate",
        props: {
        },
        gridDefination: {
          xs: 12,
          sm: 4,
        },
      }),
    },
    indentToDate: {
      ...getDateField({
        label: {
          labelName: "Indent Date To",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_DT_TO",
        },
        placeholder: {
          labelName: "Indent Date To",
          labelKey: "STORE_PURCHASE_ORDER_INDENT_DT_TO",
        },
        pattern: getPattern("Date"),
        jsonPath: "searchScreen.indentToDate",
        props: {
        },
        gridDefination: {
          xs: 12,
          sm: 4,
        },
      }),
    },
  }),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            borderColor: "#FE7A51",
            //   borderRadius: "2px",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "STORE_COMMON_RESET_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields,
        },
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6,
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
          },
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "STORE_COMMON_SEARCH_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall,
        },
      },
    }),
  }),
});
