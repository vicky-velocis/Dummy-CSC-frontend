import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { adhocPopup } from "./Popup/addPopup"
import { serachResultGrid } from "./searchResource/serachResultGrid";
import { searchResultApiResponse } from './searchResource/searchResultApiResponse'
import { setapplicationType } from "egov-ui-kit/utils/localStorageUtils/";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject, toggleSnackbar, toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {footer} from "./searchResource/footer";

import { showHideAdhocPopup, clearlocalstorageAppDetails } from "../utils";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const pageResetAndChange = (state, dispatch, screenKey) => {
  dispatch(prepareFinalObject("ItemMaster", {}));
  showHideAdhocPopup(state, dispatch, screenKey)
};

const header = getCommonHeader({
  labelName: "Item Master",
  labelKey: "EC_ITEM_MASTER_HEADER"
});

const ITEMMASTERSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    clearlocalstorageAppDetails(state);
    setapplicationType('Item-Master');
    searchResultApiResponse(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "serachResultGrid",
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
            //footer: footer
          }
        },
        //pendingApprovals,
        breakAfterSearch: getBreak(),
        serachResultGrid,
        breakAfterSearch: getBreak(),
        footer
        // newApplicationButton: {
        //   componentPath: "Button",
        //   gridDefination: {
        //     xs: 12,
        //     sm: 12,
        //     align: "right"
        //   },
        //   visible: enableButton,
        //   props: {
        //     variant: "contained",
        //     color: "primary",
        //     style: {
        //       color: "white",
        //       borderRadius: "2px",
        //       width: "250px",
        //       height: "48px"
        //     }
        //   },

        //   children: {
        //     // plusIconInsideButton: {
        //     //   uiFramework: "custom-atoms",
        //     //   componentPath: "Icon",
        //     //   props: {
        //     //     iconName: "add",
        //     //     // style: {
        //     //     //   fontSize: "24px"
        //     //     // }
        //     //   }
        //     // },

        //     buttonLabel: getLabel({
        //       labelName: "ADD ITEM MASTER",
        //       labelKey: 'EC_HOME_SEARCH_RESULTS_NEW_APP_BUTTON'
        //     })
        //   },
        //   onClickDefination: {
        //     action: "condition",
        //     callBack: (state, dispatch) => {
        //       pageResetAndChange(state, dispatch, 'create');
        //     }
        //   },
        //   roleDefination: {
        //     rolePath: "user-info.roles",
        //     roles: ["challanEAO"],
        //     //path : "tradelicence/apply"

        //   }
        // }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-echallan",
      componentPath: "PopupContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "create"
      },
      children: {
        popup: adhocPopup
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          pageResetAndChange(state, dispatch, "create")
        }
      }
    }
  }
};

export default ITEMMASTERSearchAndResult;
