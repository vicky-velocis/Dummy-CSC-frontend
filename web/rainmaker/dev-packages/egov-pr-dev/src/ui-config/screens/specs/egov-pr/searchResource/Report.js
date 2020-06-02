import {
    getCommonCard,
    getCommonContainer,
    getCommonParagraph,
    getCommonTitle,
    getDateField,
    getLabel,
    getPattern,
    getSelectField,
    getTextField
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { TimeSeriesReportSearch,EventReportSearch,LocalityReportSearch } from "./functions";
  import {
    getTodaysDateInYMD,
    getStartDateValue
    }  from "../../utils";
  
  
  export const TimeSeriesReport = getCommonCard({
    // subHeader: getCommonTitle({
    //   labelName: "Search NOC Application",
    //   labelKey: "PR_HOME_SEARCH_RESULTS_HEADING"
    // }),
    // subParagraph: getCommonParagraph({
    //   labelName: "Provide at least one parameter to search for an application",
    //   labelKey: "PR_HOME_SEARCH_RESULTS_DESC"
    // }),
    
    TimeseriesReportContainer: getCommonContainer({
      Year: getSelectField({
        label: {
          labelName: "Year",
          labelKey: "PR_REPORT_YEAR_LABEL"
        },
        placeholder: {
          labelName: "Select Year",
          labelKey: "PR_REPORT_YEAR_PLACEHOLDER"
        },
  
        optionValue:"code",
        optionLabel:"name",
        jsonPath: "TimeseriesReport.Year",
        sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventReportYear",
        required: true,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      
      }),
  
      Month: getSelectField({
        label: {
          labelName: "Month",
          labelKey: "PR_REPORT_MONTH_LABEL"
        },
        placeholder: {
          labelName: "Select Month",
          labelKey: "PR_REPORT_MONTH_PLACEHOLDER"
        },
  
        optionValue:"code",
        optionLabel:"name",
        jsonPath: "TimeseriesReport.Month",
        sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventReportMonth",
        required: false,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      
      }),

      AggrigatedBy: getSelectField({
        label: {
          labelName: "Aggrigated By",
          labelKey: "PR_REPORT_AGGRIGATEDBY_LABEL"
        },
        placeholder: {
          labelName: "Select AggrigatedBy",
          labelKey: "PR_REPORT_AGGRIGATEDBY_LABEL"
        },
        optionValue:"name",
        optionLabel:"name",
       
        jsonPath: "TimeseriesReport.AggrigatedBy",
        sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventReportAggregatedBy",
        required: true,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
    }),
  
    button: getCommonContainer({
      buttonContainer: getCommonContainer({
       
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 6
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
              height: "48px"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Apply",
              labelKey: "PR_APPLY_RESULTS_BUTTON_SEARCH"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: TimeSeriesReportSearch
          }
        }
      })
    })
  });
  


  export const EventWiseReport = getCommonCard({
    
    
    EventReportContainer: getCommonContainer({
      DepartmentName: getSelectField({
        label: {
          labelName: "Department Name",
          labelKey: "PR_REPORT_DEPARTMENTNAME_LABEL"
        },
        placeholder: {
          labelName: "Select Department Name",
          labelKey: "PR_REPORT_DEPARTMENTNAME_PLACEHOLDER"
        },
        optionValue:"code",
        optionLabel:"name",
  
        sourceJsonPath: "applyScreenMdmsData['common-masters'].Department",
        jsonPath: "eventReport.dept",
        required: true,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      
      }),
  
      
     
    }),
  
    button: getCommonContainer({
      buttonContainer: getCommonContainer({
       
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 6
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
              height: "48px"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Apply",
              labelKey: "PR_APPLY_RESULTS_BUTTON_SEARCH"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: EventReportSearch
          }
        }
      })
    })
  });
  





  export const LocalityWiseReport = getCommonCard({
    // subHeader: getCommonTitle({
    //   labelName: "Search NOC Application",
    //   labelKey: "PR_HOME_SEARCH_RESULTS_HEADING"
    // }),
    // subParagraph: getCommonParagraph({
    //   labelName: "Provide at least one parameter to search for an application",
    //   labelKey: "PR_HOME_SEARCH_RESULTS_DESC"
    // }),
    //screenConfiguration.preparedFinalObject.applyScreenMdmsData["RAINMAKER-PR"].localityAreaName
    LocalityReportContainer: getCommonContainer({
      fromDate: getDateField({
        label: { labelName: "From Date", labelKey: "PR_EVENT_CREATE_DATE_LABEL" },
        placeholder: {
          labelName: "From Date",
          labelKey: "PR_EVENT_CREATE_DATE_PLACEHOLDER"
        },
        jsonPath: "LocalityReport.fromDate",
       
        gridDefination: {
          xs: 12,
          sm: 4
        },
        pattern: getPattern("Date"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        required: true,
        afterFieldChange: (action, state, dispatch) => {
              dispatch(
                handleField(
                  "LocalityReports",
                  "components.div.children.LocalityWiseReport.children.cardContent.children.LocalityReportContainer.children.toDate",
                  "props.inputProps.min",
                  action.value
                )
              );
             
              },
      }),
  
      toDate: getDateField({
        label: { labelName: "To Date", labelKey: "PR_EVENT_TO_DATE_LABEL" },
        placeholder: {
          labelName: "To Date",
          labelKey: "PR_EVENT_TO_DATE_PLACEHOLDER"
        },
        jsonPath: "LocalityReport.toDate",
        props: {
          inputProps: {
            min: ''
          }
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        pattern: getPattern("Date"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        required: true
      }),
      LocalityName: getSelectField({
        label: {
          labelName: "Locality Name",
          labelKey: "PR_REPORT_LOCALITYNAME_LABEL"
        },
        placeholder: {
          labelName: "Select Locality Name",
          labelKey: "PR_REPORT_LOCALITYNAME_LABEL"
        },
  optionLabel:"name",
  optionValue:"name",
  
        jsonPath: "LocalityReport.localityname",
     sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].localityAreaName",
        required: true,
        gridDefination: {
          xs: 12,
          sm: 4
        }
      
      }),
    }),
  
    button: getCommonContainer({
      buttonContainer: getCommonContainer({
       
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 6
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
              height: "48px"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Apply",
              labelKey: "PR_APPLY_RESULTS_BUTTON_SEARCH"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: LocalityReportSearch
          }
        }
      })
    })
  });
  