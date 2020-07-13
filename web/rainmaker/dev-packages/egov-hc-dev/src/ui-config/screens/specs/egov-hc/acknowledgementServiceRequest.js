import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { applicationSuccessFooter } from "./acknowledgementResource/footers";


const getAcknowledgementCard = (
  state,
  dispatch,
  serviceRequestId,
  tenant
) => {

    return {

      serviceRequestSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {

        },
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Thank You",
              labelKey: "HC_SERVICE_REQUEST_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName:
                "Service Request Submitted Successfully",
              labelKey: "HC_SERVIVE_REQUEST_MESSAGE"
            },
            tailText: {
              labelName: "Service Request ID",
              labelKey: "HC_SERVICE_REQUEST_ID"
            },
            number: serviceRequestId,
          })
        }
      },
      
      
      
      
    
    
    
    
    
    
    
    
    
    applicationSuccessFooter: applicationSuccessFooter(
      state,
      dispatch,
      serviceRequestId,
      tenant
    )
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
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const serviceRequestId = getQueryArg(window.location.href, "serviceRequestId");
    
    const tenant = "ch";
    const data = getAcknowledgementCard(
      state,
      dispatch,
      serviceRequestId,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;