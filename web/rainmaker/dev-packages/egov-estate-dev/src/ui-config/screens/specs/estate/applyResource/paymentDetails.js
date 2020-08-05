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

const paymentHeader = getCommonTitle({
  labelName: "Payment Details",
  labelKey: "EST_PAYMENT_DETAILS_HEADER"
})

export const groundRentHeader = getCommonTitle({
  labelName: "Ground Rent Details",
  labelKey: "EST_GROUND_RENT_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18,
    width: "100%"
  }
})

const dueDateOfPaymentField = (owner) => {
  return {
    label: {
      labelName: "Due Date of Payment",
      labelKey: "EST_DUE_DATE_OF_PAYMENT_LABEL"
    },
    pattern: getPattern("Date"),
    required: true,
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.dueDateOfPayment`,
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
      }
    }
  }
}

const payableField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.payable`
  }
}

const amountOfGRField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.amountOfGR`
  }
}

const totalGRField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.totalGR`
  }
}

const dateOfDepositField = (owner) => {
  return {
    label: {
      labelName: "Date of Deposit",
      labelKey: "EST_DATE_OF_DEPOSIT_LABEL"
    },
    pattern: getPattern("Date"),
    required: true,
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.dateOfDeposit`,
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
      }
    }
  }
}

const delayInPaymentField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.delayInPayment`
  }
}

const interestForDelayField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.interestForDelay`
  }
}

const totalAmountDueWithInterestField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.totalAmountDueWithInterest`
  }
}

const amountDepositedGRField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.amountDepositedGR`
  }
}

const amountDepositedInttField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.amountDepositedIntt`
  }
}

const balanceGRField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.balanceGR`
  }
}

const balanceInttField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.balanceIntt`
  }
}

const totalDueField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.totalDue`
  }
}

const receiptNumberAndDateField = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].groundRent.receiptNumberAndDate`
  }
}

// export const groundRentDetails = getCommonCard({
//   header: groundRentHeader,
//   detailsContainer: getCommonContainer({
//     dueDateOfPayment: getDateField(dueDateOfPaymentField),
//     payable: getTextField(payableField),
//     amountOfGR: getTextField(amountOfGRField),
//     totalGR: getTextField(totalGRField),
//     dateOfDeposit: getDateField(dateOfDepositField),
//     delayInPayment: getTextField(delayInPaymentField),
//     interestForDelay: getTextField(interestForDelayField),
//     totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestField),
//     amountDepositedGR: getTextField(amountDepositedGRField),
//     amountDepositedIntt: getTextField(amountDepositedInttField),
//     balanceGR: getTextField(balanceGRField),
//     balanceIntt: getTextField(balanceInttField),
//     totalDue: getTextField(totalDueField),
//     receiptNumberAndDate: getTextField(receiptNumberAndDateField)
//   })
// })

export const serviceTaxHeader = getCommonTitle({
  labelName: "Service Tax/GST Details",
  labelKey: "EST_SERVICE_TAX_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18,
    width: "100%"
  }
})

const rateOfStOrGstFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.rateOfStOrGst`
  }
}

const amountOfGstFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.amountOfGst`
  }
}

const amountDueFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.amountDue`
  }
}

const dateOfDepositFieldST = (owner) => {
  return {
    label: {
      labelName: "Date of Deposit",
      labelKey: "EST_DATE_OF_DEPOSIT_LABEL"
    },
    pattern: getPattern("Date"),
    required: true,
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.dateOfDeposit`,
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
      }
    }
  }
}

const delayInPaymentFieldST = (owner) => {
  return {
    label: {
      labelName: "Delay in Payment",
      labelKey: "EST_DELAY_IN_PAYMENT_LABEL"
    },
    gridDefination: {
      xs: 12,
      sm: 6
    },
    required: true,
    minLength: 1,
    maxLength: 15,
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.delayInPayment`
  }
}

const interestForDelayFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.interestForDelay`
  }
}

const totalAmountDueWithInterestFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.totalAmountDueWithInterest`
  }
}

const amountDepositedFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.amountDepositedSt`
  }
}

const amountDepositedInttFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.amountDepositedIntt`
  }
}

const balanceFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.balanceSt`
  }
}

const balanceInttFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.balanceIntt`
  }
}

const totalDueFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.totalDue`
  }
}

const receiptNumberAndDateFieldST = (owner) => {
  return {
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
    jsonPath: `Properties[0].paymentDetails[${owner}].serviceTax.receiptNumberAndDate`
  }
}

// export const serviceTaxDetails = getCommonCard({
//   header: serviceTaxHeader,
//   detailsContainer: getCommonContainer({
//     rateOfStOrGst: getTextField(rateOfStOrGstFieldST),
//     amountOfGst: getTextField(amountOfGstFieldST),
//     amountDue: getTextField(amountDueFieldST),
//     dateOfDeposit: getDateField(dateOfDepositFieldST),
//     delayInPayment: getTextField(delayInPaymentFieldST),
//     interestForDelay: getTextField(interestForDelayFieldST),
//     totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestFieldST),
//     amountDepositedSt: getTextField(amountDepositedFieldST),
//     amountDepositedIntt: getTextField(amountDepositedInttFieldST),
//     balanceSt: getTextField(balanceFieldST),
//     balanceIntt: getTextField(balanceInttFieldST),
//     totalDue: getTextField(totalDueFieldST),
//     receiptNumberAndDate: getTextField(receiptNumberAndDateFieldST)
//   })
// })

const paymentMadeByField = (owner) => {
  return {
    label: {
      labelName: "Payment Made By",
      labelKey: "EST_PAYMENT_MADE_BY_LABEL"
    },
    placeholder: {
      labelName: "Enter Payment Made By",
      labelKey: "EST_PAYMENT_MADE_BY_PLACEHOLDER"
    },
    gridDefination: {
      xs: 12,
      sm: 6
    },
    required: true,
    minLength: 1,
    maxLength: 15,
    jsonPath: `Properties[0].paymentDetails[${owner}].paymentMadeBy`
  }
}

// export const paymentMadeBy = getCommonCard({
//   detailsContainer: getCommonContainer({
//     paymentMadeBy: getTextField(paymentMadeByField)
//   })
// })

export const getPaymentDetails = (owner) => {
  return getCommonCard({
    header: paymentHeader,
    groundRentContainer: getCommonContainer({
      header: groundRentHeader,
      dueDateOfPayment: getDateField(dueDateOfPaymentField(owner)),
      payable: getTextField(payableField(owner)),
      amountOfGR: getTextField(amountOfGRField(owner)),
      totalGR: getTextField(totalGRField(owner)),
      dateOfDeposit: getDateField(dateOfDepositField(owner)),
      delayInPayment: getTextField(delayInPaymentField(owner)),
      interestForDelay: getTextField(interestForDelayField(owner)),
      totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestField(owner)),
      amountDepositedGR: getTextField(amountDepositedGRField(owner)),
      amountDepositedIntt: getTextField(amountDepositedInttField(owner)),
      balanceGR: getTextField(balanceGRField(owner)),
      balanceIntt: getTextField(balanceInttField(owner)),
      totalDue: getTextField(totalDueField(owner)),
      receiptNumberAndDate: getTextField(receiptNumberAndDateField(owner))
    }),
    serviceTaxContainer: getCommonContainer({
      header: serviceTaxHeader,
      rateOfStOrGst: getTextField(rateOfStOrGstFieldST()),
      amountOfGst: getTextField(amountOfGstFieldST()),
      amountDue: getTextField(amountDueFieldST()),
      dateOfDeposit: getDateField(dateOfDepositFieldST()),
      delayInPayment: getTextField(delayInPaymentFieldST()),
      interestForDelay: getTextField(interestForDelayFieldST()),
      totalAmountDueWithInterest: getTextField(totalAmountDueWithInterestFieldST()),
      amountDepositedSt: getTextField(amountDepositedFieldST()),
      amountDepositedIntt: getTextField(amountDepositedInttFieldST()),
      balanceSt: getTextField(balanceFieldST()),
      balanceIntt: getTextField(balanceInttFieldST()),
      totalDue: getTextField(totalDueFieldST()),
      receiptNumberAndDate: getTextField(receiptNumberAndDateFieldST())
    }),
    paymentMadeByContainer: getCommonContainer({
      paymentMadeBy: getTextField(paymentMadeByField())
    })
  })
}