import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

const premiumAmountField = {
  label: {
      labelName: "Premium Amount",
      labelKey: "EST_PREMIUM_AMOUNT_LABEL"
  },
  placeholder: {
      labelName: "Enter Premium Amount",
      labelKey: "EST_PREMIUM_AMOUNT_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const noOfInstallmentsForPremiumAmountField = {
  label: {
      labelName: "No. of Installments for Premium Amount",
      labelKey: "EST_NUMBER_OF_INSTALLMENTS_FOR_PREMIUM_AMOUNT_LABEL"
  },
  placeholder: {
      labelName: "Enter No. of Installments for Premium Amount",
      labelKey: "EST_NUMBER_OF_INSTALLMENTS_FOR_PREMIUM_AMOUNT_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const groundRentField = {
  label: {
      labelName: "Ground Rent",
      labelKey: "EST_GROUND_RENT_LABEL"
  },
  placeholder: {
      labelName: "Enter Ground Rent",
      labelKey: "EST_GROUND_RENT_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const groundRentGenerationTypeField = {
  label: {
      labelName: "Ground Rent Generation Type",
      labelKey: "EST_GROUND_RENT_GENERATION_TYPE_LABEL"
  },
  placeholder: {
      labelName: "Enter Ground Rent Generation Type",
      labelKey: "EST_GROUND_RENT_GENERATION_TYPE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const startingDateForGroundRentField = {
  label: {
      labelName: "Starting Date for Ground Rent",
      labelKey: "EST_STARTING_DATE_GROUND_RENT_LABEL"
  },
  placeholder: {
      labelName: "Enter Starting Date for Ground Rent",
      labelKey: "EST_STARTING_DATE_GROUND_RENT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "",
  props: {
      inputProps: {
          max: getTodaysDateInYMD()
      }
  }
}

const rentRevision1to33Field = {
  label: {
      labelName: "Rent Revision for 1-33 Years",
      labelKey: "EST_RENT_REVISION_1TO33_YEARS_LABEL"
  },
  placeholder: {
      labelName: "Enter Rent Revision for 1-33 Years",
      labelKey: "EST_RENT_REVISION_1TO33_YEARS_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const rentRevision34to66Field = {
  label: {
      labelName: "Rent Revision for 34-66 Years",
      labelKey: "EST_RENT_REVISION_34TO66_YEARS_LABEL"
  },
  placeholder: {
      labelName: "Enter Rent Revision for 34-66 Years",
      labelKey: "EST_RENT_REVISION_34TO66_YEARS_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const rentRevision67to99Field = {
  label: {
      labelName: "Rent Revision for 67-99 Years",
      labelKey: "EST_RENT_REVISION_67TO99_YEARS_LABEL"
  },
  placeholder: {
      labelName: "Enter Rent Revision for 67-99 Years",
      labelKey: "EST_RENT_REVISION_67TO99_YEARS_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const licenseFeeField = {
  label: {
      labelName: "License Fee",
      labelKey: "EST_LICENSE_FEE_LABEL"
  },
  placeholder: {
      labelName: "Enter License Fee",
      labelKey: "EST_LICENSE_FEE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const startingDateForLicenseFeeField = {
  label: {
      labelName: "Starting Date for License Fee",
      labelKey: "EST_STARTING_DATE_LICENSE_FEE_LABEL"
  },
  placeholder: {
      labelName: "Enter Starting Date for License Fee",
      labelKey: "EST_STARTING_DATE_LICENSE_FEE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const leasePeriodField = {
  label: {
      labelName: "Lease Period",
      labelKey: "EST_LEASE_PERIOD_LABEL"
  },
  placeholder: {
      labelName: "Enter Lease Period",
      labelKey: "EST_LEASE_PERIOD_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const advancedRentField = {
  label: {
      labelName: "Advanced Rent",
      labelKey: "EST_ADVANCED_RENT_LABEL"
  },
  placeholder: {
      labelName: "Enter Advanced Rent",
      labelKey: "EST_ADVANCED_RENT_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  maxLength: 100,
  jsonPath: ""
}

const premiumAmountHeader = getCommonTitle({
  labelName: "Premium Amount Details",
  labelKey: "EST_PREMIUM_AMOUNT_HEADER"
}, {
  style: {
      marginBottom: 18,
      marginTop: 18
  }
})

export const premiumAmountDetails = getCommonCard({
  header: premiumAmountHeader,
  detailsContainer: getCommonContainer({
      premiumAmount: getTextField(premiumAmountField),
      noOfInstallmentsForPremiumAmount: getSelectField(noOfInstallmentsForPremiumAmountField)
  })
})

const groundRentHeader = getCommonTitle({
  labelName: "Ground Rent Details",
  labelKey: "EST_GROUND_RENT_HEADER"
}, {
  style: {
      marginBottom: 18,
      marginTop: 18
  }
})

export const groundRentDetails = getCommonCard({
  header: groundRentHeader,
  detailsContainer: getCommonContainer({
      groundRent: getTextField(groundRentField),
      groundRentGenerationType: getSelectField(groundRentGenerationTypeField),
      startingDateForGroundRent: getDateField(startingDateForGroundRentField),
      startingDateForGroundRent: getDateField(startingDateForGroundRentField),
      rentRevision1to33: getTextField(rentRevision1to33Field),
      rentRevision34to66: getTextField(rentRevision34to66Field),
      rentRevision67to99: getTextField(rentRevision67to99Field),
  })
})

const licenseFeeHeader = getCommonTitle({
  labelName: "License Fee Details",
  labelKey: "EST_LICENSE_FEE_HEADER"
}, {
  style: {
      marginBottom: 18,
      marginTop: 18
  }
})

export const licenseFeeDetails = getCommonCard({
  header: licenseFeeHeader,
  detailsContainer: getCommonContainer({
      licenseFee: getTextField(licenseFeeField),
      startingDateForLicenseFee: getDateField(startingDateForLicenseFeeField),
      leasePeriod: getSelectField(leasePeriodField)
  })
})

const otherPaymentDetailsHeader = getCommonTitle({
  labelName: "Other Payment Details",
  labelKey: "EST_OTHER_PAYMENT_DETAILS_HEADER"
}, {
  style: {
      marginBottom: 18,
      marginTop: 18
  }
})

export const otherPaymentDetails = getCommonCard({
  header: otherPaymentDetailsHeader,
  detailsContainer: getCommonContainer({
      advanceRent: getTextField(advancedRentField)
  })
})