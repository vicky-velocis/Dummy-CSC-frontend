import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getDivider,
    getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { convertEpochToDate, calculateAge, getLicensePeriod } from "../../utils";
import { RC_PEDAL_RICKSHAW_LOADING_REHRI, DL_PEDAL_RICKSHAW_LOADING_REHRI, LICENSE_DHOBI_GHAT, RENEWAL_RENT_DEED_SHOP } from "../../../../../ui-constants";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import { changeStep } from "./footer";

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
                {
                    labelName: "Colony",
                    labelKey: "RP_COLONY_LABEL"
                },
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
                { jsonPath: "Properties[0].owners[0].allotmentStartdate" }
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
                { jsonPath: "Properties[0].owners[0].posessionStartdate" }
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
                    { jsonPath: "Properties[0].owners[0].name" }
                ),
                ownerMobile: getLabelWithValue(
                    {
                        labelName: "Mobile No",
                        labelKey: "RP_MOBILE_NO_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].phone" }
                ),
                ownerDob: getLabelWithValue(
                    {
                        labelName: "Date of Birth",
                        labelKey: "RP_DATE_BIRTH_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].dateOfBirth" }
                ),
                ownerGender: getLabelWithValue(
                    {
                        labelName: "Gender",
                        labelKey: "TL_COMMON_GENDER_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].gender" }
                ),
                ownerEmail: getLabelWithValue(
                    {
                        labelName: "Email",
                        labelKey: "RP_OWNER_DETAILS_EMAIL_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].email" }
                ),
                ownerAadhaarNo: getLabelWithValue(
                    {
                        labelName: "Aadhar Number",
                        labelKey: "RP_AADHAR_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].aadhaarNumber" }
                )
        })
    })
}

export const getReviewOwnerAddress = (isEditable = true) => {
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
                    {
                        labelName: "Area",
                        labelKey: "RP_AREA_LABEL"
                    },
                    { jsonPath: "Properties[0].propertyDetails.address.area" }
                ),
                district: getLabelWithValue(
                    {
                        labelName: "District",
                        labelKey: "RP_DISTRICT_LABEL"
                    },
                    { jsonPath: "Properties[0].propertyDetails.address.district" }
                ),
                state: getLabelWithValue(
                    {
                        labelName: "State",
                        labelKey: "RP_STATE_LABEL"
                    },
                    { jsonPath: "Properties[0].propertyDetails.address.state" }
                ),
                country: getLabelWithValue(
                    {
                        labelName: "Country",
                        labelKey: "RP_COUNTRY_LABEL"
                    },
                    { jsonPath: "Properties[0].propertyDetails.address.country" }
                ),
                pincode: getLabelWithValue(
                    {
                        labelName: "Pincode",
                        labelKey: "RP_PINCODE_LABEL"
                    },
                    { jsonPath: "Properties[0].propertyDetails.address.pincode" }
                ),
                landmark: getLabelWithValue(
                    {
                        labelName: "Landmark",
                        labelKey: "RP_LANDMARK_LABEL"
                    },
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
                    { jsonPath: "Properties[0].owners[0].monthlyRent" }
                ),
                revisionPeriod: getLabelWithValue(
                    {
                        labelName: "Rent Amount Revised Period",
                        labelKey: "RP_RENT_AMOUNT_REVISED_PERIOD_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].revisionPeriod" }
                ),
                revisionPercentage: getLabelWithValue(
                    {
                        labelName: "Rent Amount Revision Percentage",
                        labelKey: "RP_RENT_AMOUNT_REVISED_PERCENTAGE_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].revisionPercentage" }
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
                    { jsonPath: "Properties[0].owners[0].payment[0].amountPaid" }
                ),
                paymentDate: getLabelWithValue(
                    {
                        labelName: "Date of Payment",
                        labelKey: "RP_DATE_PAYMENT_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].payment[0].paymentDate" }
                ),
                paymentMode: getLabelWithValue(
                    {
                        labelName: "Payment Mode",
                        labelKey: "RP_PAYMENT_MODE_LABEL"
                    },
                    { jsonPath: "Properties[0].owners[0].payment[0].paymentMode" }
                ),
        })
    })
}
