import { getCommonCard, getCommonContainer, getDateField, getLabel, getPattern, getSelectField, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchApiCallForEmployeeFilter } from "./functions";
import { resetFieldsForEmployeeFilter } from "./citizenSearchFunctions";




export const ServiceRequestFilterFormForEmployee = getCommonCard({


  serviceRequestidContactNoAndRequestTypeContainer: getCommonContainer({

    ServiceRequestId: {
      ...getTextField({
        label: {
          labelName: "Service Request No.",
          labelKey: "HC_SERVICE_REQUEST_ID"
        },
        placeholder: {
          labelName: "Service Request No.",
          labelKey: "HC_SERVICE_REQUEST_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6,
          md: 4
        },
        
        pattern: getPattern("BuildingStreet"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "serviceRequests.servicerequestid"
      })
    },
    contactno: {
      ...getTextField({
        label: {
          labelName: "Owner Contact Number",
          labelKey: "HC_OWNER_CONTACT_NUMBER_LABEL"
        },
        placeholder: {
          labelName: "Contact Number",
          labelKey: "HC_OWNER_CONTACT_NUMBER_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6,
          md: 4
        },
        
        pattern: getPattern("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "serviceRequests.contactNumber"
      })
    },
    ServiceRequestType: getSelectField({
      label: { labelName: "Service Request Type", labelKey: "HC_SERVICE_REQUEST_TYPE" },
      optionLabel: "name",
      optionValue: "name",
      placeholder: {
        labelName: "TYPE_OF_SERVICE_REQUEST",
        labelKey: "HC_SERVICE_REQUEST_TYPE_PLACEHOLDER"
      },
      
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },

      jsonPath: "serviceRequests.servicetype",
      sourceJsonPath: "applyScreenMdmsData.eg-horticulture.ServiceType",
      required: false
    }),
  }),
  StatusLocalityAndFromToDateContainer: getCommonContainer({

    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "HC_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "FromDate",
        labelKey: "HC_FROM_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },
      pattern: getPattern("Date"),
      

      jsonPath: "serviceRequests.fromDate",
      


    }),
    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "HC_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "HC_TO_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },
      pattern: getPattern("Date"),
      

      jsonPath: "serviceRequests.toDate",
      



    }),
    ServiceRequestStatus: getSelectField({
      label: { labelName: "Service Request Status", labelKey: "HC_SERVICE_REQUEST_STATUS" },
      optionLabel: "name",
      optionValue: "name",
      placeholder: {
        labelName: "Service Request Status",
        labelKey: "HC_SERVICE_REQUEST_STATUS"
      },
      
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },
      jsonPath: "serviceRequests.servicestatus",
      sourceJsonPath: "applyScreenMdmsData.eg-horticulture.ServiceStatus",
      
    }),
    locality: {
      ...getSelectField({
        label: {
          labelName: "Locality/Mohalla",
          labelKey: "HC_LOCALITY_MOHALLA_LABEL"
        },
        optionLabel: "name",
        optionValue: "name",
        placeholder: {
          labelName: "Locality/Mohalla",
          labelKey: "HC_CHOOSE_LOCALITY_MOHALLA_LABEL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6,
          md: 4
        },
        sourceJsonPath: "applyScreenMdmsData.RAINMAKER-PGR.Sector",
        jsonPath: "serviceRequests.mohalla",
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        
        props: {
          className: "applicant-details-error",
          
          
        },

      }),



    },
  }),
  button: getCommonContainer({
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
            minWidth: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "HC_HOME_SEARCH_RESULTS_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            searchApiCallForEmployeeFilter(state, dispatch)
          }
        }
      },
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            // backgroundColor: "#FE7A51",
            border: "#FE7A51 solid 1px",
            borderRadius: "2px",
            // width: window.innerWidth > 480 ? "80%" : "100%",
            minWidth: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "CLEAR ALL",
            labelKey: "HC_CLEARFORM_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFieldsForEmployeeFilter
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














