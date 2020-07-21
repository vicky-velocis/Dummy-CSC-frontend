import {
    getCommonHeader,
    getCommonContainer,
    getCommonCard,
    getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { set } from "lodash";
import { getreviewPropertyAddressDetailsMortgage, getReviewApplicantDetailsMortgage } from "./applyResource/review-applications-mortgage";
import { getMortgageSearchResults } from "../../../../ui-utils/commons";

const reviewPropertyAddressDetailsMortgage = getreviewPropertyAddressDetailsMortgage(false);
const reviewApplicantDetailsMortgage = getReviewApplicantDetailsMortgage(false);

const mortgageReviewDetails = getCommonCard({
    reviewPropertyAddressDetailsMortgage,
    reviewApplicantDetailsMortgage
})

const beforeInitFn = async(action, state, dispatch) => {
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId")
    if(!!applicationNumber) {
        const queryObject = [
          {key: "applicationNumber", value: applicationNumber}
        ]
        const response = await getMortgageSearchResults(queryObject);
        if(response && response.MortgageApplications){
            let {MortgageApplications} = response;
            dispatch(prepareFinalObject("MortgageApplications", MortgageApplications))
        }
    }
}

const mortgagePreviewDetails = {
    uiFramework: "material-ui",
    name: "mortgage-search-preview",
    beforeInitScreen: (action, state, dispatch) => {
        beforeInitFn(action, state, dispatch)
        return action
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
              className: "common-div-css search-preview"
            },
            children: {
              headerDiv: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                children: {
                  header1: {
                    gridDefination: {
                      xs: 12,
                      sm: 8
                    },
                   ...headerrow
                  },
                  helpSection: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    props: {
                      color: "primary",
                      style: { justifyContent: "flex-end" }
                    },
                    gridDefination: {
                      xs: 12,
                      sm: 4,
                      align: "right"
                    }
                  }
                  }
                },
                // taskStatus: {
                //   uiFramework: "custom-containers-local",
                //   moduleName: "egov-rented-properties",
                //   componentPath: "WorkFlowContainer",
                //   props: {
                //     dataPath: "Owners",
                //     moduleName: "OwnershipTransferRP",
                //     updateUrl: "/csp/ownership-transfer/_update"
                //   }
                // },
                mortgageReviewDetails
            }
          }
    }
}

export default ownerShipDetailsPreview