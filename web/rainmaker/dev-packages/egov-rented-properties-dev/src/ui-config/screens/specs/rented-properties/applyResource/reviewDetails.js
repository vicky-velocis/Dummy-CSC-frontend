import { getCommonCard, getCommonTitle } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getReviewProperty, getReviewOwner } from "./review-property";


const reviewPropertyDetails = getReviewProperty();
const reviewOwnerDetails = getReviewOwner();


export const rentedReviewDetails = getCommonCard({
    header: getCommonTitle({
        labelName: "Please review your Application and Submit",
        labelKey: "TL_SUMMARY_HEADER"
      }),
      reviewPropertyDetails,
      reviewOwnerDetails
})