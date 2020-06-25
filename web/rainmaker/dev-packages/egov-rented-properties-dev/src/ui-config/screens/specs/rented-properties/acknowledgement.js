import {
    getCommonHeader,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";

const getAcknowledgementCard = (
    state,
    dispatch,
    purpose,
    status,
    tenant,
    transitNumber
  ) => {
    if ((purpose === "apply" || purpose === "forward" || purpose === "sendback" || purpose ==="reject" || purpose === "approve") && status === "success") {
      const header =  purpose === "apply" ? {
        labelName: "Rented Property Master Entry Submitted Successfully",
        labelKey: "RP_MASTER_ENTRY_SUCCESS_MESSAGE_MAIN"
      } : purpose === "forward" ? {
        labelName: "Rented Property Master Entry Forwarded Successfully",
        labelKey: "RP_FORWARD_SUCCESS_MESSAGE_MAIN"
      } : purpose === "sendback" ? {
        labelName: "Rented Property Master Entry is sent back Successfully",
        labelKey: "RP_SENDBACK_CHECKLIST_MESSAGE_HEAD"
      } : purpose ==="reject" ? {
        labelName: "Rented Property Master Entry is Rejected",
        labelKey: "RP_APPROVAL_REJ_MESSAGE_HEAD"
      } : {
        labelName: "Rented Property Master Entry is Approved Successfully",
        labelKey: "RP_APPROVAL_SUCCESS_MESSAGE_HEAD"
      }

      return {
        header: getCommonHeader({
          labelName: `Rented Properties Master Entry`,
          labelKey: "RP_MASTER_ENTRY",
        }),
        applicationSuccessCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            // style: {
            //   position: "absolute",
            //   width: "95%"
            // }
          },
          children: {
            card: acknowledgementCard({
              icon: "done",
              backgroundColor: "#39CB74",
              header,
            //   body: {
            //     labelName:
            //       "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
            //     labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_SUB"
            //   },
              tailText: {
                labelName: "Transit Number",
                labelKey: "RP_SITE_PLOT_LABEL"
              },
              number: transitNumber
            })
          }
        },
        applicationSuccessFooter: applicationSuccessFooter(
          state,
          dispatch,
          transitNumber,
          tenant
        )
      };
    } 
}

const getData = async (action, state, dispatch, purpose, status, tenant, transitNumber) => {
    const data = await getAcknowledgementCard(
      state,
      dispatch,
      purpose,
      status,
      tenant,
      transitNumber
    );
    dispatch(
      handleField(
        "acknowledgement",
        "components.div",
        "children",
        data
      )
    );
  }


const screenConfig = {
    uiFramework: "material-ui",
    name: "acknowledgement",
    beforeInitScreen: (action, state, dispatch) => {
      const purpose = getQueryArg(window.location.href, "purpose");
      const status = getQueryArg(window.location.href, "status");
      const transitNumber = getQueryArg(
        window.location.href,
        "transitNumber"
      );
      const tenant = getQueryArg(window.location.href, "tenantId");
      getData(action, state, dispatch, purpose, status, tenant, transitNumber)
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css"
        }
      }
    }
};

  export default screenConfig;