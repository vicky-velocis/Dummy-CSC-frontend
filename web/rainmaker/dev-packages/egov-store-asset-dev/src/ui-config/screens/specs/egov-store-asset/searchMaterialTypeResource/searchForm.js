import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonTitle,
  getLabel,
  getPattern,
  getSelectField,
  getTextField,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";

const resetFields = (state, dispatch) => {
  const textFields = ["materialTypeName","parentMaterialType","storeName", "storeMappingInfo", "active"];
  for (let i = 0; i < textFields.length; i++) {
    if (
      `state.screenConfiguration.screenConfig.search-material-type.searchForm.children.cardContent.children.searchFormContainer.children.${textFields[i]}.props.value`
    ) {
      dispatch(
        handleField(
          "search-material-type",
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
    materialTypeName: getSelectField({
      label: { labelName: "Material Type Name", labelKey: "MATERIAL_TYPE_NAME" },
      placeholder: {
        labelName: "Select Materila Type Name",
        labelKey: "MATERIAL_TYPE_NAME_SELECT",
      },
      required: false,
      jsonPath: "searchScreen.designations",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData.common-masters.Designation",
      props: {
        optionValue: "code",
        optionLabel: "name",
      },
      localePrefix: {
        moduleName: "common-masters",
        masterName: "Designation",
      },
    }),
    parentMaterialType: getSelectField({
      label: {
        labelName: "Parent Material Type",
        labelKey: "MATERIAL_TYPE_PARENT_TYPE_NAME",
      },
      placeholder: {
        labelName: "Select Parent Material Type",
        labelKey: "MATERIAL_TYPE_PARENT_TYPE_NAME_SELECT",
      },
      required: false,
      jsonPath: "searchScreen.departments",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData.common-masters.Department",
      props: {
        optionLabel: "name",
        optionValue: "code",
        // hasLocalization: false
      },
      localePrefix: {
        moduleName: "common-masters",
        masterName: "Department",
      },
    }),
    storeName: getSelectField({
      label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
      placeholder: {
        labelName: "Select Store Name",
        labelKey: "STORE_DETAILS_STORE_NAME_SELECT",
      },
      required: false,
      jsonPath: "searchScreen.designations",
      gridDefination: {
        xs: 12,
        sm: 4,
      },
      sourceJsonPath: "searchScreenMdmsData.common-masters.Designation",
      props: {
        optionValue: "code",
        optionLabel: "name",
      },
      localePrefix: {
        moduleName: "common-masters",
        masterName: "Designation",
      },
    }),
    storeMappingInfo: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-store-asset",
      componentPath: "CheckboxContainer",
      jsonPath: "searchScreen.active",
      gridDefination: {
        xs: 6,
      },
      isFieldValid: true,
      required: false,

      props: {
        content: "MATERIAL_TYPE_STORE_MAP",
        jsonPath: "searchScreen.active",
        screenName: "search-material-type",
        checkBoxPath:
          "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.storeMappingInfo",
      },
    },
    active: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-store-asset",
      componentPath: "CheckboxContainer",
      jsonPath: "searchScreen.active",
      gridDefination: {
        xs: 6,
      },
      isFieldValid: true,
      required: false,

      props: {
        content: "MATERIAL_TYPE_ACTIVE",
        jsonPath: "searchScreen.active",
        screenName: "search-material-type",
        checkBoxPath:
          "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.active",
      },
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
