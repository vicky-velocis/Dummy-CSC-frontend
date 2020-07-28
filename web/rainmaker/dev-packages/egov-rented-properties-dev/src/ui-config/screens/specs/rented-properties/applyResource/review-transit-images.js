import {
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { changeStep } from "./footer";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";

  export const getReviewImages = (isEditable = true, screenKey, sourceJsonPath = "PropertiesTemp[0].reviewDocData") => {
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
              labelName: "Date",
              labelKey: "Date"
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
                width: "50%",
                height: "48px",
              }
            },
            children: {
                buttonLabel: getLabel({
                    labelName: "Generate Violation Notice",
                    labelKey: "RP_VIOLATION_NOTICE_BUTTON_LABEl"
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