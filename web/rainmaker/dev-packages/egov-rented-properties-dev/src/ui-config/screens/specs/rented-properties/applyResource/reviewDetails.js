import { getCommonCard, getCommonTitle } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getReviewProperty, getReviewOwner, getReviewAddress, getReviewRentDetails, getReviewPaymentDetails } from "./review-property";
import { getReviewDocuments } from "./review-documents";

const reviewPropertyDetails = getReviewProperty();
const reviewOwnerDetails = getReviewOwner();
const reviewAddressDetails = getReviewAddress();
const reviewRentDetails = getReviewRentDetails();
const reviewPaymentDetails = getReviewPaymentDetails();
const reviewDocuments = getReviewDocuments();

export const rentedReviewDetails = getCommonCard({
    header: getCommonTitle({
        labelName: "Please review your Application and Submit",
        labelKey: "TL_SUMMARY_HEADER"
      }),
      reviewPropertyDetails,
      reviewOwnerDetails,
      reviewAddressDetails,
      reviewRentDetails,
      reviewPaymentDetails,
      reviewDocuments
})