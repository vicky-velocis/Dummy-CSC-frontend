import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

export const groundRentHeader = getCommonTitle({
  labelName: "Ground Rent Details",
  labelKey: "EST_GROUND_RENT_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const dueDateOfPaymentField = {
  label: {
    labelName: "Due Date of Payment",
    labelKey: "EST_DUE_DATE_OF_PAYMENT_LABEL"
  },
  placeholder: {
    labelName: "Enter Due Date of Payment",
    labelKey: "EST_DUE_DATE_OF_PAYMENT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  required: true,
  jsonPath: "Properties[0].paymentDetails.groundRent.dueDateOfPayment",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
}

const payableField = {
  label: {
    labelName: "Payable",
    labelKey: "EST_PAYABLE_LABEL"
  },
  placeholder: {
    labelName: "Enter Payable",
    labelKey: "EST_PAYABLE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.payable"
}

const amountOfGRField = {
  label: {
    labelName: "Amount of GR",
    labelKey: "EST_AMOUNT_OF_GR_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount of GR",
    labelKey: "EST_AMOUNT_OF_GR_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.amountOfGR"
}

const totalGRField = {
  label: {
    labelName: "Total GR",
    labelKey: "EST_TOTAL_GR_LABEL"
  },
  placeholder: {
    labelName: "Enter Total GR",
    labelKey: "EST_TOTAL_GR_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.totalGR"
}

const dateOfDepositField = {
  label: {
    labelName: "Date of Deposit",
    labelKey: "EST_DATE_OF_DEPOSIT_LABEL"
  },
  placeholder: {
    labelName: "Enter Date of Deposit",
    labelKey: "EST_DATE_OF_DEPOSIT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  required: true,
  jsonPath: "Properties[0].paymentDetails.groundRent.dateOfDeposit",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
}

const delayInPaymentField = {
  label: {
    labelName: "Delay in Payment",
    labelKey: "EST_DELAY_IN_PAYMENT_LABEL"
  },
  placeholder: {
    labelName: "Enter Delay in Payment",
    labelKey: "EST_DELAY_IN_PAYMENT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.delayInPayment"
}

const interestForDelayField = {
  label: {
    labelName: "Interest For Delay",
    labelKey: "EST_INTEREST_FOR_DELAY_LABEL"
  },
  placeholder: {
    labelName: "Enter Interest For Delay",
    labelKey: "EST_INTEREST_FOR_DELAY_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.interestForDelay"
}

const totalAmountDueWithInterestField = {
  label: {
    labelName: "Total Amount Due with Interest",
    labelKey: "EST_TOTAL_AMOUNT_DUE_WITH_INTEREST_LABEL"
  },
  placeholder: {
    labelName: "Enter Total Amount Due with Interest",
    labelKey: "EST_TOTAL_AMOUNT_DUE_WITH_INTEREST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.totalAmountDueWithInterest"
}

const amountDepositedGRField = {
  label: {
    labelName: "Amount Desposited GR",
    labelKey: "EST_AMOUNT_DEPOSITED_GR_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Desposited GR",
    labelKey: "EST_AMOUNT_DEPOSITED_GR_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.amountDepositedGR"
}

const amountDepositedInttField = {
  label: {
    labelName: "Amount Desposited Intt",
    labelKey: "EST_AMOUNT_DEPOSITED_INTT_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Desposited Intt",
    labelKey: "EST_AMOUNT_DEPOSITED_INTT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.amountDepositedIntt"
}

const balanceGRField = {
  label: {
    labelName: "Balance(+due, -excess) GR",
    labelKey: "EST_BALANCE_GR_LABEL"
  },
  placeholder: {
    labelName: "Enter Balance(+due, -excess) GR",
    labelKey: "EST_BALANCE_GR_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.balanceGR"
}

const balanceInttField = {
  label: {
    labelName: "Balance(+due, -excess) Intt",
    labelKey: "EST_BALANCE_INTT_LABEL"
  },
  placeholder: {
    labelName: "Enter Balance(+due, -excess) Intt",
    labelKey: "EST_BALANCE_INTT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.balanceIntt"
}

const totalDueField = {
  label: {
    labelName: "Total Due",
    labelKey: "EST_TOTAL_DUE_LABEL"
  },
  placeholder: {
    labelName: "Enter Total Due",
    labelKey: "EST_TOTAL_DUE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.groundRent.totalDue"
}

const receiptNumberAndDateField = {
  label: {
    labelName: "Receipt No. & Date",
    labelKey: "EST_RECEIPT_NUMBER_AND_DATE_LABEL"
  },
  placeholder: {
    labelName: "Enter Receipt No. & Date",
    labelKey: "EST_RECEIPT_NUMBER_AND_DATE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 75,
  jsonPath: "Properties[0].paymentDetails.groundRent.receiptNumberAndDate"
}


export const groundRentDetails = getCommonCard({
  header: groundRentHeader,
  detailsContainer: getCommonContainer({
    dueDateOfPayment: getDateField(dueDateOfPaymentField),
    payable: getTextField(payableField),
    amountOfGR: getTextField(amountOfGRField),
    totalGR: getTextField(totalGRField),
    dateOfDeposit: getDateField(dateOfDepositField),
    delayInPayment: getTextField(delayInPaymentField),
    interestForDelay: getTextField(interestForDelayField),
    totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestField),
    amountDepositedGR: getTextField(amountDepositedGRField),
    amountDepositedIntt: getTextField(amountDepositedInttField),
    balanceGR: getTextField(balanceGRField),
    balanceIntt: getTextField(balanceInttField),
    totalDue: getTextField(totalDueField),
    receiptNumberAndDate: getTextField(receiptNumberAndDateField)
  })
})

export const serviceTaxHeader = getCommonTitle({
  labelName: "Service Tax/GST Details",
  labelKey: "EST_SERVICE_TAX_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const rateOfStOrGstFieldST = {
  label: {
    labelName: "Rate of ST/GST",
    labelKey: "EST_RATE_ST_GST_LABEL"
  },
  placeholder: {
    labelName: "Enter Rate of ST/GST",
    labelKey: "EST_RATE_ST_GST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.rateOfStOrGst"
}

const amountOfGstFieldST = {
  label: {
    labelName: "Amount Of GST",
    labelKey: "EST_AMOUNT_OF_GST_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Of GST",
    labelKey: "EST_AMOUNT_OF_GST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.amountOfGst"
}

const amountDueFieldST = {
  label: {
    labelName: "Amount Due",
    labelKey: "EST_AMOUNT_DUE_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Due",
    labelKey: "EST_AMOUNT_DUE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.amountDue"
}

const dateOfDepositFieldST = {
  label: {
    labelName: "Date of Deposit",
    labelKey: "EST_DATE_OF_DEPOSIT_LABEL"
  },
  placeholder: {
    labelName: "Enter Date of Deposit",
    labelKey: "EST_DATE_OF_DEPOSIT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  required: true,
  jsonPath: "Properties[0].paymentDetails.serviceTax.dateOfDeposit",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
}

const delayInPaymentFieldST = {
  label: {
    labelName: "Delay in Payment",
    labelKey: "EST_DELAY_IN_PAYMENT_LABEL"
  },
  placeholder: {
    labelName: "Enter Delay in Payment",
    labelKey: "EST_DELAY_IN_PAYMENT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.delayInPayment"
}

const interestForDelayFieldST = {
  label: {
    labelName: "Interest For Delay",
    labelKey: "EST_INTEREST_FOR_DELAY_LABEL"
  },
  placeholder: {
    labelName: "Enter Interest For Delay",
    labelKey: "EST_INTEREST_FOR_DELAY_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.interestForDelay"
}

const totalAmountDueWithInterestFieldST = {
  label: {
    labelName: "Total Amount Due with Interest",
    labelKey: "EST_TOTAL_AMOUNT_DUE_WITH_INTEREST_LABEL"
  },
  placeholder: {
    labelName: "Enter Total Amount Due with Interest",
    labelKey: "EST_TOTAL_AMOUNT_DUE_WITH_INTEREST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.totalAmountDueWithInterest"
}

const amountDepositedFieldST = {
  label: {
    labelName: "Amount Deposited ST/GST",
    labelKey: "EST_AMOUNT_DEPOSITED_ST_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Deposited ST/GST",
    labelKey: "EST_AMOUNT_DEPOSITED_ST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.amountDepositedSt"
}

const amountDepositedInttFieldST = {
  label: {
    labelName: "Amount Deposited Intt",
    labelKey: "EST_AMOUNT_DEPOSITED_INTT_ST_LABEL"
  },
  placeholder: {
    labelName: "Enter Amount Deposited Intt",
    labelKey: "EST_AMOUNT_DEPOSITED_INTT_ST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.amountDepositedIntt"
}

const balanceFieldST = {
  label: {
    labelName: "Balance ST/GST",
    labelKey: "EST_BALANCE_ST_LABEL"
  },
  placeholder: {
    labelName: "Enter Balance ST/GST",
    labelKey: "EST_BALANCE_ST_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.balanceSt"
}

const balanceInttFieldST = {
  label: {
    labelName: "Balance Intt",
    labelKey: "EST_BALANCE_INTT_LABEL"
  },
  placeholder: {
    labelName: "Enter Balance Intt",
    labelKey: "EST_BALANCE_INTT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.balanceIntt"
}

const totalDueFieldST = {
  label: {
    labelName: "Total Due",
    labelKey: "EST_TOTAL_DUE_LABEL"
  },
  placeholder: {
    labelName: "Enter Total Due",
    labelKey: "EST_TOTAL_DUE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 15,
  jsonPath: "Properties[0].paymentDetails.serviceTax.totalDue"
}

const receiptNumberAndDateFieldST = {
  label: {
    labelName: "Receipt No. & Date",
    labelKey: "EST_RECEIPT_NUMBER_AND_DATE_LABEL"
  },
  placeholder: {
    labelName: "Enter Total Due",
    labelKey: "EST_RECEIPT_NUMBER_AND_DATE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 75,
  jsonPath: "Properties[0].paymentDetails.serviceTax.receiptNumberAndDate"
}

export const serviceTaxDetails = getCommonCard({
  header: serviceTaxHeader,
  detailsContainer: getCommonContainer({
    rateOfStOrGst: getTextField(rateOfStOrGstFieldST),
    amountOfGst: getTextField(amountOfGstFieldST),
    amountDue: getTextField(amountDueFieldST),
    dateOfDeposit: getDateField(dateOfDepositFieldST),
    delayInPayment: getTextField(delayInPaymentFieldST),
    interestForDelay: getTextField(interestForDelayFieldST),
    totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestFieldST),
    amountDepositedSt: getTextField(amountDepositedFieldST),
    amountDepositedIntt: getTextField(amountDepositedInttFieldST),
    balanceSt: getTextField(balanceFieldST),
    balanceIntt: getTextField(balanceInttFieldST),
    totalDue: getTextField(totalDueFieldST),
    receiptNumberAndDate: getTextField(receiptNumberAndDateFieldST)
  })
})

export const paymentMadeBy = getCommonCard({
  header: "",
  detailsContainer: getCommonContainer({
    paymentMadeBy: getLabelWithValue({
      labelName: "Payment Made By",
      labelKey: "EST_PAYMENT_MADE_BY_LABEL"
    }, 
    {
      jsonPath: "Properties[0].paymentDetails.paymentMadeBy"
    })
  })
})