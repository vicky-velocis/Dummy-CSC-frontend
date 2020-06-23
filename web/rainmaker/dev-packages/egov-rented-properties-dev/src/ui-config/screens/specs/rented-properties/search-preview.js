import {
    getCommonHeader,
    getLabel,
    getBreak,
    getCommonContainer,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import find from "lodash/find";
import get from "lodash/get";
import set from "lodash/set";
import { getSearchResults } from "../../../../ui-utils/commons";
import { getReviewOwner, getReviewProperty, getReviewOwnerAddress, getReviewRentDetails, getReviewPaymentDetails } from "./applyResource/review-property";

let transitNumber = getQueryArg(window.location.href, "transitNumber");

const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelName: "Rented Properties",
    labelKey: "RP_COMMON_RENTED_PROPERTIES"
  })
});
const reviewOwnerDetails = getReviewOwner(false);
const reviewPropertyDetails = getReviewProperty(false);
const reviewAddressDetails = getReviewOwnerAddress(false);
const reviewRentDetails = getReviewRentDetails(false);
const reviewPaymentDetails = getReviewPaymentDetails(false);







export const propertyReviewDetails = getCommonCard({
  reviewPropertyDetails,
  reviewOwnerDetails,
  reviewAddressDetails,
  reviewRentDetails,
  reviewPaymentDetails,
});

export const searchResults = async (action, state, dispatch, transitNumber) => {
  let queryObject = [
    { key: "transitNumber", value: transitNumber }
  ];
  let payload = await getSearchResults(queryObject);
  if(payload) {
    let properties = payload.Properties;
    dispatch(prepareFinalObject("Properties[0]", properties[0]));
  }
}

const beforeInitFn = async (action, state, dispatch, transitNumber) => {
  if(transitNumber){
    await searchResults(action, state, dispatch, transitNumber)
  }
}

const rentedPropertiesDetailPreview = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    transitNumber = getQueryArg(window.location.href, "transitNumber");
    beforeInitFn(action, state, dispatch, transitNumber);
    return action;
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
        propertyReviewDetails
      }
    }
  }
};
export default rentedPropertiesDetailPreview;

