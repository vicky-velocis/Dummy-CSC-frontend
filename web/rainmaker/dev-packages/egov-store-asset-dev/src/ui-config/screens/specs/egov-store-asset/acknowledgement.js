import {
  getCommonHeader,
  getCommonContainer,
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
// import { paymentSuccessFooter } from "./acknowledgementResource/paymentSuccessFooter";
// import { approvalSuccessFooter } from "./acknowledgementResource/approvalSuccessFooter";
import { gotoHomeFooter } from "./acknowledgementResource/footers";
// import { paymentFailureFooter } from "./acknowledgementResource/paymentFailureFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
import { Icon } from "egov-ui-framework/ui-atoms";
import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

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

const getAcknowledgementCard = (state, dispatch, applicationNumber) => {
  return {
    header: getHeader(applicationNumber),
    applicationSuccessCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        card: acknowledgementCard({
          icon: "done",
          backgroundColor: "#39CB74",
          header: {
            labelName: "Store Master Submitted Successfully",
            labelKey: "STORE_APPLICATION_SUCCESS_MESSAGE_MAIN",
          },
          body: {
            labelName:
              "A notification regarding Application Submission has been sent to the applicant registered Mobile No.",
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
    let applicationNumber = "";
    const data = getAcknowledgementCard(
      state,
      dispatch,
      (applicationNumber = "Dummy ID -12345")
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  },
};

export default screenConfig;
