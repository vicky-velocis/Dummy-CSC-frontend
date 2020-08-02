import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getRequiredDocData, checkForRole } from "../utils";
import {
  getUserInfo, setOPMSTenantId, getTenantId
} from "egov-ui-kit/utils/localStorageUtils";


let roles = JSON.parse(getUserInfo()).roles
const header = getCommonHeader(
  {
    labelName: "OPMS",
    labelKey: "ACTION_TEST_OPMS"
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

var finalCardList = []
let cardItems = [];
if (checkForRole(roles, 'CITIZEN')) {
  const cardlist = [
    {
      label: {
        labelKey: "Permission to Keep Pet Dog",
        labelName: "Permission to Keep Pet Dog"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        font-size="40px"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        pets
      </i>,
      route: "citizenMainLanding"
    },
    {
      label: {
        labelKey: "Permission to Sell Meat",
        labelName: "Permission to Sell Meat"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        restaurant
      </i>,
      route: "sellMeatLanding"
    },
    {
      label: {
        labelKey: "Permission for Advertisement",
        labelName: "Permission for Advertisement"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        picture_in_picture
      </i>,
      route: "advertisementLanding"
    },
    {
      label: {
        labelKey: "Permission for Road Cut",
        labelName: "Permission for Road Cut"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        report_problem
      </i>,
      route: "roadcutLanding"
    }

  ];
  finalCardList = cardlist;
  cardItems = cardlist;
}
if (checkForRole(roles, 'SI') || checkForRole(roles, 'MOH')) {
  const cardlist = [
    {
      label: {
        labelKey: "Permission to Keep Pet Dog",
        labelName: "Permission to Keep Pet Dog"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        font-size="40px"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        pets
      </i>,
      route: "search"
    },
    {
      label: {
        labelKey: "Permission to Sell Meat",
        labelName: "Permission to Sell Meat"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        restaurant
      </i>,
      route: "sellmeat-search"
    }
  ];
  finalCardList = finalCardList.concat(cardlist)
  cardItems = cardlist;
}
if (checkForRole(roles, 'CE') || checkForRole(roles, 'JE') || checkForRole(roles, 'SDO') || checkForRole(roles, 'EE') || checkForRole(roles, 'SE') || checkForRole(roles, 'DOEE') || checkForRole(roles, 'DOSE') || checkForRole(roles, 'DOCE') || checkForRole(roles, 'WD')) {
  const cardlist = [
    {
      label: {
        labelKey: "Permission for Road Cut",
        labelName: "Permission for Road Cut"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        report_problem
      </i>,
      route: "roadcut-search"
    }
  ];
  finalCardList = finalCardList.concat(cardlist)
  cardItems = cardlist;
}
if (checkForRole(roles, 'OSD') || checkForRole(roles, 'CA') || checkForRole(roles, 'SC') || checkForRole(roles, 'JEX') || checkForRole(roles, 'JC') || checkForRole(roles, 'SEC') || checkForRole(roles, 'ADDITIONAL_COMMISSIONER')) {
  const cardlist = [
    {
      label: {
        labelKey: "Permission for Advertisement",
        labelName: "Permission for Advertisement"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        picture_in_picture
      </i>,
      route: "advertisement-search"
    }
  ];
  finalCardList = finalCardList.concat(cardlist)

  cardItems = cardlist;
}
if (checkForRole(roles, 'SUPERINTENDENT')) {
  const cardlist = [
    {
      label: {
        labelKey: "Permission to Sell Meat",
        labelName: "Permission to Sell Meat"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        restaurant
      </i>,
      route: "sellmeat-search"
    },
    {
      label: {
        labelKey: "Permission for Advertisement",
        labelName: "Permission for Advertisement"
      },
      icon: <i
        viewBox="0 -8 35 42"
        color="primary"
        class="material-icons module-page-icon" style={{ fontSize: "42px" }}>
        picture_in_picture
      </i>,
      route: "advertisement-search"
    }
  ];
  finalCardList = finalCardList.concat(cardlist)
  cardItems = cardlist;
}

const PermissionManagementSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
    let UsertenantInfo = JSON.parse(getUserInfo()).permanentCity;
    if (JSON.parse(getUserInfo()).type === "CITIZEN")
      setOPMSTenantId(UsertenantInfo);
    else
      setOPMSTenantId(getTenantId());
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
            items: finalCardList,
            history: {},
            module: "PRSCP"
          }
        }
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-opms",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home",


      },
      children: {
        popup: {}
      }
    }
  }
};

export default PermissionManagementSearchAndResult;
