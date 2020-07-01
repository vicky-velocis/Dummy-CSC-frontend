import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import {stepper, formwizardMortgageFirstStep } from '../rented-properties/applyResource/applyConfig';


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
                formwizardMortgageFirstStep
            }
        }
    }
}

export default applyLicense;