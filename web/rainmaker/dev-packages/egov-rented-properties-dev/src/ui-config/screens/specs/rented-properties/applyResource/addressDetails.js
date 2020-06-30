import { getCommonCard, getSelectField, getTextField, getDateField, getCommonTitle, getPattern, getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTodaysDateInYMD } from "../../utils";
import get from "lodash/get";
import { transitNumberConfig } from '../applyResource/propertyDetails'

const addressHeader = getCommonTitle(
    {
        labelName: "Address Details",
        labelKey: "RP_ADDRESS_DETAILS_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )

export const areaField = {
    label: {
        labelName: "Area",
        labelKey: "RP_AREA_LABEL"
    },
    placeholder: {
        labelName: "Enter Area",
        labelKey: "RP_AREA_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
  }

export const districtField = {
    label: {
        labelName: "District",
        labelKey: "RP_DISTRICT_LABEL"
    },
    placeholder: {
        labelName: "Enter District",
        labelKey: "RP_DISTRICT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
  }

export const stateField = {
    label: {
        labelName: "State",
        labelKey: "RP_STATE_LABEL"
    },
    placeholder: {
        labelName: "Enter State",
        labelKey: "RP_STATE_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
  }

export const countryField = {
    label: {
        labelName: "Country",
        labelKey: "RP_COUNTRY_LABEL"
    },
    placeholder: {
        labelName: "Enter Country",
        labelKey: "RP_COUNTRY_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    // minLength: 1,
    // maxLength: 100,
    // required: true,
  }

export const landmarkField = {
    label: {
        labelName: "Landmark",
        labelKey: "RP_LANDMARK_LABEL"
    },
    placeholder: {
        labelName: "Enter Landmark",
        labelKey: "RP_LANDMARK_PLACEHOLDER"
    },
    // required: true,
    optionValue: "code",
    optionLabel: "label",
    gridDefination: {
        xs: 12,
        sm: 6
    }
  }

export const pincodeField = {
    label: {
        labelName: "Pincode",
        labelKey: "RP_PINCODE_LABEL"
    },
    placeholder: {
        labelName: "Enter Pincode",
        labelKey: "RP_PINCODE_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
  }

const getAddressDetails = () => {
    return {
        header: addressHeader,
        detailsContainer: getCommonContainer({
            area: getTextField({...areaField, jsonPath: "Properties[0].propertyDetails.address.area"}),
            district: getTextField({...districtField, jsonPath: "Properties[0].propertyDetails.address.district"}),
            state: getTextField({...stateField, jsonPath: "Properties[0].propertyDetails.address.state"}),
            country: getTextField({...countryField, jsonPath: "Properties[0].propertyDetails.address.country"}),
            pincode: getTextField({...pincodeField, jsonPath: "Properties[0].propertyDetails.address.pincode"}),
            landmark: getTextField({...landmarkField, jsonPath: "Properties[0].propertyDetails.address.landmark",})
        })
    }
}

const areaNameField = {
    label: {
        labelName: "Area Name",
        labelKey: "RP_AREA_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Area Name",
        labelKey: "RP_AREA_NAME_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true,
    jsonPath: "OwnerShipLicenses[0].propertyDetails.address.areaName"
}

const ownershipTransitNumberField = {
    ...transitNumberConfig,
    jsonPath: "OwnerShipLicenses[0].propertyDetails.address.ownershipTransitNumber"
}

const getOwnershipAddressDetails = () => {
    return {
        header: addressHeader,
        detailsContainer: getCommonContainer({
            areaName: getTextField(areaNameField),
            ownershipTransitNumber: getTextField(ownershipTransitNumberField),
        })
    }
}




 


export const addressDetails = getCommonCard(getAddressDetails())
export const ownershipAddressDetails = getCommonCard(getOwnershipAddressDetails())
