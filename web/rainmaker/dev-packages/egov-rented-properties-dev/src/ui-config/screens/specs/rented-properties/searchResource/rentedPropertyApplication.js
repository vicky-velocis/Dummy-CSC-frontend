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
// import { searchApiCall } from "./functions";

export const rentedPropertyApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Searc Rented Property Application",
    labelKey: "RP_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "TL_HOME_SEARCH_RESULTS_DESC"
  }),
  appTradeAndMobNumContainer: getCommonContainer({
    applicationName: getTextField({
      label: {
        labelName: "Application Name",
        labelKey: "RP_HOME_SEARCH_RESULTS_APP_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Application Name.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_NAME_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_APPLICATION_NAME",
      jsonPath: "searchScreen.applicationName"
    }),

    colony: getTextField({
      label: {
        labelName: "Colony",
        labelKey: "RP_HOME_SEARCH_RESULTS_COLONY_LABEL"
      },
      placeholder: {
        labelName: "Enter Colony.",
        labelKey: "TL_HOME_SEARCH_RESULTS_COLONY_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_APPLICATION_COLONY",
      jsonPath: "searchScreen.applicationName"
    }),

    alotmentNumber: getTextField({
      label: {
        labelName: "Alotment Name",
        labelKey: "RP_HOME_SEARCH_RESULTS_APP_ALOTMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Alotment Number.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_ALOTMENT_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_ALOTEMENT_NAME",
      jsonPath: "searchScreen.applicationName"
    })

   
  }),
  applicationTypeAndToFromDateContainer: getCommonContainer({
    transitPlotNumber: getTextField({
      label: {
        labelName: "Transit site No/Plot No",
        labelKey: "RP_HOME_SEARCH_RESULTS_APP_TRANSIT_PLOT_LABEL"
      },
      placeholder: {
        labelName: "Enter Transit site No/Plot No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_APP_TRANSIT_PLOT_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_INVALID_TRANSIT_PLOT_NAME",
      jsonPath: "searchScreen.applicationName"
    }),     
    ownerMobNo: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "TL_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: getPattern("MobileNo"),
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_INVALID_MOBILE_NUMBER"
    })
  }),
  button: getCommonContainer({
    // firstCont: {

    buttonContainer: getCommonContainer({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        props: {
          variant: "contained",
          style: {
            color: "white",

            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "80%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {

        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }
    })
  })
});
