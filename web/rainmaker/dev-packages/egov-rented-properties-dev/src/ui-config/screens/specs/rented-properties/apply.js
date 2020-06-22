import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import {stepper, formwizardFirstStep, formwizardSecondStep} from './applyResource/applyConfig'
import { httpRequest } from "../../../../ui-utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import commonConfig from "config/common.js";
import {footer} from './applyResource/footer';

const getMdmsData = async (dispatch, body) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: body
      }
    };
    try {
      let payload = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
      return payload;
    } catch (e) {
      console.log(e);
    }
  };
  
const getColonyTypes = async(action, state, dispatch) => {
    const colonyTypePayload = [{
      moduleName: "PropertyServices",
      masterDetails: [{name: "colonies"}]
    }]
    const colonyRes = await getMdmsData(dispatch, colonyTypePayload);
    const {PropertyServices = []} = colonyRes.MdmsRes || {}
    dispatch(prepareFinalObject("applyScreenMdmsData.rentedPropertyColonies", PropertyServices.colonies))
    const propertyTypes = PropertyServices.colonies.map(item => ({
      code: item.code,
      label: item.code
    }))
    dispatch(prepareFinalObject("applyScreenMdmsData.propertyTypes", propertyTypes))
  }


const header = getCommonHeader({
    labelName: "Rented Properties Add Update",
    labelKey: "RP_COMMON_RENTED_PROPERTIES_ADD_UPDATE"
  });

const applyRentedProperties = {
    uiFramework: "material-ui",
    name: "apply",
    beforeInitScreen: (action, state, dispatch) => {
        getColonyTypes(action, state, dispatch);
        return action;
      },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header: {
                            gridDefination: {
                              xs: 12,
                              sm: 10
                            },
                            ...header
                          }
                    }
                },
                stepper,
                formwizardFirstStep,
                formwizardSecondStep,
                footer
            }
        }
    }
}

export default applyRentedProperties