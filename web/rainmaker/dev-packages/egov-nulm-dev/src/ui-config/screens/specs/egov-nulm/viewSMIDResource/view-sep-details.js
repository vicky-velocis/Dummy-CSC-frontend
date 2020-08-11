import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const gotoCreatePage = (state, dispatch) => {
   const createUrl = `/egov-nulm/create-sep?step=0`;
  dispatch(setRoute(createUrl));
};

export const getSEPDetailsView = (isReview = true) => {
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
            labelName: "View SMID",
            labelKey: "NULM_APPLICATION_FOR_VIEW_SMID_PROGRAM"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
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
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: gotoCreatePage
          }
        }
      }
    },
    viewOne: getCommonContainer({
      caste: getLabelWithValue(
        {
          labelName: "Caste of Applicant",
          labelKey: "NULM_SMID_CASTE_OF_APPLICANT",
        },
        { jsonPath: "NULMSEPRequest.name" }
      ),
      isUrbanPoor: getLabelWithValue(
        {
          labelName: "Urban Poor",
          labelKey: "NULM_SMID_URBAN_POOR"
        },
        { jsonPath: "NULMSEPRequest.gender" }
      ),
      bplNo: getLabelWithValue(
        {
          labelName: "BPL NULM_SMID_BPL_NUMBER",
          labelKey: "NULM_SMID_BPL_NUMBER"
        },
        { jsonPath: "NULMSEPRequest.age" }
      ),
      
      pwd: getLabelWithValue(
        {
          labelName: "PWD",
          labelKey: "NULM_SMID_PWD"
        },
        { jsonPath: "NULMSEPRequest.dob" }
      ),

      nameofApplicant: getLabelWithValue(
        {
          labelName: "Name of Applicant",
          labelKey: "NULM_SMID_NAME_OF_APPLICANT"
        },
        { jsonPath: "NULMSEPRequest.adharNo" }
      ),

      qualification: getLabelWithValue(
        {
          labelName: "Select Qualification",
          labelKey: "NULM_SMID_QUALIFACATION"
        },
        { jsonPath: "NULMSEPRequest.motherName" }
      ),


      fatherSpoucename: getLabelWithValue(
        {
          labelName: "Father/Spouse Name",
          labelKey: "NULM_SMID_FATHER/SPOUSE_NAME"
        },
        { jsonPath: "NULMSEPRequest.fatherOrHusbandName" }
      ),


      dateofbirth: getLabelWithValue(
        {
          labelName: "Date Of Birth",
          labelKey: "NULM_SMID_DOB"
        },
        { jsonPath: "NULMSEPRequest.occupation" }
      ),

      emailId: getLabelWithValue(
        {
          labelName: "Email Id",
          labelKey: "NULM_SMID_EMAIL_ID"
        },
        { jsonPath: "NULMSEPRequest.address" }
      ),

      mobilenumber: getLabelWithValue(
        {
          labelName: "Mobile Number",
          labelKey: "NULM_SMID_MOBILE_NUMBER"
        },
        { jsonPath: "NULMSEPRequest.contact" }
      ),

      phonenumber: getLabelWithValue(
        {
          labelName: "Phone Number",
          labelKey: "NULM_SMID_PHONE_NUMBER"
        },
        { jsonPath: "NULMSEPRequest.sinceHowLongInChandigarh" }
      ),

      mothername: getLabelWithValue(
        {
          labelName: "Mother Name",
          labelKey: "NULM_SMID_MOTHER_NAME"
        },
        { jsonPath: "NULMSEPRequest.qualification" }
      ),

      address: getLabelWithValue(
        {
          labelName: "Addrss",
          labelKey: "NULM_SMID_ADDRESS"
        },
        { jsonPath: "NULMSEPRequest.category" }
      ),
      gender: getLabelWithValue(
        {
          labelName: "Gender",
          labelKey: "NULM_SMID_GENDER"
        },
        { jsonPath: "NULMSEPRequest.isUrbanPoor" }
      ),
      isMinority: getLabelWithValue(
        {
          labelName: "Minority",
          labelKey: "NULM_SMID_MINORITY"
        },
        { jsonPath: "NULMSEPRequest.bplNo" }
      ),
      minority: getLabelWithValue(
        {
          labelName: "Minority",
          labelKey: "NULM_SEP_MINORITY"
        },
        { jsonPath: "NULMSEPRequest.isMinority" }
      ),
      minority: getLabelWithValue(
        {
          labelName: "Minority Religion",
          labelKey: "NULM_SMID_MINORITY_RELIGION"
        },
        { jsonPath: "NULMSEPRequest.minority" }
      ),
      wardno: getLabelWithValue(
        {
          labelName: "Ward No",
          labelKey: "NULM_SMID_WARD_NO"
        },
        { jsonPath: "NULMSEPRequest.isHandicapped" }
      ),
      adharNo: getLabelWithValue(
        {
          labelName: "Adhar Number",
          labelKey: "NULM_SMID_ADHAR_NUMBER"
        },
        { jsonPath: "NULMSEPRequest.typeOfBusinessToBeStarted" }
      ),
      nameasperadharNo: getLabelWithValue(
        {
          labelName: "Name as per Adhar",
          labelKey: "NULM_SMID_NAME_AS_PER_ADHAR"
        },
        { jsonPath: "NULMSEPRequest.previousExperience" }
      ),
      acknowledgementNo: getLabelWithValue(
        {
          labelName: "Adhar Acknowledgement Number",
          labelKey: "NULM_SMID_ADHAR_ACKNOWLEDGEMENT_NUMBER"
        },
        { jsonPath: "NULMSEPRequest.placeOfWork" }
      ),

      insurance: getLabelWithValue(
        {
          labelName: "Insurance",
          labelKey: "NULM_SMID_INSURANCE"
        },
        { jsonPath: "NULMSEPRequest.bankDetails" }
      ),
      insuranceThrough: getLabelWithValue(
        {
          labelName: "Insurance through",
          labelKey: "NULM_SMID_INSURANCE_THROUGH"
        },
        { jsonPath: "NULMSEPRequest.noOfFamilyMembers" }
      ),
      streetVendor: getLabelWithValue(
        {
          labelName: "Street vendor",
          labelKey: "NULM_SMID_STREET_VENDOR"
        },
        { jsonPath: "NULMSEPRequest.projectCost" }
      ),
      homeless: getLabelWithValue(
        {
          labelName: "Homeless",
          labelKey: "NULM_SMID_HOMELESS"
        },
        { jsonPath: "NULMSEPRequest.loanAmount" }
      ),
     
    }),
  });
};
