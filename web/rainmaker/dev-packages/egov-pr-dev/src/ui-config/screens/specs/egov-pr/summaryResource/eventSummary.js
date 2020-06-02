import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep, getlinkLabelWithValue } from "../../utils/index";
import {
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import "./index.css";
const test = value => {
  value = value ? value.split(".")[0] : "";
  return value;
};

const tenantId = getQueryArg(window.location.href, "tenantId");

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

const propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: getCommonGrayCard({
      propertyContainer: getCommonContainer({
        propertyType: getLabelWithValue(
          {
            labelName: "Property Type",
            labelKey: "NOC_PROPERTY_TYPE_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].PublicRelationDetails.noOfBuildings"
          }
        ),
        buildingName: getLabelWithValue(
          {
            labelName: "Name Of Building",
            labelKey: "NOC_NAME_OF_BUILDING_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].PublicRelationDetails.buildings[0].name"
          }
        ),
        buildingUsageType: getLabelWithValue(
          {
            labelName: "Building Usage Type",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].PublicRelationDetails.buildings[0].usageType",
            callBack: test,
            localePrefix: {
              moduleName: "PublicRelation",
              masterName: "BuildingType"
            }
          }
        ),
        buildingUsageSubType: getLabelWithValue(
          {
            labelName: "Building Usage Subtype",
            labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].PublicRelationDetails.buildings[0].usageType",
            localePrefix: {
              moduleName: "PublicRelation",
              masterName: "BuildingType"
            }
          }
        )
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "PublicRelations[0].PublicRelationDetails.buildings",
    prefixSourceJsonPath:
      "children.cardContent.children.propertyContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

const propertyLocationDetails = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
    propertyId: getLabelWithValue(
      {
        labelName: "Property ID",
        labelKey: "NOC_PROPERTY_ID_LABEL"
      },
      { jsonPath: "PublicRelations[0].PublicRelationDetails.propertyDetails.propertyId" }
    ),
    city: getLabelWithValue(
      {
        labelName: "City",
        labelKey: "NOC_PROPERTY_CITY_LABEL"
      },
      {
        jsonPath: "PublicRelations[0].PublicRelationDetails.propertyDetails.address.city",
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        }
      }
    ),
    doorHouseNo: getLabelWithValue(
      {
        labelName: "Door/House No.",
        labelKey: "NOC_SUMMARY_PROPERTY__LOCATION_DOOR_HOUSE_NO_LABEL"
      },
      { jsonPath: "PublicRelations[0].PublicRelationDetails.propertyDetails.address.doorNo" }
    ),
    buildingCompanyName: getLabelWithValue(
      {
        labelName: "Building/Company Name",
        labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
      },
      {
        jsonPath:
          "PublicRelations[0].PublicRelationDetails.propertyDetails.address.buildingName"
      }
    ),
    streetName: getLabelWithValue(
      {
        labelName: "Street Name",
        labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
      },
      { jsonPath: "PublicRelations[0].PublicRelationDetails.propertyDetails.address.street" }
    ),
    mohalla: getLabelWithValue(
      {
        labelName: "Mohalla",
        labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
      },
      {
        jsonPath:
          "PublicRelations[0].PublicRelationDetails.propertyDetails.address.locality.code",
        callBack: value => {
          return `${getTransformedLocale(tenantId)}_REVENUE_${value}`;
        }
      }
    ),
    pincode: getLabelWithValue(
      {
        labelName: "Pincode",
        labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
      },
      { jsonPath: "PublicRelations[0].PublicRelationDetails.propertyDetails.address.pincode" }
    ),
    locationOnMap: getLabelWithValue(
      {
        labelName: "Location On Map",
        labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
      },
      {
        jsonPath:
          "PublicRelations[0].PublicRelationDetails.propertyDetails.address.locality.latitude"
      }
    ),
    applicablePRStation: getLabelWithValue(
      {
        labelName: "Applicable PR Station",
        labelKey: "NOC_PROPERTY_DETAILS_PRSTATION_LABEL"
      },
      {
        jsonPath: "PublicRelations[0].PublicRelationDetails.PRstationId",
        localePrefix: {
          moduleName: "PublicRelation",
          masterName: "PRStations"
        }
      }
    )
  })

});

const EventDetails =  getCommonContainer({
  eventType: getLabelWithValue(
    {
      labelName: "Enter Event Title",
      labelKey: "NOC_EVENT_TITLE_LABEL"
    },
    {
   //   jsonPath: "PublicRelations[0].PublicRelationDetails.PublicRelationType"
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

  
const EventDataAndTime = getCommonContainer({
  
 startDate: getLabelWithValue(
    {
      labelName: "startDate",
      labelKey: "START_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber",
      callBack: value => {
        return value.split(" ")[0];
      }
    }
  ),
  endDate: getLabelWithValue(
    {
      labelName: "End Date",
      labelKey: "END_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber",
      callBack: value => {
        return value.split(" ")[0];
      }
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

 

const EventSocialMediaLinks = getCommonContainer({
  
        eventFacebookUrl: getlinkLabelWithValue(
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

  

const EventDescription = getCommonContainer({
  
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

  






export const propertySummary = getCommonGrayCard({
  
  eventDetailsHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Details",
          labelKey: "PR_EVENT_DETAILS_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
  break: getBreak(),
  
  cardOne: EventDetails,
  break: getBreak(),
 
  dateTimeHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Date & Time",
          labelKey: "PR_EVENT_DATE_TIME_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
	   cardTwo: EventDataAndTime,
  break: getBreak(),
   socialMediaHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Social Media Link",
          labelKey: "PR_EVENT_SOCIAL_LINK_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
		cardThree: EventSocialMediaLinks,
   break: getBreak(),
  descriptionHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Description",
          labelKey: "PR_EVENT_DESCRIPTION_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
	 
    cardFour: EventDescription,
	break: getBreak(),break: getBreak(),break: getBreak(),
});
