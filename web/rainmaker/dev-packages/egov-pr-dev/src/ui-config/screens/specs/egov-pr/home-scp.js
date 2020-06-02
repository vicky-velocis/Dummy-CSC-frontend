import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import TodayIcon from "../../../../ui-atoms-local/Icons/TodayIcon";
import LibraryIcon from "../../../../ui-atoms-local/Icons/LibraryIcon"
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale,
  setBusinessServiceDataToLocalStorage
} from "egov-ui-framework/ui-utils/commons";

import {localStorageGet, localStorageSet,getUserInfo} from "egov-ui-kit/utils/localStorageUtils";
import "../../../../customstyle.scss";

import {
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";


 const header = getCommonHeader(
  {
    labelName: "",
    labelKey:"PR_SPORTS_AND_CULTURE",
  
    style: {
      padding: "20px",
    }
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
)



let cardItems=[]
if(JSON.parse(getUserInfo()).roles[0].code=="DEPARTMENTUSER")
{
const cardList = [
  
  {
    label: {
      labelKey: "Library",
      labelName: "LIBRARY"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   local_library
  </i>, 
    // icon: <LibraryIcon />,
    route: "library-search"
  },

];
cardItems = cardList;
}
else{

  const cardList = [
    {
      label: {
        labelName: "Create Event",
        labelKey: "PR_CREATE EVENT"
      },
      icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     event
    </i>,
    // icon: <TodayIcon />,
      route: "apply"
    },
    {
      label: {
        labelName: "Manage Events",
        labelKey: "PR_MANAGE_EVENT"
      },
      icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     library_books
    </i>,
   
    
      // icon: <MyApplicationIcon />,
      route: "search"
    },
    {
      label: {
        labelName: "Invite Guest",
        labelKey: "PR_INVITE_GUEST"
      },
      icon:<i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     contact_mail
    </i>,
      route: "eventList"
    },
    {
      label: {
        labelKey: "Library",
        labelName: "LIBRARY"
      },
      icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     local_library
    </i>, 
      // icon: <LibraryIcon />,
      route: "library-search"
    },
  
  ];
  cardItems = cardList;
  

}
const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
   
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PublicRelation.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        getRequiredDocuments(documents)
      );
    });
	
	
	const modulecode = getQueryArg(
      window.location.href,
      "modulecode"
    );
  
    
	localStorageSet("modulecode",modulecode);
  

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header:header,
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
      moduleName: "egov-noc",
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

export default PRSCPSearchAndResult;
