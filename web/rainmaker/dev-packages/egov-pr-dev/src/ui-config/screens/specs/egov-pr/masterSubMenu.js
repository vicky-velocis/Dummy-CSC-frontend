import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import TodayIcon from "../../../../ui-atoms-local/Icons/TodayIcon";
import LibraryIcon from "../../../../ui-atoms-local/Icons/LibraryIcon"
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";

const header = getCommonHeader(
  {
    labelName: "Press Master",
    labelKey: "Press Master"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const cardItems = [
  {
    label: {
      labelName: "Create Press",
      labelKey: "Create Press"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size= "40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   menu_book
  </i>,
    route: "pressDetailsMasterCreate"
  },
  {
    label: {
      labelName: "Manage Press",
      labelKey: "Manage Press"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   library_books
  </i>,
    route: "pressGrid"
  },
 

];

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "eventHome",
  beforeInitScreen: (action, state, dispatch) => {
   
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        
      }
    },
   
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pr",
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

export default tradeLicenseSearchAndResult;
