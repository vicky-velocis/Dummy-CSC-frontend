import {
    getCommonHeader,getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {stepper, formwizardAccountGenerationFirstStep,formwizardDuplicateCopySecondStep,formwizardDuplicateCopyThirdStep } from '../rented-properties/applyResource/applyConfig';
import {duplicatefooter} from './footer';
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getOwnershipSearchResults, setDocsForEditFlow ,getDuplicateCopySearchResults, setDocumentData} from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { get } from "lodash";
import { getMdmsData } from "../rented-properties/apply";
const header = getCommonHeader({
    labelName: "Apply for Account Statement Generation",
    labelKey: "RP_COMMON_ACCOUNT_STATEMENT_GENERATION_APPLY"
});

const applyLicense = {
    uiFramework: "material-ui",
    name: "account-statement-apply",
    beforeInitScreen: (action, state, dispatch) => {
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
                searchButton: {
                    componentPath: "Button",
                    gridDefination: {
                      xs: 12,
                      sm: 4,
                      align: "right"
                    },
                    props: {
                      variant: "contained",
                      style: {
                        color: "white",
                        backgroundColor: "#fe7a51",
                        borderColor:"#fe7a51",
                        borderRadius: "2px",
                        width: "50%",
                        height: "48px",
                      }
                    },
                    children: {
                      buttonLabel: getLabel({
                        labelName: "MASTER ADD",
                        labelKey: "RP_HOME_ADD_BUTTON"
                      })
                    },
                    onClickDefination: {
                      action: "condition",
                      callBack: (state, dispatch) => {
                        dispatch(setRoute(`/rented-properties/apply?tenantId=${getTenantId()}`));
                      }
                    },
                  },
                // stepper,
                formwizardFirstStep: formwizardAccountGenerationFirstStep,
                // formwizardSecondStep: formwizardDuplicateCopySecondStep,
                // formwizardThirdStep: formwizardDuplicateCopyThirdStep,
            }
        }
    }
}

export default applyLicense;