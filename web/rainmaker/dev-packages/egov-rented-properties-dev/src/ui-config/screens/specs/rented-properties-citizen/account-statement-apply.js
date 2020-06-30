import {
    getCommonHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";

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
                }
            }
        }
    }
}

export default applyLicense;