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
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

const rentSummaryHeader = getCommonTitle({
  labelName: "Rent Summary",
  labelKey: "RP_RENT_SUMMARY_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const paymentInfoHeader = getCommonTitle({
  labelName: "Payment Info",
  labelKey: "RP_PAYMENT_INFO_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const principalAmountField = {
  label: {
    labelName: "Principal Amount",
    labelKey: "RP_PRINCIPAL_AMOUNT_LABEL"
  },
  placeholder: {
    labelName: "Principal Amount",
    labelKey: "RP_PRINCIPAL_AMOUNT_LABEL"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  minLength: 4,
  maxLength: 40,
  required: false,
  disabled: true,
  jsonPath: "OfflineRentPayment[0].property.balancePrincipal",
  errorMessage: "",
}

const interestField = {
  label: {
    labelName: "Interest",
    labelKey: "RP_INTEREST_LABEL"
  },
  placeholder: {
    labelName: "Interest",
    labelKey: "RP_INTEREST_LABEL"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  minLength: 4,
  maxLength: 40,
  jsonPath: "OfflineRentPayment[0].property.balanceInterest",
  disabled: true,
  errorMessage: "",
}

const totalField = {
  label: {
    labelName: "Total",
    labelKey: "RP_TOTAL_AMOUNT_LABEL"
  },
  placeholder: {
    labelName: "Total",
    labelKey: "RP_TOTAL_AMOUNT_LABEL"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  minLength: 4,
  maxLength: 40,
  jsonPath: "OfflineRentPayment[0].property.balanceAmount",
  disabled: true,
  errorMessage: "",
}

const outstandingField = {
  label: {
    labelName: "Outstanding",
    labelKey: "RP_OUSTANDING_AMOUNT_LABEL"
  },
  placeholder: {
    labelName: "Outstanding",
    labelKey: "RP_OUSTANDING_AMOUNT_LABEL"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  minLength: 4,
  maxLength: 40,
  jsonPath: "",
  disabled: true,
  errorMessage: "",
}

const amountField = {
  label: {
    labelName: "Amount",
    labelKey: "RP_AMOUNT_LABEL"
  },
  placeholder: {
    labelName: "Please Enter Amount",
    labelKey: "RP_ENTER_AMOUNT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  minLength: 4,
  maxLength: 40,
  jsonPath: "",
  errorMessage: ""
}

const bankNameField = {
  label: {
    labelName: "Bank Name",
    labelKey: "RP_BANK_NAME_LABEL"
  },
  placeholder: {
    labelName: "Please Enter Bank Name",
    labelKey: "RP_ENTER_BANK_NAME_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  maxLength: 40,
  jsonPath: "",
  errorMessage: ""
}

const transactionNumberField = {
  label: {
    labelName: "Transaction/Cheque/DD No",
    labelKey: "RP_TRANSACTION_NUMBER_LABEL"
  },
  placeholder: {
    labelName: "Please Enter Transaction/Cheque/DD No",
    labelKey: "RP_ENTER_TRANSACTION_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  maxLength: 40,
  jsonPath: "",
  errorMessage: ""
}


const getRentSummaryDetails = () => {
  return {
    header: rentSummaryHeader,
    detailsContainer: getCommonContainer({
      principalAmount: getTextField({
        ...principalAmountField,
        jsonPath: "",
        required: false,
        props: {
          ...principalAmountField.props,
          disabled: true
        }
      }),
      interest: getTextField({
        ...interestField,
        jsonPath: "",
        required: false,
        props: {
          ...interestField.props,
          disabled: true
        }
      }),
      total: getTextField({
        ...totalField,
        jsonPath: "",
        required: false,
        props: {
          ...totalField.props,
          disabled: true
        }
      }),
      outstanding: getTextField({
        ...outstandingField,
        jsonPath: "",
        required: false,
        props: {
          ...outstandingField.props,
          disabled: true
        }
      })
    })
  }
}

const getPaymentInfo = () => {
  return {
    header: paymentInfoHeader,
    detailsContainer: getCommonContainer({
      amount: getTextField(amountField),
      bankName: getTextField(bankNameField),
      transactionNumber: getTextField(transactionNumberField)
    })
  }
}



export const rentSummaryDetails = getCommonCard(getRentSummaryDetails())
export const paymentInfo = getCommonCard(getPaymentInfo())