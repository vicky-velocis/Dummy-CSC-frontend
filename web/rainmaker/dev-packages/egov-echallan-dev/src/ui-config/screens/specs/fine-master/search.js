import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { adhocPopup } from "./popup/addpopup"
import { serachResultGrid, disabledFieldsAddEdit } from "./searchResource/serachResultGrid";
import { searchResultApiResponse } from './searchResource/searchResultApiResponse'
import { setapplicationType, getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils/";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject, toggleSnackbar, toggleSpinner
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "ui-redux/store";
import { showHideAdhocPopup, clearlocalstorageAppDetails, checkForRole } from "../utils";
import get from "lodash/get";
import { footer } from "./searchResource/footer";
import { fetchMdmsData } from "../../../../ui-utils/commons";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const pageResetAndChange = (state, dispatch, screenKey) => {
  let userInfo = JSON.parse(getUserInfo());
  const roles = get(userInfo, "roles");
  if (checkForRole(roles, 'challanEAO')) {
    isVisibility(true)
  }

  dispatch(prepareFinalObject("FineMaster", {}));
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.egec.EncroachmentType-new",
      get(state, 'screenConfiguration.preparedFinalObject.applyScreenMdmsData.egec.EncroachmentType', [])
    )
  );
  disabledFieldsAddEdit(false);
  showHideAdhocPopup(state, dispatch, screenKey)
};
const isVisibility = (isVisible) => {
  if (isVisible) {
    store.dispatch(
      handleField(
        "search",
        "components.adhocDialog.children.popup.children.header.children.div1.children.div",
        "props.visible",
        isVisible
      )
    ),
      store.dispatch(
        handleField(
          "search",
          "components.adhocDialog.children.popup.children.header.children.div1.children.div1",
          "visible",
          false
        )
      )
  }
};
const header = getCommonHeader({
  labelName: "Fine Master",
  labelKey: "EC_FINE_MASTER_HEADER"
});

const FineMasterSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    clearlocalstorageAppDetails(state);
    setapplicationType('Fine-Master');
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
          }
        },
        breakAfterSearch: getBreak(),
        serachResultGrid,
        breakAfterSearch: getBreak(),
        footer
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

export default FineMasterSearchAndResult;
