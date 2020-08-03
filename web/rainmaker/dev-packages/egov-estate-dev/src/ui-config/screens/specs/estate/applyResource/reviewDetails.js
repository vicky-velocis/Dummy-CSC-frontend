import {
  getCommonCard,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getReviewProperty,
  getReviewOwner,
  getReviewPurchaser,
  getReviewGroundRent,
  getReviewServiceTax,
  getReviewCourtCase
} from "./reviewProperty";

import {
  getReviewDocuments
} from "./reviewDocuments";


const reviewPropertyDetails = getReviewProperty();
const reviewOwnerDetails = getReviewOwner();
const reviewPurchaserDetails = getReviewPurchaser();
const reviewGroundRent = getReviewGroundRent();
const reviewServiceTax = getReviewServiceTax();
const reviewCourtCase = getReviewCourtCase();
const reviewDocuments = getReviewDocuments();

const header = getCommonTitle({
  labelName: "Please review your Application and Submit",
  labelKey: "TL_SUMMARY_HEADER"
})

export const reviewDetails = getCommonCard({
  header,
  reviewPropertyDetails,
  reviewOwnerDetails,
  reviewPurchaserDetails,
  reviewGroundRent,
  reviewServiceTax,
  reviewCourtCase,
  reviewDocuments
})