
 import { getCommonApplyFooter, } from "../../utils";
 import { getLabel} from "egov-ui-framework/ui-config/screens/specs/utils";
 import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
 import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
 import { httpRequest } from "../../../../../ui-utils/api";
 import {  WFConfig } from "../../../../../ui-utils/sampleResponses";
 import get from "lodash/get";
import set from "lodash/set";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
const moveToSuccess = async(Action, dispatch) => {
  
  const employeeID = getQueryArg(
    window.location.href,
    "employeeID"
  );
  
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const purpose = Action;
  const status = "success";
  dispatch(
    setRoute(
      `/pms/acknowledgementInitiate?purpose=${purpose}&status=${status}&employeeID=${employeeID}`
    )
  );
  
};
 const wfActionSubmit= async (state, dispatch) => {
  const tenantId = getQueryArg(window.location.href, "tenantId");
  let WFBody = {
    Employees: [
      {
        code: get(state,"screenConfiguration.preparedFinalObject.ProcessInstances[0].code", '' ),// ,employeeID,,
          tenantId: tenantId,
         
      }       
  ]
  };
 
  try {
    let payload = null;
    
    payload = await httpRequest(
      "post",
      "/pension-services/v1/_pushManualRegisterToPensionNotificationRegister",
      "",
      [],
      WFBody
    );
   

    dispatch(toggleSnackbar(
      true,
      { labelName: "succcess ", labelKey: 'PENSION_PUSH_MANNUAL_SUCCESS' },
      "success"
    ));
    moveToSuccess("PUSH_MANNUAL",dispatch)
   
    //dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (error) {
    
 
      dispatch(toggleSnackbar(
        true,
        { labelName: "error", labelKey: error.message },
        "error"
      ))
     // moveToSuccess("PUSH_MANNUAL",dispatch)
    
  }
 }

 export const footer = () => {

    return getCommonApplyFooter({
   // export const footer = getCommonApplyFooter({
      //  ActionButton:{
      //   uiFramework: "custom-containers-local",
      //   moduleName: "egov-pms",
      //   componentPath: "DropdownButton",
      //   props: {
      //       dataPath: "ProcessInstances",
      //       moduleName: "INITIATE_MANNUAL",
      //       pageName:"reviewRegister",
      //       Visible:true,
      //       Accesslable:[]
      //     }

      //  },
      SubmitButton: {
        componentPath: "Button",
        
        props: {
          variant: "contained",
          color: "primary",
          style: {
            //minWidth: "200px",
            height: "48px",
            marginRight: "10px"
          }
        },
        children: {
         
          submitButtonLabel: getLabel({
            labelName: "Submit",
            labelKey: "PENSION_INITIATE_PUSH_REGISTER"
          }),
         
         
        },
        onClickDefination: {
          action: "condition",
          callBack: wfActionSubmit
        },
        visible: true
      },
   
  });
  }
  