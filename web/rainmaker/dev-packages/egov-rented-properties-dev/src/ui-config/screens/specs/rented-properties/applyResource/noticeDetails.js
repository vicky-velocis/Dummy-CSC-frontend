import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTodaysDateInYMD } from "../../utils";
import get from "lodash/get";
import { getDetailsFromProperty ,getDuplicateDetailsFromProperty} from "../../../../../ui-utils/apply";




export const transitNumberConfig = {
    label: {
        labelName: "Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_LABEL"
    },
    placeholder: {
        labelName: "Enter Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 25,
    required: true,
}



const transitNumberField = {
    ...transitNumberConfig,
    jsonPath: "Properties[0].transitNumber"
  }



  const allotmentNumberField = {
    label: {
        labelName: "Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_LABEL"
    },
    placeholder: {
        labelName: "Enter Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 3,
    maxLength: 20,
    required: true,
    jsonPath: "Properties[0].owners[0].allotmenNumber"
  }


  const memoDateField = {
    label: {
        labelName: "Memo Date",
        labelKey: "RP_MEMO_DATE_LABEL"
    },
    placeholder: {
        labelName: "Enter Date of Possession",
        labelKey: "RP_MEMO_DATE_PLACEHOLDER"
    },
    required: true,
    pattern: getPattern("Date"),
    jsonPath: "Properties[0].owners[0].ownerDetails.posessionStartdate",
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }





const fatherOrHusbandsName = {
    label: {
        labelName: "Father/ Husband's Name",
        labelKey: "TL_FATHER_OR_HUSBANDS_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Father/ Husband's Name",
        labelKey: "TL_FATHER_OR_HUSBANDS_NAME_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "DuplicateCopyApplications[0].applicant[0].guardian"
}


const originalAllotteField = {
    label: {
        labelName: "Original Allottee",
        labelKey: "RP_ORIGINAL_ALLOTTEE_LABEL"
    },
    placeholder: {
        labelName: "Enter Original Allottee Name",
        labelKey: "RP_ORIGINAL_ALLOTTEE_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.orignalAllottee"
}
const getViolationField = {
    label: {
        labelName: "Violations",
        labelKey: "RP_VIOLATIONS_LABEL"
    },
    placeholder: {
        labelName: "Enter Comments",
        labelKey: "RP_VIOLATIONS_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.violations" 
}
const getEditorField = {
    label: {
        labelName: "Editor",
        labelKey: "RP_Editor_LABEL"
    },
    placeholder: {
        labelName: "Editor",
        labelKey: "RP_Editor_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 4,
    maxLength: 40,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.editor" 
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

const getTransitSiteDetailsNotice = () => {
    return {
      
        detailsContainer: getCommonContainer({
            transitNumber: getTextField(transitNumberField),
            allotmentNumber: getTextField(allotmentNumberField),
            posessionDate: getDateField(memoDateField)
        })
    }
}
const getApplicantDetailsForDuplicateCopyNotice = () => {
    return {

        detailsContainer: getCommonContainer({
        fatherOrHusband:getTextField(fatherOrHusbandsName),
        originalAllotte :getTextField(originalAllotteField),
        violations:getTextField(getViolationField),
        editor : getTextField(getEditorField),
        })
    }
}

const getPaymentDetailsNotice = () => {
    return {

        detailsContainer: getCommonContainer({
            
            demandNoticeFromDate: getDateField(demandNoticeFromDate),
            demandNoticeLastDate: getDateField(demandNoticeLastDate),
            recoveryType: getSelectField(recoveryType),
            paymentAmount: getTextField(paymentAmountFieldNotice),
        })
    }
}


export const transitSiteDetailsNotice= getCommonCard(getTransitSiteDetailsNotice())
export const rentHolderDetailsForDuplicatePropertiesNotice=getCommonCard(getApplicantDetailsForDuplicateCopyNotice())
export const paymentDetailsNotice=getCommonCard(getPaymentDetailsNotice())