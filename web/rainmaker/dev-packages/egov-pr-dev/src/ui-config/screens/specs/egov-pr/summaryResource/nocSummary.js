import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep } from "../../utils/index";
const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-noc",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};
export const nocSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Event Details",
          labelKey: "NOC_EVENT_DETAILS_HEADER"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel({
            labelName: "Edit",
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStep(state, dispatch, 0);
          }
        },

        
      }
    }
  },
  eventDetails: getHeader("Event Details"),
  break: getBreak(),
  cardOne: EventDetails,
  eventDateTime: getHeader("Event Date & Time"),
  cardTwo: EventDataAndTime,
  eventSocialMediaLinks: getHeader("Event Social Media Link"),
  // cardThree: EventSocialMediaLinks,
  // eventDescription: getHeader("Event Description"),
  // cardFour: EventDescription
});


const EventDetails =getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  eventType: getLabelWithValue(
    {
      labelName: "Enter Event Type",
      labelKey: "NOC_EVENT_TYPE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].PublicRelationDetails.PublicRelationType"
      // callBack: value => {
      //   return value.split(".")[0];
      // }
    }
  ),
  eventLocation: getLabelWithValue(
    {
      labelName: "Event Location",
      labelKey: "PR_EVENT_LOCATION_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  sector: getLabelWithValue(
    {
      labelName: "Sector",
      labelKey: "PR_SECTOR_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  organizationDetails: getLabelWithValue(
    {
      labelName: "Organization Details",
      labelKey: "ORGANIZATION_DETAILS_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  TypeOfEvent: getLabelWithValue(
    {
      labelName: "Type Of Event",
      labelKey: "TYPE_OF_EVENT_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  EventBudjet: getLabelWithValue(
    {
      labelName: "Event Budjet",
      labelKey: "EVENT_BUDJET_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  committiee: getLabelWithValue(
    {
      labelName: "Committiee",
      labelKey: "COMMITIEE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  eventDescription: getLabelWithValue(
{
  labelName: "eventDescription",
  labelKey: "PR_EVENT_DESCRIPTION_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
  // callBack: value => {
  //   return value.split(".")[1];
  // }
}
)

})
})
  
const EventDataAndTime = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  
 startDate: getLabelWithValue(
    {
      labelName: "startDate",
      labelKey: "START_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  endDate: getLabelWithValue(
    {
      labelName: "End Date",
      labelKey: "END_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  )
, startTime: getLabelWithValue(
{
  labelName: "startTime",
  labelKey: "PR_START_TIME_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
  // callBack: value => {
  //   return value.split(".")[1];
  // }
}
)
, endTime: getLabelWithValue(
{
  labelName: "endTime",
  labelKey: "END_TIME_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
  // callBack: value => {
  //   return value.split(".")[1];
  // }
}
)

})
})

const EventSocialMediaLinks = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  
        eventFacebookUrl: getLabelWithValue(
          {
            labelName: "Event Facebook Url",
            labelKey: "EVENT_FACEBOOK_URL_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
          ), eventTwitterUrl: getLabelWithValue(
          {
            labelName: "Event Twitter Url",
            labelKey: "EVENT_TWITTER_URL_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
          ), eventInstagram: getLabelWithValue(
          {
            labelName: "Event Instagram",
            labelKey: "EVENT_INSTAGRAM_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
          )

})
})
  

const EventDescription = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  
        eventDescription: getLabelWithValue(
          {
            labelName: "eventDescription",
            labelKey: "PR_EVENT_DESCRIPTION_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
          )
})
})
  






