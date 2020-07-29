import {
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { changeStep } from "./footer";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  export const headerDiv = {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
        style: { marginBottom: "10px" }
    }
}
// let sourceJsonPath = "PropertiesTemp[0].reviewDocData"
//   export const getReviewImages = (isEditable = true, screenKey, sourceJsonPath = "PropertiesTemp[0].reviewDocData") => {
//     return getCommonGrayCard({
//       headerDiv: {
//         uiFramework: "custom-atoms",
//         componentPath: "Container",
//         children: {
//           header: {
//             gridDefination: {
//               xs: 12,
//               sm: 10
//             },
//             ...getCommonSubHeader({
//               labelName: "Date",
//               labelKey: "Date"
//             })
//           },
//           searchButton: {
//             componentPath: "Button",
//             gridDefination: {
//               md: 12,
//               sm: 12,
//               align: "right"
//             },
//             props: {
//               variant: "contained",
//               style: {
//                 color: "white",
//                 backgroundColor: "#fe7a51",
//                 borderColor:"#fe7a51",
//                 borderRadius: "2px",
//                 width: "20%",
//                 height: "48px",
//               }
//             },
//             children: {
//                 buttonLabel: getLabel({
//                     labelName: "Generate Violation Notice",
//                     labelKey: "RP_VIOLATION_NOTICE_BUTTON_LABEl"
//                 })
//             },
//             onClickDefination: {
//               action: "condition",
//               callBack: (state, dispatch) => {
//                 dispatch(setRoute(`/rented-properties/notice-violation?tenantId=${getTenantId()}`));
//               }
//             }
//           },
//           documents: {
//             uiFramework: "custom-containers-local",
//             moduleName: "egov-rented-properties",
//             componentPath: "DownloadFileContainer",
//             props: {
//               sourceJsonPath,
//               className: "review-documents"
//             }
//           }
//         }
//       }
//     });
//   };

// export const getReviewOwner = (isEditable = true) => {
//     return getCommonGrayCard({
//         headerDiv: {
//             ...headerDiv,
//             children: {
//                 header: {
//                     gridDefination: {
//                         xs: 12,
//                         sm: 10
//                     },
//                     ...getCommonSubHeader({
//                         labelName: "Owner Details",
//                         labelKey: "TL_OWNER_DETAILS_HEADER"
//                     })
//                 },
//                 editSection: masterEntryEditSection(isEditable)
//             }
//         },
//         viewFour: {
//             uiFramework: "custom-containers-local",
//             componentPath: "MultipleDocumentsContainer",
//             moduleName: "egov-rented-properties",
//             props: {
//                 contents: [
//                     {label: "RP_OWNER_NAME_LABEL",
//                     jsonPath: "ownerDetails.name"},
//                     {label: "RP_MOBILE_NO_LABEL",
//                     jsonPath: "ownerDetails.phone"},
//                     {label: "TL_FATHER_OR_HUSBANDS_NAME_LABEL",
//                     jsonPath: "ownerDetails.fatherOrHusband"},
//                     {label: "TL_COMMON_RELATIONSHIP_LABEL",
//                     jsonPath: "ownerDetails.relation"},
//                     {label: "RP_OWNER_DETAILS_EMAIL_LABEL",
//                     jsonPath: "ownerDetails.email"},
//                     {label: "RP_AADHAR_LABEL",
//                     jsonPath: "ownerDetails.aadhaarNumber"}
//                 ],
//                 jsonPath: "Properties[0].owners"
//             }
//         }
//     })
// }

export const getReviewDocuments = (isEditable = true, screenKey, sourceJsonPath = "PropertiesTemp[0].reviewDocData") => {
    return getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              labelName: "Documents",
              labelKey: "TL_COMMON_DOCS"
            })
          },
          searchButton: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 12,
              align: "right"
            },
            props: {
              variant: "contained",
              style: {
                color: "white",
                backgroundColor: "#fe7a51",
                borderColor:"#fe7a51",
                borderRadius: "2px",
                width: "20%",
                height: "48px",
              }
            },
            children: {
              buttonLabel: getLabel({
                labelName: "Notice For Violation",
                labelKey: "RP_VIOLATION_NOTICE_BUTTON"
              })
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                dispatch(setRoute(`/rented-properties/notice-violation?tenantId=${getTenantId()}`));
              }
            }
          },
          documents: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-rented-properties",
            componentPath: "DownloadFileContainer",
            props: {
              sourceJsonPath,
              className: "review-documents"
            }
          }
        }
      }
    });
  };



 
