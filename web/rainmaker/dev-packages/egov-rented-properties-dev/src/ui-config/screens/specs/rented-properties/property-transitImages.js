import {
    getCommonHeader,
    getCommonContainer,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {onTabChange, headerrow, tabs} from './search-preview'
import { getSearchResults } from "../../../../ui-utils/commons";

let transitNumber = getQueryArg(window.location.href, "transitNumber");

export const searchResults = async (action, state, dispatch, transitNumber) => {
  let queryObject = [
    { key: "transitNumber", value: transitNumber }
  ];
  let payload = await getSearchResults(queryObject);
  console.log(payload)
  // if(payload) {
  //   let properties = payload.Properties;

  //   let applicationDocuments = properties[0].propertyDetails.applicationDocuments || [];
  //   const removedDocs = applicationDocuments.filter(item => !item.active)
  //   applicationDocuments = applicationDocuments.filter(item => !!item.active)
  //   properties = [{...properties[0], propertyDetails: {...properties[0].propertyDetails, applicationDocuments}}]
  //   dispatch(prepareFinalObject("Properties[0]", properties[0]));
  //   dispatch(
  //     prepareFinalObject(
  //       "PropertiesTemp[0].removedDocs",
  //       removedDocs
  //     )
  //   );
  //   await setDocuments(
  //     payload,
  //     "Properties[0].propertyDetails.applicationDocuments",
  //     "PropertiesTemp[0].reviewDocData",
  //     dispatch,'RP'
  //   );
  // }
}

const beforeInitFn = async (action, state, dispatch, transitNumber) => {
  dispatch(prepareFinalObject("workflow.ProcessInstances", []))
  if(transitNumber){
    await searchResults(action, state, dispatch, transitNumber)
  }
}


const propertyTransitImages = {
    uiFramework: "material-ui",
    name: "property-transitImages",
    // beforeInitScreen: (action, state, dispatch) => {
    // //   transitNumber = getQueryArg(window.location.href, "transitNumber");
    // //   beforeInitFn(action, state, dispatch, transitNumber);
    //   return action;
    // },
    beforeInitScreen: (action, state, dispatch) => {
      beforeInitFn(action, state, dispatch, transitNumber);
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css search-preview"
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header1: {
                gridDefination: {
                  xs: 12,
                  sm: 8
                },
               ...headerrow
              },
              helpSection: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                props: {
                  color: "primary",
                  style: { justifyContent: "flex-end" }
                },
                gridDefination: {
                  xs: 12,
                  sm: 4,
                  align: "right"
                }
              }
              }
            },
            tabSection: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-rented-properties",
              componentPath: "CustomTabContainer",
              props: {
                tabs,
                onTabChange,
                activeIndex: 1
              },
              type: "array",
            },
            // write code for transit images
        }
      }
    }
  };

  export default propertyTransitImages;