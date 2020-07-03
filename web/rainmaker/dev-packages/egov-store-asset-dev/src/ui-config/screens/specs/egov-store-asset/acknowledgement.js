import {
  getCommonHeader,
  getCommonContainer,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoHomeFooter } from "./acknowledgementResource/footers";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
import { Icon } from "egov-ui-framework/ui-atoms";
import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
const screenName = getQueryArg(window.location.href, "screen").toUpperCase();
const mode = getQueryArg(window.location.href, "mode").toUpperCase();
const code = getQueryArg(window.location.href, "code");
const getHeader = (applicationNumber) => {
  return getCommonContainer({
    header: getCommonHeader({
      labelName: `Store Master Created Successfully`,
      labelKey: "",
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-store-asset",
      componentPath: "ApplicationNoContainer",
      props: {
        number: applicationNumber,
      },
      visible: true,
    },
  });
};

const getLabelForStoreAsset = () => {
let labelValue = "";
  switch(screenName){
    case "STOREMASTER": labelValue = {
      labelName: "Store Master Submitted Successfully",
      labelKey: `STORE_APPLICATION_SUCCESS_${screenName}_${mode}`,
    }
    case "MATERIALTYPE": labelValue = {
      labelName: "Store Master Submitted Successfully",
      labelKey: `STORE_APPLICATION_SUCCESS_${screenName}_${mode}`,
    }
    break;
    case "SUPPLIERMASTER": labelValue = {
      labelName: "Store Master Submitted Successfully",
      labelKey: `STORE_APPLICATION_SUCCESS_${screenName}_${mode}`,
    }
    break;
    default :  labelValue = {
      labelName: "Submitted Successfully",
      labelKey: "",
    }

  }
 return labelValue;
}


const getAcknowledgementCard = (state, dispatch, applicationNumber) => {
  return {
  //  header: getHeader(applicationNumber),
    applicationSuccessCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        card: acknowledgementCard({
          icon: "done",
          backgroundColor: "#39CB74",
          header: getLabelForStoreAsset(),
          body: {
            labelName:
              "A notification regarding Application Submission has been sent to the applicant",
            labelKey: "PET_NOC_APPLICATION_SUCCESS_MESSAGE_SUB",
          },
          tailText: {
            labelName: "Application No.",
            labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL",
          },
          number: applicationNumber,
        }),
      },
    },
    gotoHomeFooter,
  };
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
    },
  },
  beforeInitScreen: (action, state, dispatch) => {
    let applicationNumber = code;
    const data = getAcknowledgementCard(
      state,
      dispatch,
      applicationNumber
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  },
};

export default screenConfig;
