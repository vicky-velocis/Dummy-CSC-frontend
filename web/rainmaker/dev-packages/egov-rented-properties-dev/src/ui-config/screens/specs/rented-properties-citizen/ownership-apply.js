import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import {stepper, formwizardOwnershipFirstStep, formwizardOwnershipSecondStep, formwizardOwnershipThirdStep } from '../rented-properties/applyResource/applyConfig';
import {footer} from './footer';

const header = getCommonHeader({
    labelName: "Apply Fresh License",
    labelKey: "RP_COMMON_FRESH_LICENSE_APPLY"
});

const applyLicense = {
    uiFramework: "material-ui",
    name: "ownership-apply",
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
                stepper,
                formwizardFirstStep: formwizardOwnershipFirstStep,
                formwizardSecondStep: formwizardOwnershipSecondStep,
                formwizardThirdStep: formwizardOwnershipThirdStep,
                footer
            }
        }
    }
}

export default applyLicense;