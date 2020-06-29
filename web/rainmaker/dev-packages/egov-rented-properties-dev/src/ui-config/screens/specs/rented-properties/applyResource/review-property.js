import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getDivider,
    getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDate, } from "../../utils";
import { changeStep } from "./footer";

const areaLabel = {
    labelName: "Area",
    labelKey: "RP_AREA_LABEL"
}

const districtLabel = {
    labelName: "District",
    labelKey: "RP_DISTRICT_LABEL"
}

const stateLabel = {
    labelName: "State",
    labelKey: "RP_STATE_LABEL"
}

const countryLabel = {
    labelName: "Country",
    labelKey: "RP_COUNTRY_LABEL"
}

const pincodeLabel = {
    labelName: "Pincode",
    labelKey: "RP_PINCODE_LABEL"
}

const landmarkLabel = {
    labelName: "Landmark",
    labelKey: "RP_LANDMARK_LABEL"
}

const colonyLabel = {
    labelName: "Colony",
    labelKey: "RP_COLONY_LABEL"
}

export const getReviewProperty = (isEditable = true) => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader({
                        labelName: "Property Details",
                        labelKey: "RP_PROPERTY_DETAILS_HEADER"
                    })
                },
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    visible: isEditable,
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: getLabel({
                            labelName: "Edit",
                            labelKey: "TL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch) => {
                            changeStep(state, dispatch, "", 0);
                        }
                    }
                }
            }
        },
        viewFour: getCommonContainer({
            propertyColony: getLabelWithValue(
                colonyLabel,
                { jsonPath: "Properties[0].colony" }
            ),
            propertyTransitNumber: getLabelWithValue(
                {
                    labelName: "Transit Site/Plot number",
                    labelKey: "RP_SITE_PLOT_LABEL"
                },
                { jsonPath: "Properties[0].transitNumber" }
            ),
            propertyArea: getLabelWithValue(
                {
                    labelName: "Area of the property",
                    labelKey: "RP_AREA_PROPERTY_LABEL"
                },
                { jsonPath: "Properties[0].propertyDetails.area" }
            ),
            allotementDate: getLabelWithValue(
                {
                    labelName: "Date of Allotment",
                    labelKey: "RP_ALLOTMENT_DATE_LABEL"
                },
                { jsonPath: "Properties[0].owners[0].ownerDetails.allotmentStartdate", 
                callBack: convertEpochToDate
            }
            ),
            allotementNumber: getLabelWithValue(
                {
                    labelName: "Allotment Number",
                    labelKey: "RP_ALLOTMENT_NUMBER_LABEL"
                },
                { jsonPath: "Properties[0].owners[0].allotmenNumber" }
            ),
            possessionDate: getLabelWithValue(
                {
                    labelName: "Date of Possession",
                    labelKey: "RP_POSSESSION_DATE_LABEL"
                },
                { jsonPath: "Properties[0].owners[0].ownerDetails.posessionStartdate",
                callBack: convertEpochToDate
            }
            ),
        })
    })
}

export const getReviewOwner = (isEditable = true) => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader({
                        labelName: "Owner Details",
                        labelKey: "TL_OWNER_DETAILS_HEADER"
                    })
                },
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    visible: isEditable,
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: getLabel({
                            labelName: "Edit",
                            labelKey: "TL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch) => {
                            changeStep(state, dispatch, "", 0);
                        }
                    }
                }
            }
        },
        viewFour: getCommonContainer({
                ownerName: getLabelWithValue(
                    {
                        labelName: "Owner Name",
                        labelKey: "RP_OWNER_NAME_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.name" }
                ),
                ownerMobile: getLabelWithValue(
                    {
                        labelName: "Mobile No",
                        labelKey: "RP_MOBILE_NO_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.phone" }
                ),
                ownerDob: getLabelWithValue(
                    {
                        labelName: "Date of Birth",
                        labelKey: "RP_DATE_BIRTH_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.dateOfBirth",callBack: convertEpochToDate }
                ),
                ownerGender: getLabelWithValue(
                    {
                        labelName: "Gender",
                        labelKey: "TL_COMMON_GENDER_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.gender" }
                ),
                ownerEmail: getLabelWithValue(
                    {
                        labelName: "Email",
                        labelKey: "RP_OWNER_DETAILS_EMAIL_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.email" }
                ),
                ownerAadhaarNo: getLabelWithValue(
                    {
                        labelName: "Aadhar Number",
                        labelKey: "RP_AADHAR_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.aadhaarNumber" }
                ),
                ownerColony: getLabelWithValue(
                    colonyLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.colony"}
                ),
                ownerArea: getLabelWithValue(
                    areaLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.area"}
                ),
                ownerDistrict: getLabelWithValue(
                    districtLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.district"}
                ),
                ownerState: getLabelWithValue(
                    stateLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.state"}
                ),
                ownerCountry: getLabelWithValue(
                    countryLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.country"}
                ),
                ownerPincode: getLabelWithValue(
                    pincodeLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.pincode"}
                ),
                ownerLandmark: getLabelWithValue(
                    landmarkLabel,
                    {jsonPath: "Properties[0].owners[0].ownerDetails.correspondenceAddress.landmark"}
                ),
                
        })
    })
}

