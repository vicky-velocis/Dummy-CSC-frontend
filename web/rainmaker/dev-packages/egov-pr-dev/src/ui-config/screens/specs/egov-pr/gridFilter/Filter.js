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
import { searchApiCall,searchEventApiCall,searchInviteApiCall ,searchLibraryApiCall,searchPressMasterApiCall,searchPressApiCall,searchTenderApiCall} from "./functions";
// import "./searchfilter.css"
import {
  getTodaysDateInYMD,
  getStartDateValue
  }  from "../../utils";

export const EventFilter = getCommonCard({
  
  eventFilterContainer: getCommonContainer({

    eventId: getTextField({
      label: {
        labelName: "Event Id.",
        labelKey: "PR_EVENT_ID"
      },
      placeholder: {
        labelName: "Enter Event Id",
        labelKey: "PR_EVENT_Id_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
     // pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterEvent.eventId"
    }),
  
    eventTitle: getTextField({
      label: {
        labelName: "Event Title.",
        labelKey: "PR_EVENT_TITLE"
      },
      placeholder: {
        labelName: "Enter Event Title",
        labelKey: "PR_EVENT_TITLE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterEvent.eventTitle",
     
    }),

    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "PR_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "PR_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterEvent.fromDate",
      
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
      afterFieldChange: (action, state, dispatch) => {
        // debugger
        // alert(action.value)
 
 
        
         dispatch(
           handleField(
             "search",
             "components.div.children.EventFilter.children.cardContent.children.eventFilterContainer.children.toDate",
             "props.inputProps.min",
             action.value
           )
         );
        
         },
   

    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "PR_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "PR_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterEvent.toDate",
      pattern: getPattern("Date"),
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
    }),
    scheduleStatus: getSelectField({
      label: {
        labelName: "Schedule Status",
        labelKey: "PR_SCHEDULE_STATUS_LABEL"
      },
      placeholder: {
        labelName: "Select Schedule Status",
        labelKey: "PR_SCHEDULE_STATUS_PLACEHOLDER"
      },
      optionValue:"name",
      optionLabel:"name"
 ,   
     
      jsonPath: "PublicRealation[0].filterEvent.Scedulestatus",
      sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventScheduledStatus",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
    
    }),
    eventStatus: getSelectField({
      label: {
        labelName: "Event status",
        labelKey: "PR_EVENT_STATUS_LABEL"
      },
      placeholder: {
        labelName: "Select Event status",
        labelKey: "PR_EVENT_STATUS_PLACEHOLDER"
      },
      optionValue:"name",
      optionLabel:"name"
 ,   
 
      jsonPath: "PublicRealation[0].filterEvent.Eventstatus",
      sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventStatus",
      required: false,
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
          sm: 12,
          // align: "center",
          // id: "search-btn"
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
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchEventApiCall
        }
      }
    })
  })
});
export const InviteGuestFilter = getCommonCard({
  
  eventFilterContainer: getCommonContainer({


    eventId: getTextField({
      label: {
        labelName: "Event Id.",
        labelKey: "PR_EVENT_ID"
      },
      placeholder: {
        labelName: "Enter Event Id",
        labelKey: "PR_EVENT_Id_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
   //   pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterInviteEvent.eventId"
    }),
  
  
    eventTitle: getTextField({
      label: {
        labelName: "Event Title.",
        labelKey: "PR_EVENT_TITLE"
      },
      placeholder: {
        labelName: "Enter Event Title",
        labelKey: "PR_EVENT_TITLE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterInviteEvent.eventTitle"
    }),
    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "PR_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "PR_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterEvent.fromDate",
    
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
      
  afterFieldChange: (action, state, dispatch) => {
       // debugger
       // alert(action.value)


  
        dispatch(
          handleField(
            "eventList",
            "components.div.children.InviteGuestFilter.children.cardContent.children.eventFilterContainer.children.toDate",
            "props.inputProps.min",
            action.value
          )
        );
       
        },
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "PR_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "PR_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterInviteEvent.toDate",
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
      required: false,
    }),
    scheduleStatus: getSelectField({
      label: {
        labelName: "Schedule Status",
        labelKey: "PR_SCHEDULE_STATUS_LABEL"
      },
      placeholder: {
        labelName: "Select Schedule Status",
        labelKey: "PR_SCHEDULE_STATUS_PLACEHOLDER"
      },

     optionValue:"name",
     optionLabel:"name"
,     
      jsonPath: "PublicRealation[0].filterInviteEvent.Scedulestatus",
      sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventScheduledStatus",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
    
    }),
    eventStatus: getSelectField({
      label: {
        labelName: "Event status",
        labelKey: "PR_EVENT_STATUS_LABEL"
      },
      placeholder: {
        labelName: "Select Event status",
        labelKey: "PR_EVENT_STATUS_PLACEHOLDER"
      },

      optionValue:"name",
      optionLabel:"name"
 ,   
      jsonPath: "PublicRealation[0].filterInviteEvent.Eventstatus",
      sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventStatus",
      required: false,
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
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchInviteApiCall
        }
      }
    })
  })
});

