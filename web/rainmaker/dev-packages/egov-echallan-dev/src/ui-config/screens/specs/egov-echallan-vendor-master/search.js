import { getCommonHeader, getCommonContainer, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { adhocPopup } from "./popup/addpopup"
import "./index.css"
import { searchVendorResultApiResponse, searchVendorResultErrorResponse } from "./searchResource/searchResultApiResponse";
import { serachVendorResultGrid, serachVendorErrorResultGrid, FileUpload, SampleFileDownload } from "./searchResource/serachResultGrid"
import { setapplicationType, getTenantId } from "egov-ui-kit/utils/localStorageUtils/";
import { showHideAdhocPopup, getCommonApplyFooter, clearlocalstorageAppDetails, showHideAdhocPopupVendorError } from "../utils";
import { vendorChooseFile } from "./searchResource/vendorChooseFileUpload";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "vendor",
  labelKey: "EC_VENDOR_HEADER"
});

const VENDORSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    clearlocalstorageAppDetails(state);
    setapplicationType('VENDOR-MASTER');
    searchVendorResultApiResponse(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "serachVendorResultGrid"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },
          }
        },
        vendorChooseFile,
        // viewErrorButton,
        breakAfterSearch: getBreak(),
        serachVendorResultGrid,
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-echallan",
      componentPath: "PopupContainer",
      props: {
        open: false,
        maxWidth: "xl",
        screenKey: "search"
      },
      children: { 
        div2: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            align: "right"
          },
          props: {
            style: {
              width: "100%",
              float: "right",
              cursor: "pointer"
            }
          },
          children: {
            closeButton: {
              componentPath: "Button",
              props: {
                style: {
                  float: "right",
                  color: "rgba(0, 0, 0, 0.60)"
                }
              },
              children: {
                previousButtonIcon: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "close"
                  }
                }
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  showHideAdhocPopupVendorError(state, dispatch, "search")
                }
              }
            }
          }
        },

        div1: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 10,
            sm: 10
          },
          props: {
            style: {
              width: "100%",
              float: "right"
            }
          },
          children: {
            div: getCommonHeader(
              {
                labelName: "Error Details",
                labelKey: "EC_VENDOR_MASTER_ERROR_DETAILS"
              },
              {
                style: {
                  fontSize: "20px",
                  padding: "20px",
                }
              },
              {
                classes: {
                  root: "common-header-cont"
                }
              }
            )
          }
        },
        serachVendorErrorResultGrid
      },
    }
  }
};

export default VENDORSearchAndResult;