export const getReviewAddress = (isEditable = true) => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader({
                        labelName: "Address Details",
                        labelKey: "RP_ADDRESS_DETAILS_HEADER"
                    })
                },
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    visible: isEditable,
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: getLabel({
                            labelName: "Edit",
                            labelKey: "TL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch) => {
                            changeStep(state, dispatch, "", 0);
                        }
                    }
                }
            }
        },
        viewFour: getCommonContainer({
                area: getLabelWithValue(
                    areaLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.area" }
                ),
                district: getLabelWithValue(
                    districtLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.district" }
                ),
                state: getLabelWithValue(
                    stateLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.state" }
                ),
                country: getLabelWithValue(
                    countryLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.country" }
                ),
                pincode: getLabelWithValue(
                    pincodeLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.pincode" }
                ),
                landmark: getLabelWithValue(
                    landmarkLabel,
                    { jsonPath: "Properties[0].propertyDetails.address.landmark" }
                ),
        })
    })
}

export const getReviewRentDetails = (isEditable = true) => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader({
                        labelName: "Rent Details",
                        labelKey: "RP_RENT_DETAILS_HEADER"
                    })
                },
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    visible: isEditable,
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: getLabel({
                            labelName: "Edit",
                            labelKey: "TL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch) => {
                            changeStep(state, dispatch, "", 0);
                        }
                    }
                }
            }
        },
        viewFour: getCommonContainer({
                monthlyRentAmount: getLabelWithValue(
                    {
                        labelName: "Monthly Rent Amount",
                        labelKey: "RP_MONTHLY_RENT_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.monthlyRent" }
                ),
                revisionPeriod: getLabelWithValue(
                    {
                        labelName: "Rent Amount Revised Period",
                        labelKey: "RP_RENT_AMOUNT_REVISED_PERIOD_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.revisionPeriod" }
                ),
                revisionPercentage: getLabelWithValue(
                    {
                        labelName: "Rent Amount Revision Percentage",
                        labelKey: "RP_RENT_AMOUNT_REVISED_PERCENTAGE_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.revisionPercentage" }
                ),
        })
    })
}

export const getReviewPaymentDetails = (isEditable = true) => {
    return getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    },
                    ...getCommonSubHeader({
                        labelName: "Payment Details",
                        labelKey: "RP_PAYMENT_DETAILS_HEADER"
                    })
                },
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    visible: isEditable,
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: getLabel({
                            labelName: "Edit",
                            labelKey: "TL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: (state, dispatch) => {
                            changeStep(state, dispatch, "", 0);
                        }
                    }
                }
            }
        },
        viewFour: getCommonContainer({
                amountPaid: getLabelWithValue(
                    {
                        labelName: "Payment Amount",
                        labelKey: "RP_PAYMENT_AMOUNT_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].amountPaid" }
                ),
                paymentDate: getLabelWithValue(
                    {
                        labelName: "Date of Payment",
                        labelKey: "RP_DATE_PAYMENT_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].paymentDate", callBack: convertEpochToDate }
                ),
                paymentMode: getLabelWithValue(
                    {
                        labelName: "Payment Mode",
                        labelKey: "RP_PAYMENT_MODE_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].ownerDetails.payment[0].paymentMode" }
                ),
        })
    })
}
