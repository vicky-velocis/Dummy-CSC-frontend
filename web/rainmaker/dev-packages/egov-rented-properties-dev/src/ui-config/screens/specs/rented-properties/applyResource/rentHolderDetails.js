import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTodaysDateInYMD } from "../../utils";
import get from "lodash/get";
import { areaField, districtField, stateField, countryField, pincodeField, landmarkField } from "./addressDetails";

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
    jsonPath: "Properties[0].owners[0].ownerDetails.gender",
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
      jsonPath:"Properties[0].owners[0].ownerDetails.gender",
      required: true
    },
    required: true,
    type: "array"
  };


export const getRelationshipRadioButton = {
    uiFramework: "custom-containers",
    componentPath: "RadioGroupContainer",
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    },
    jsonPath: "Properties[0].owners[0].ownerDetails.relationship",
    props: {
      label: {
        name: "Relationship",
        key: "TL_COMMON_RELATIONSHIP_LABEL"
      },
      buttons: [
        {
          labelName: "Father",
          labelKey: "COMMON_RELATION_FATHER",
          value: "FATHER"
        },
        {
          label: "Husband",
          labelKey: "COMMON_RELATION_HUSBAND",
          value: "HUSBAND"
        }
      ],
      jsonPath:"Properties[0].owners[0].ownerDetails.relationship",
      required: true
    },
    required: true,
    type: "array"
  };

const fatherOrHusbandsNameField = {
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
    minLength: 1,
    maxLength: 100,
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.fatherOrHusbandName"
}

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
    jsonPath: "Properties[0].owners[0].ownerDetails.name"
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
    jsonPath: "Properties[0].owners[0].ownerDetails.phone",
    ...phoneNumberConfig,

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
    jsonPath: "Properties[0].owners[0].ownerDetails.dateOfBirth",
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
    jsonPath: "Properties[0].owners[0].ownerDetails.email"

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
    // minLength: 1,
    // maxLength: 100,
    // required: true,
}

const aadharField = {
    ...aadharFieldConfig,
    jsonPath: "Properties[0].owners[0].ownerDetails.aadhaarNumber"
}

const colonyField = {
    label: {
        labelName: "Colony",
        labelKey: "RP_COLONY_LABEL"
    },
    placeholder: {
        labelName: "Enter Colony",
        labelKey: "RP_COLONY_PLACEHOLDER"
    },
    required: true,
    jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.colony",
    optionValue: "code",
    optionLabel: "label",
    sourceJsonPath: "applyScreenMdmsData.propertyTypes",
    gridDefination: {
        xs: 12,
        sm: 6
    }
}

const getRentHolderDetails = () => {
    return {
        header: rentHolderHeader,
        detailsContainer: getCommonContainer({
            ownerName: getTextField(ownerNameField),
            phone: getTextField(phoneNumberField),
            dob: getDateField(dobField),
            gender: getGenderLabel,
            fatherOrHusbandsName:getTextField(fatherOrHusbandsNameField),
            relationShip: getRelationshipRadioButton,
            email: getTextField(emailField),
            aadhar: getTextField(aadharField),
            colony: getSelectField(colonyField),
            area: getTextField({...areaField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.area"}),
            district: getTextField({...districtField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.district"}),
            state: getTextField({...stateField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.state"}),
            country: getTextField({...countryField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.country"}),
            pincode: getTextField({...pincodeField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.pincode"}),
            landmark: getTextField({...landmarkField, jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.landmark"})
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