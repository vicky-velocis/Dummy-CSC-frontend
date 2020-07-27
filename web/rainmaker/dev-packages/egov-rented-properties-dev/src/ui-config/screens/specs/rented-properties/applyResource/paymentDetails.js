import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTodaysDateInYMD } from "../../utils";

const paymentHeader = getCommonTitle(
    {
        labelName: "Payment Details",
        labelKey: "RP_PAYMENT_DETAILS_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )

const paymentAmountField = {
    label: {
        labelName: "Payment Amount",
        labelKey: "RP_PAYMENT_AMOUNT_LABEL"
    },
    placeholder: {
        labelName: "Enter Payment Amount",
        labelKey: "RP_PAYMENT_AMOUNT"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].amountPaid"
  }

const paymentDateField = {
    label: {
        labelName: "Date of Payment",
        labelKey: "RP_DATE_PAYMENT_LABEL"
    },
    placeholder: {
        labelName: "Enter Date of Payment",
        labelKey: "RP_DATE_PAYEMNT_PLACEHOLDER"
    },
    // required: true,
    pattern: getPattern("Date"),
    jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].paymentDate",
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }

const paymentModeField = {
    label: {
        labelName: "Payment Mode",
        labelKey: "RP_PAYMENT_MODE_LABEL"
    },
    placeholder: {
        labelName: "Enter Payment Mode",
        labelKey: "RP_PAYMENT_MODE_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].paymentMode"
  }


  const paymentAmountFieldNotice = {
    label: {
        labelName: "Payment Amount",
        labelKey: "RP_PAYMENT_AMOUNT_LABEL"
    },
    placeholder: {
        labelName: "Enter Payment Amount",
        labelKey: "RP_PAYMENT_AMOUNT"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].amountPaid"
  }
  const demandNoticeFromDate = {
    label: {
        labelName: "Demand Notice First Date",
        labelKey: "RP_DEMAND_NOTICE_FIRST_DATE"
    },
    placeholder: {
        labelName: "Demand Notice First Date",
        labelKey: "RP_DEMAND_DATE_PLACEHOLDER"
    },
    required: true,
    pattern: getPattern("Date"),
    jsonPath: "Properties[0].owners[0].ownerDetails.demandStartdate",
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }

  const demandNoticeLastDate = {
    label: {
        labelName: "Demand Notice Last Date",
        labelKey: "RP_DEMAND_NOTICE_LAST_DATE"
    },
    placeholder: {
        labelName: "Demand Notice Last Date",
        labelKey: "RP_DEMAND_DATE_PLACEHOLDER"
    },
    required: true,
    pattern: getPattern("Date"),
    jsonPath: "Properties[0].owners[0].ownerDetails.demandlastdate",
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }
  const recoveryType = {
    label: {
        labelName: "Recovery Type",
        labelKey: "RP_RECOVERY_TYPE"
    },
    placeholder: {
        labelName: "Enter Recovery Type",
        labelKey: "RP_RECOVERY_TYPE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "Properties[0].colony",
    optionValue: "code",
    optionLabel: "label",
    sourceJsonPath: "applyScreenMdmsData.propertyTypes",
    gridDefination: {
        xs: 12,
        sm: 6
    },
}

const getPaymentDetails = () => {
    return {
        header: paymentHeader,
        detailsContainer: getCommonContainer({
            paymentAmount: getTextField(paymentAmountField),
            paymentDate: getDateField(paymentDateField),
            paymentMode: getTextField(paymentModeField)
        })
    }
}

const getPaymentDetailsNotice = () => {
    return {
        header: paymentHeader,
        detailsContainer: getCommonContainer({
            
            demandNoticeFromDate: getDateField(demandNoticeFromDate),
            demandNoticeLastDate: getDateField(demandNoticeLastDate),
            recoveryType: getSelectField(recoveryType),
            paymentAmount: getTextField(paymentAmountFieldNotice),
        })
    }
}

export const paymentDetails = getCommonCard(getPaymentDetails())
export const paymentDetailsNotice=getCommonCard(getPaymentDetailsNotice())