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



export const getReviewProperty = () => {
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
                        labelKey: "TL_PROPERTY_DETAILS_HEADER"
                    })
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
            propertyRentedSqYrd: getLabelWithValue(
                {
                    labelName: "Rented Per Sq yard",
                    labelKey: "RP_RENT_AREA_PROPERTY_SQYRD"
                },
                { jsonPath: "Properties[0].propertyDetails.rentPerSqyd" }
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