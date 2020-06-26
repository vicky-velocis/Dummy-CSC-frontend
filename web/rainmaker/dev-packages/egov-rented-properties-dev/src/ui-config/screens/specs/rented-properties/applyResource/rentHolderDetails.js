import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTodaysDateInYMD } from "../../utils";
import get from "lodash/get";

const rentHolderHeader = getCommonTitle(
    {
        abelName: "Rent holder Particulars",
        labelKey: "RP_RENT_HOLDER_PARTICULAR_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )

export const getGenderLabel = {
    uiFramework: "custom-containers",
    componentPath: "RadioGroupContainer",
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    },
    jsonPath: "Properties[0].owners[0].gender",
    props: {
      label: {
        name: "Gender",
        key: "TL_COMMON_GENDER_LABEL"
      },
      buttons: [
        {
            labelName: "Male",
            labelKey: "COMMON_MALE",
            value: "MALE"
        },
        {
            label: "Female",
            labelKey: "COMMON_FEMALE",
            value: "FEMALE"
        }
      ],
      jsonPath:"Properties[0].owners[0].gender",
      required: true
    },
    required: true,
    type: "array"
  };

const ownerNameField = {
    label: {
        labelName: "Owner Name",
        labelKey: "RP_OWNER_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Owner Name",
        labelKey: "RP_OWNER_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    jsonPath: "Properties[0].owners[0].name"
  }

const phoneNumberConfig = {
    label: {
        labelName: "Mobile No.",
        labelKey: "RP_MOBILE_NO_LABEL"
    },
    placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "RP_MOBILE_NO_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    pattern: getPattern("MobileNo"),
}  

const phoneNumberField = {
    ...phoneNumberConfig,
    jsonPath: "Properties[0].owners[0].phone"
  }

const dobFieldConfig = {
    label: {
        labelName: "Date of Birth",
        labelKey: "RP_DATE_BIRTH_LABEL"
    },
    placeholder: {
        labelName: "Enter Date of Birth",
        labelKey: "RP_DATE_BIRTH_PLACEHOLDER"
    },
    required: true,
    pattern: getPattern("Date"),
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
}  

const dobField = {
    ...dobFieldConfig,
    jsonPath: "Properties[0].owners[0].dateOfBirth",
}

const emailConfig = {
    label: {
        labelName: "Email",
      labelKey: "RP_OWNER_DETAILS_EMAIL_LABEL"
    },
    placeholder: {
        labelName: "Enter Email",
        labelKey: "RP_OWNER_DETAILS_EMAIL_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    pattern: getPattern("Email"),
}

const emailField = {
    ...emailConfig,
    jsonPath: "Properties[0].owners[0].email"
  }

const aadharFieldConfig = {
    label: {
        labelName: "Aadhar Number",
        labelKey: "RP_AADHAR_LABEL"
    },
    placeholder: {
        labelName: "Enter Aadhar Number",
        labelKey: "RP_AADHAR_NUMBER_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
}

const aadharField = {
   ...aadharFieldConfig,
    jsonPath: "Properties[0].owners[0].aadhaarNumber"
}

const getRentHolderDetails = () => {
    return {
        header: rentHolderHeader,
        detailsContainer: getCommonContainer({
            ownerName: getTextField(ownerNameField),
            phone: getTextField(phoneNumberField),
            dob: getDateField(dobField),
            gender: getGenderLabel,
            email: getTextField(emailField),
            aadhar: getTextField(aadharField)
        })
    }
}

const applicantNameField = {
    label: {
        labelName: "Applicant Name",
        labelKey: "RP_APPLICANT_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Applicant Name",
        labelKey: "RP_APPLICANT_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    jsonPath: "OwnerShipLicenses[0].owners[0].name"
}


const applicantphoneNumberField = {
    ...phoneNumberConfig,
    jsonPath: "OwnerShipLicenses[0].owners[0].phone"
}

const applicantDobField = {
    ...dobFieldConfig,
    jsonPath: "OwnerShipLicenses[0].owners[0].phone"
}

export const  applicantGenderLabel = {
    uiFramework: "custom-containers",
    componentPath: "RadioGroupContainer",
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    },
    jsonPath: "OwnerShipLicenses[0].owners[0].gender",
    props: {
      label: {
        name: "Gender",
        key: "TL_COMMON_GENDER_LABEL"
      },
      buttons: [
        {
            labelName: "Male",
            labelKey: "COMMON_MALE",
            value: "MALE"
        },
        {
            label: "Female",
            labelKey: "COMMON_FEMALE",
            value: "FEMALE"
        }
      ],
      jsonPath:"OwnerShipLicenses[0].owners[0].gender",
      required: true
    },
    required: true,
    type: "array"
};

const applicantEmailField = {
    ...emailConfig,
    jsonPath: "OwnerShipLicenses[0].owners[0].email"
}

const applicantAadharField = {
    ...aadharFieldConfig,
     jsonPath: "OwnerShipLicenses[0].owners[0].aadhaarNumber"
}

const applicantAddressField = {
    label: {
        labelName: "Applicant Correspondence Address",
        labelKey: "RP_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
    },
    placeholder: {
        labelName: "Enter Applicant Correspondence Address",
        labelKey: "RP_APPLICANT_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    jsonPath: "OwnerShipLicenses[0].owners[0].correspondenceAddress"
}

const getApplicantDetails = () => {
    return {
        header: rentHolderHeader,
        detailsContainer: getCommonContainer({
            ownerName: getTextField(applicantNameField),
            phone: getTextField(applicantphoneNumberField),
            dob: getDateField(applicantDobField),
            gender: applicantGenderLabel,
            email: getTextField(applicantEmailField),
            aadhar: getTextField(applicantAadharField),
            aadhar: getTextField(applicantAddressField)
        })
    }
}


export const applicantDetails = getCommonCard(getApplicantDetails())


export const rentHolderDetails = getCommonCard(getRentHolderDetails())