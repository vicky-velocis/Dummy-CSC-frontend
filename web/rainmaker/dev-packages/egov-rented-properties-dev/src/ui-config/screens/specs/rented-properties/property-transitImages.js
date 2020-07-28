// import {
//     getCommonHeader,
//     getCommonContainer,
//     getCommonCard
// } from "egov-ui-framework/ui-config/screens/specs/utils";
// import { getQueryArg ,setDocuments } from "egov-ui-framework/ui-utils/commons";
// import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import {onTabChange, headerrow, tabs} from './search-preview'
// import { getSearchResults } from "../../../../ui-utils/commons";
// import { getReviewImages } from "./applyResource/review-transit-images";

// let transitNumber = getQueryArg(window.location.href, "transitNumber");
// const reviewDocumentDetails = getReviewImages(false, "property-transitImages")

// export const transitSiteImages = getCommonCard({
//   reviewDocumentDetails
// });

// const epochToDate = et => {
//   if (!et) return null;
//   var date = new Date(Math.round(Number(et)));
//   var formattedDate =
//     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
//   return formattedDate;
// };

// export const searchResults = async (action, state, dispatch, transitNumber) => {
//   let queryObject = [
//     { key: "transitNumber", value: transitNumber }
//   ];
//   let payload = await getSearchResults(queryObject);
//   console.log(payload)
//   if(payload) {
//     let properties = payload.Properties;

//     let applicationDocuments = properties[0].propertyImages[0].applicationDocuments || [];
//     const removedDocs = applicationDocuments.filter(item => !item.active)
//     applicationDocuments = applicationDocuments.filter(item => !!item.active)
//     properties = [{...properties[0], propertyDetails: {...properties[0].propertyImages[0], applicationDocuments}}]
//     let date = properties[0].propertyImages[0].applicationDocuments[0].auditDetails.lastModifiedTime;
//     let updatedDate = epochToDate(date)

//     dispatch(prepareFinalObject("Properties[0]", properties[0]));
//     dispatch(
//       prepareFinalObject(
//         "PropertiesTemp[0].removedDocs",
//         removedDocs
//       )
//     );
//     await setDocuments(
//       payload,
//       "Properties[0].propertyImages[0].applicationDocuments",
//       "PropertiesTemp[0].reviewDocData",
//       dispatch,'RP'
//     );
//   }
// }

// const beforeInitFn = async (action, state, dispatch, transitNumber) => {
//   dispatch(prepareFinalObject("workflow.ProcessInstances", []))
//   if(transitNumber){
//     await searchResults(action, state, dispatch, transitNumber)
//   }
// }


// const propertyTransitImages = {
//     uiFramework: "material-ui",
//     name: "property-transitImages",
//     // beforeInitScreen: (action, state, dispatch) => {
//     // //   transitNumber = getQueryArg(window.location.href, "transitNumber");
//     // //   beforeInitFn(action, state, dispatch, transitNumber);
//     //   return action;
//     // },
//     beforeInitScreen: (action, state, dispatch) => {
//       beforeInitFn(action, state, dispatch, transitNumber);
//       return action;
//     },
//     components: {
//       div: {
//         uiFramework: "custom-atoms",
//         componentPath: "Div",
//         props: {
//           className: "common-div-css search-preview"
//         },
//         children: {
//           headerDiv: {
//             uiFramework: "custom-atoms",
//             componentPath: "Container",
//             children: {
//               header1: {
//                 gridDefination: {
//                   xs: 12,
//                   sm: 8
//                 },
//                ...headerrow
//               },
//               helpSection: {
//                 uiFramework: "custom-atoms",
//                 componentPath: "Container",
//                 props: {
//                   color: "primary",
//                   style: { justifyContent: "flex-end" }
//                 },
//                 gridDefination: {
//                   xs: 12,
//                   sm: 4,
//                   align: "right"
//                 }
//               }
//               }
//             },
//             tabSection: {
//               uiFramework: "custom-containers-local",
//               moduleName: "egov-rented-properties",
//               componentPath: "CustomTabContainer",
//               props: {
//                 tabs,
//                 onTabChange,
//                 activeIndex: 1
//               },
//               type: "array",
//             },
//             transitSiteImages
//         }
//       }
//     }
//   };

//   export default propertyTransitImages;

import {
      getCommonHeader,
      getCommonContainer,
      getCommonCard
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getQueryArg ,setDocuments } from "egov-ui-framework/ui-utils/commons";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import {onTabChange, headerrow, tabs} from './search-preview'
  import { getSearchResults } from "../../../../ui-utils/commons";
  import { getReviewImages } from "./applyResource/review-transit-images";
import { convertDateTimeToEpoch } from "../utils";
  
  let transitNumber = getQueryArg(window.location.href, "transitNumber");
  // const reviewDocumentDetails = getReviewImages(false, "property-transitImages")
  
  // export const transitSiteImages = getCommonCard({
  //   reviewDocumentDetails
  // });
  
  const epochToDate = et => {
    if (!et) return null;
    var date = new Date(Math.round(Number(et)));
    var formattedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return formattedDate;
  };
  
  export const searchResults = async (action, state, dispatch, transitNumber) => {
    let queryObject = [
      { key: "transitNumber", value: transitNumber }
    ];
    let payload = await getSearchResults(queryObject);
    if(payload) {
      let applicationDocuments = payload.Properties[0].propertyImages[0].applicationDocuments;
      let imagesByDate = applicationDocuments.reduce((date, item) => {
      const group = (date[item.auditDetails.lastModifiedTime] || []);
      group.push(item);
      date[item.auditDetails.lastModifiedTime] = group;
      return date;
      }, {});
      let imageArray = []
      let image = {}
      Object.keys(imagesByDate).forEach(function(key) {
        image = {
               "date":key,
               "images" : imagesByDate[key]
             }
             imageArray.push(image)
      });
      
    //   let properties = payload.Properties;
    //   let applicationDocuments = properties[0].propertyImages[0].applicationDocuments || [];
    //   const removedDocs = applicationDocuments.filter(item => !item.active)
    //   applicationDocuments = applicationDocuments.filter(item => !!item.active)
    //   properties = [{...properties[0], propertyDetails: {...properties[0].propertyImages[0], applicationDocuments}}]
    //   let date = properties[0].propertyImages[0].applicationDocuments[0].auditDetails.lastModifiedTime;
    //   let updatedDate = epochToDate(date)
  
    //   dispatch(prepareFinalObject("Properties[0]", properties[0]));
    //   dispatch(
    //     prepareFinalObject(
    //       "PropertiesTemp[0].removedDocs",
    //       removedDocs
    //     )
    //   );
    //   await setDocuments(
    //     payload,
    //     "Properties[0].propertyImages[0].applicationDocuments",
    //     "PropertiesTemp[0].reviewDocData",
    //     dispatch,'RP'
    //   );
    }
    
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
              // transitSiteImages
          }
        }
      }
    };
  
    export default propertyTransitImages;