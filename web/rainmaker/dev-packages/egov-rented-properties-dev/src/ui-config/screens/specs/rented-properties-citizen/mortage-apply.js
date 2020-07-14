import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import {stepper, formwizardMortgageFirstStep,formwizardMortgageSecondStep, formwizardMortgageThirdStep } from '../rented-properties/applyResource/applyConfig';
  import {mortgagefooter} from './footer-mortgage';


const header = getCommonHeader({
    labelName: "Apply Mortage License",
    labelKey: "RP_COMMON_MORTAGE_LICENSE_APPLY"
});

const applyLicense = {
    uiFramework: "material-ui",
    name: "mortage-apply",
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
                formwizardFirstStep: formwizardMortgageFirstStep,
                formwizardSecondStep:formwizardMortgageSecondStep,
                formwizardThirdStep: formwizardMortgageThirdStep,
                footer: mortgagefooter
            }
        }
    }
}

export default applyLicense;