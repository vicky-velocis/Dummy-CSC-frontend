import { getCommonCard, getCommonTitle } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getReviewProperty, getReviewOwner, getReviewOwnerAddress, getReviewRentDetails, getReviewPaymentDetails } from "./review-property";

const reviewPropertyDetails = getReviewProperty();
const reviewOwnerDetails = getReviewOwner();
const reviewAddressDetails = getReviewOwnerAddress();
const reviewRentDetails = getReviewRentDetails();
const reviewPaymentDetails = getReviewPaymentDetails();

export const rentedReviewDetails = getCommonCard({
    header: getCommonTitle({
        labelName: "Please review your Application and Submit",
        labelKey: "TL_SUMMARY_HEADER"
      }),
      reviewPropertyDetails,
      reviewOwnerDetails,
      reviewAddressDetails,
      reviewRentDetails,
      reviewPaymentDetails
})