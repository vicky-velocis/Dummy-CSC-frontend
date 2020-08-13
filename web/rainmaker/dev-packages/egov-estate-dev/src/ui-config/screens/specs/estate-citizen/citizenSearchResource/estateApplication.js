import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
  getDateField,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  searchApiCall
} from "./searchFunctions";
import get from "lodash/get";

const searchBy = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 12,
  },
  props: {
    label: {
      name: "Search By",
      key: "EST_SEARCH_BY_LABEL"
    },
    buttons: [{
        labelName: "File No.",
        labelKey: "EST_FILE_NUMBER_LABEL",
        value: "File Number"
      },
      {
        label: "House No.",
        labelKey: "EST_HOUSE_NUMBER_LABEL",
        value: "House Number"
      }
    ],
    value: "File Number",
    jsonPath: "citizenSearchScreen.searchBy",
    required: true
  },
  required: true,
  jsonPath: "citizenSearchScreen.searchBy",
  beforeFieldChange: (action, state, dispatch) => {
    if (action.value) {
      console.log(action.value);
      if (action.value == "File Number") {
        dispatch(
          handleField(
            "property-search",
            "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.fileNumberContainer",
            "visible",
            true
          )
        )
        dispatch(
          handleField(
            "property-search",
            "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.siteNumberContainer",
            "visible",
            false
          )
        )
      }
      else {
        dispatch(
          handleField(
            "property-search",
            "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.fileNumberContainer",
            "visible",
            false
          )
        )
        dispatch(
          handleField(
            "property-search",
            "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.siteNumberContainer",
            "visible",
            true
          )
        )
      }
    }
  }
};
export const estateApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Estate",
    labelKey: "EST_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for a property",
    labelKey: "EST_HOME_SEARCH_RESULTS_DESC"
  }),
  searchBoxContainer: getCommonContainer({
    searchBy: searchBy,
    fileNumberContainer: getCommonContainer({
      fileNumber: getTextField({
        label: {
          labelName: "File No.",
          labelKey: "EST_FILE_NUMBER_LABEL"
        },
        placeholder: {
          labelName: "Enter File No.",
          labelKey: "EST_FILE_NUMBER_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "ERR_INVALID_FILE_NO",
        jsonPath: "searchScreen.fileNumber"
      })
    }),
    siteNumberContainer: getCommonContainer({
      style: {
        display: "none"
      },
      category: getSelectField({
        label: {
            labelName: "Category",
            labelKey: "EST_CATEGORY_LABEL"
        },
        placeholder: {
            labelName: "Select Category",
            labelKey: "EST_CATEGORY_PLACEHOLDER"
        },
        required: true,
        jsonPath: "searchScreen.category",
        sourceJsonPath: "searchScreenMdmsData.EstatePropertyService.categories",
        gridDefination: {
            xs: 12,
            sm: 6
        },
        beforeFieldChange: (action, state, dispatch) => {
            if (action.value == "CAT.RESIDENTIAL"  || action.value == "CAT.COMMERCIAL") {
              dispatch(
                  handleField(
                      "property-search",
                      "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.siteNumberContainer.children.subCategory",
                      "visible",
                      true
                  )
              );
  
              const categories = get(
                  state.screenConfiguration.preparedFinalObject,
                  "searchScreenMdmsData.EstatePropertyService.categories"
              )
  
              const filteredCategory = categories.filter(item => item.code === action.value)
              dispatch(
                  handleField(
                      "property-search",
                      "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.siteNumberContainer.children.subCategory",
                      "props.data",
                      filteredCategory[0].SubCategory
                  )
              )
          }
        }
      }),
      subCategory: getSelectField({
        label: {
          labelName: "Sub Category",
          labelKey: "EST_SUBCATEGORY_LABEL"
        },
        placeholder: {
            labelName: "Select Sub Category",
            labelKey: "EST_SUBCATEGORY_PLACEHOLDER"
        },
        required: true,
        jsonPath: "searchScreen.subCategory",
        visible: false,
        gridDefination: {
            xs: 12,
            sm: 6
        }
      }),
      siteNumber: getTextField({
        label: {
          labelName: "Site Number",
          labelKey: "EST_SITE_NUMBER_LABEL"
        },
        placeholder: {
            labelName: "Enter Site Number",
            labelKey: "EST_SITE_NUMBER_PLACEHOLDER"
        },
        gridDefination: {
            xs: 12,
            sm: 6
        },
        required: true,
        minLength: 1,
        maxLength: 50,
        jsonPath: "searchScreen.siteNumber"
      }),
      sectorNumber: getSelectField({
        label: {
            labelName: "Sector Number",
            labelKey: "EST_SECTOR_NUMBER_LABEL"
        },
        placeholder: {
            labelName: "Select Sector Number",
            labelKey: "EST_SECTOR_NUMBER_PLACEHOLDER"
        },
        // required: true,
        jsonPath: "searchScreen.sectorNumber",
        sourceJsonPath: "searchScreenMdmsData.EstatePropertyService.SectorNumber",
        gridDefination: {
            xs: 12,
            sm: 6
        }
      }),
    })
  }),
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 6,
          sm: 6
        },
        props: {
          variant: "outlined",
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
            width: "70%",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "EST_HOME_SEARCH_RESULTS_BUTTON_RESET"
          })
        },
        onClickDefination: {
          action: "condition",
          // callBack: resetFields
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 6,
          sm: 6
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "70%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "EST_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      }
    })
  })
});