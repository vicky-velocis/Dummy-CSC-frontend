import React from "react";
import { getCommonHeader, getCommonContainer, getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import {
  getUserInfo, localStorageSet, localStorageGet, getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { headerChallan } from "./challanManage/headerChallan/manageChallanHeader";
import { getDashboardChallanCount } from "../../../../ui-utils/commons";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { checkForRole } from "../utils";

const header = getCommonHeader(
  {
    labelName: "eChallan",
    labelKey: "EC_MANAGE_CHALLAN"
  },
  {
    style: {
      padding: "20px",
    }
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);
let cardItems = [];

const cardlist = [
  {
    label: {
      labelName: "E - Challan",
      labelKey: "",
    },
    icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon">
      wysiwyg
      </i>,
    route: "echallan-landing",
    id: "eChallan",
    pendingCount: '', //localStorageGet("challanCount") === null ? "" : localStorageGet("challanCount"),
    color: 'powderblue',
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanSI", "challanSM", "challanHOD", "challanEAO"],
    },

  },
  {
    label: {
      labelName: "Auction",
      labelKey: ""
    },
    icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      class="material-icons module-page-icon">
      gavel
      </i>,
    route: "../auction/home",
    id: "eAuction",
    pendingCount: '', //localStorageGet("auctionCount") === null ? "" : localStorageGet("auctionCount"),
    color: 'lightgreen',
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanSM", "challanHOD"],
    },
    // {
    //   screenKey: "citizenMainLanding",
    //   jsonPath: "components.adhocDialog"
    // }
  },
  {
    label: {
      labelKey: "",
      labelName: "Fine Master"
    },
    icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      class="material-icons module-page-icon">
      grading
      </i>,
    route: "../fine-master/search",
    id: "fine-Master",
    pendingCount: '', //localStorageGet("fineCount") === null ? "" : localStorageGet("fineCount"),
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["challanHOD"],
    },
    color: 'darkturquoise',
  },
  {
    label: {
      labelKey: "",
      labelName: "Item Master"
    },
    icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      class="material-icons module-page-icon">
      picture_in_picture
      </i>,
    route: "../item-master/search",
    pendingCount: '', //localStorageGet("itemCount") === null ? "" : localStorageGet("itemCount"),
    id: "Item-Master",
    roleDefination: {
      rolePath: "user-info.roles",
      roles: [""],
    },
    color: 'burlywood',
  },
];

cardItems = cardlist;

const geteChallanCount = async (action, state, dispatch) => {
  try {
    let payload = null;
    payload = await getDashboardChallanCount();
    dispatch(prepareFinalObject("eChallanDashboardCount", payload.ResponseBody));
    return payload.ResponseBody[0];
  } catch (e) {
    console.log(e);
  }
};


const eChallanPermissionManagement = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
    geteChallanCount(action, state, dispatch).then(response => {
      let countDetails = get(state, 'screenConfiguration.preparedFinalObject.eChallanDashboardCount[0]', {});
      let userInfo = JSON.parse(getUserInfo());
      const roles = get(userInfo, "roles")
      if (checkForRole(roles, 'challanSI') || checkForRole(roles, 'challanHOD') || checkForRole(roles, 'challanSM')) {
        dispatch(
          handleField('home', 'components.div.children.applyCard.props.items[0]',
            'pendingCount',
            get(state, 'screenConfiguration.preparedFinalObject.eChallanDashboardCount[0].challanCount', ''))
        );
      }

      if (checkForRole(roles, 'challanHOD') || checkForRole(roles, 'challanSM')) {
        dispatch(
          handleField('home', 'components.div.children.applyCard.props.items[1]',
            'pendingCount',
            get(state, 'screenConfiguration.preparedFinalObject.eChallanDashboardCount[0].auctionCount', ''))
        );
      }
      if (checkForRole(roles, 'challanHOD')) {
        dispatch(
          handleField('home', 'components.div.children.applyCard.props.items[2]',
            'pendingCount',
            get(state, 'screenConfiguration.preparedFinalObject.eChallanDashboardCount[0].fineCount', ''))
        );
      }
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        headerChallan: headerChallan,
        applyCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-echallan",
          componentPath: "CustomizedLandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        // listCard: {
        //   uiFramework: "custom-molecules-local",
        //   moduleName: "egov-echallan",
        //   componentPath: "HowItWorks"
        // }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-echallan",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default eChallanPermissionManagement;