export const LibraryFilter = getCommonCard({
  
  eventFilterContainer: getCommonContainer({

    eventId: getTextField({
      label: {
        labelName: "Event Id.",
        labelKey: "PR_EVENT_ID"
      },
      placeholder: {
        labelName: "Enter Event id",
        labelKey: "PR_EVENT_ID"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterLibraryEvent.eventId"
    }),
  
    eventTitle: getTextField({
      label: {
        labelName: "Event Title.",
        labelKey: "PR_EVENT_TITLE"
      },
      placeholder: {
        labelName: "Enter Event Title",
        labelKey: "PR_EVENT_TITLE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterLibraryEvent.eventTitle"
    }),
    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "PR_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "PR_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterLibraryEvent.fromDate",
     
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
          
  afterFieldChange: (action, state, dispatch) => {
 
     dispatch(
       handleField(
         "library-search",
         "components.div.children.LibraryFilter.children.cardContent.children.eventFilterContainer.children.toDate",
         "props.inputProps.min",
         action.value
       )
     );
    
     },
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "PR_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "PR_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterLibraryEvent.toDate",
      props: {
        inputProps: {
          min: getTodaysDateInYMD()
        }
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
    }),
//     scheduleStatus: getSelectField({
//       label: {
//         labelName: "Schedule Status",
//         labelKey: "PR_SCHEDULE_STATUS_LABEL"
//       },
//       placeholder: {
//         labelName: "Select Schedule Status",
//         labelKey: "PR_SCHEDULE_STATUS_PLACEHOLDER"
//       },

//      optionValue:"name",
//      optionLabel:"name"
// ,     
//       jsonPath: "PublicRealation[0].filterEvent.Scedulestatus",
//       sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventScheduledStatus",
//       required: false,
//       gridDefination: {
//         xs: 12,
//         sm: 4
//       }
    
//     }),
//     eventStatus: getSelectField({
//       label: {
//         labelName: "Event status",
//         labelKey: "PR_EVENT_STATUS_LABEL"
//       },
//       placeholder: {
//         labelName: "Select Event status",
//         labelKey: "PR_EVENT_STATUS_PLACEHOLDER"
//       },

//       optionValue:"name",
//       optionLabel:"name"
//  ,   
//       jsonPath: "PublicRealation[0].filterEvent.Eventstatus",
//       sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].eventStatus",
//       required: false,
//       gridDefination: {
//         xs: 12,
//         sm: 4
//       }
    
//     }),
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
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchLibraryApiCall
        }
      }
    })
  })
});

export const PressNoteFilter = getCommonCard({
  
  pressNoteFilterContainer: getCommonContainer({


  
    fileNumber: getTextField({
      label: {
        labelName: "File Number",
        labelKey: "PR_PRESS_NOTE_FILE_NUMBER"
      },
      placeholder: {
        labelName: "Enter File Number",
        labelKey: "PR_PRESS_NOTE_FILE_NUMBER_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
     // pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterpress.fileNumber"
    }),
    Subject: getTextField({
      label: {
        labelName: "Subject",
        labelKey: "PR_PRESS_NOTE_SUBJECT"
      },
      placeholder: {
        labelName: "Enter Subject",
        labelKey: "PR_PRESS_NOTE_SUBJECT_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      //pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterpress.subject"
    }),
    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "PR_PRESS_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "PR_PRESS_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterpress.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "PR_PRESS_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "PR_PRESS_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filterpress.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
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
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchPressApiCall
        }
      }
    })
  })
});




export const TenderFilter = getCommonCard({
  
  tenderFilterContainer: getCommonContainer({
    tenderId: getTextField({
      label: {
        labelName: "Tender Id",
        labelKey: "PR_TENDER_ID"
      },
      placeholder: {
        labelName: "Enter Tender Id",
        labelKey: "PR_TENDER_ID"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
     // pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filtertender.tenderId"
    }),

  
    fileNumber: getTextField({
      label: {
        labelName: "File Number",
        labelKey: "PR_FILE_NUMBER"
      },
      placeholder: {
        labelName: "Enter File Number",
        labelKey: "PR_FILE_NUMBER_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filtertender.fileNumber"
    }),
    Subject: getTextField({
      label: {
        labelName: "Subject",
        labelKey: "PR_SUBJECT"
      },
      placeholder: {
        labelName: "Enter Subject",
        labelKey: "PR_SUBJECT_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
     // pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filtertender.subject"
    }),
    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "PR_PRESS_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "PR_PRESS_FROM_DATE_LABEL"
      },
      jsonPath: "PublicRealation[0].filtertender.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
    }),

    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "PR_PRESS_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "PR_PRESS_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "PublicRealation[0].filtertender.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
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
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchTenderApiCall
        }
      }
    })
  })
});





export const pressMasterFilter = getCommonCard({
  
  pressMasterFilterContainer: getCommonContainer({


  
    publicationName: getTextField({
      label: {
        labelName: "Publication Name",
        labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
      },
      placeholder: {
        labelName: "Enter Publication Name",
        labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterpressMaster.publicationname"
    }),
    typeOfPress: getSelectField({
      label: {
        labelName: "Event Type Of Press",
        labelKey: "PR_TYPEOFTHEPRESS"
      },
      placeholder: {
        labelName: "Select Type Of Press",
        labelKey: "PR_TYPEOFTHEPRESS"
      },
      optionValue:"name",
      optionLabel:"name"
 ,   
 
      jsonPath: "PublicRealation[0].filterpressMaster.typeofpress",
      sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].pressType",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }
    
    }),
    PersonnelName: getTextField({
      label: {
        labelName: "Personnel Name",
        labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
      },
      placeholder: {
        labelName: "Enter Personnel Namet",
        labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z ]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRealation[0].filterpressMaster.personnelname"
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
            labelName: "Search",
            labelKey: "PR_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
        callBack: searchPressMasterApiCall
        }
      }
    })
  })
});