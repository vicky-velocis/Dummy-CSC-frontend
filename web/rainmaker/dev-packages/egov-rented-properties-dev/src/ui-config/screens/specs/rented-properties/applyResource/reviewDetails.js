import { getCommonCard, getCommonTitle } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getReviewProperty, getReviewOwner, getReviewAddress, getReviewRentDetails, getReviewPaymentDetails } from "./review-property";
import { getReviewApplicantDetails, getreviewPropertyAddressDetails } from './review-applications'
import { getReviewApplicantDetailsMortgage, getreviewPropertyAddressDetailsMortgage } from './review-applications-mortgage'
import { getReviewDocuments } from "./review-documents";

const reviewPropertyDetails = getReviewProperty();
const reviewOwnerDetails = getReviewOwner();
const reviewAddressDetails = getReviewAddress();
const reviewRentDetails = getReviewRentDetails();
const reviewPaymentDetails = getReviewPaymentDetails();
const reviewDocuments = getReviewDocuments(true, "apply");
const reviewApplicantDetails = getReviewApplicantDetails();
const reviewPropertyAddressDetails = getreviewPropertyAddressDetails()
const reviewApplicantDetailsMortgage = getReviewApplicantDetailsMortgage();
const reviewPropertyAddressDetailsMortgage = getreviewPropertyAddressDetailsMortgage();
const reviewFreshLicenceDocuments = getReviewDocuments(true, "ownership-apply", "OwnersTemp[0].reviewDocData")

const header = getCommonTitle({
  labelName: "Please review your Application and Submit",
  labelKey: "TL_SUMMARY_HEADER"
})

export const rentedReviewDetails = getCommonCard({
      header,
      reviewPropertyDetails,
      reviewOwnerDetails,
      reviewAddressDetails,
      reviewRentDetails,
      reviewPaymentDetails,
      reviewDocuments
})

export const ownerShipReviewDetails = getCommonCard({
    header,
    reviewPropertyAddressDetails,
    reviewApplicantDetails,
    reviewFreshLicenceDocuments
})

export const mortgageReviewDetails = getCommonCard({
  header,
  reviewPropertyAddressDetailsMortgage,
  reviewApplicantDetailsMortgage,
  
})