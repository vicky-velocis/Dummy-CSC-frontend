import {
    getCommonCard,
    getSelectField,
    getTextField,
    getDateField,
    getCommonTitle,
    getPattern,
    getCommonContainer,
    getCommonGrayCard
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    prepareFinalObject
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import {
    getTodaysDateInYMD
  } from "../../utils";
  import get from "lodash/get";
  
  export const courtCaseHeader = getCommonTitle({
    labelName: "Court Case Details",
    labelKey: "EST_COURT_CASE_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18,
      marginTop: 18
    }
  })
  
  const schemeName = {
    label: {
        labelName: "Scheme Name",
        labelKey: "EST_ESTATE_SCHEME_NAME_LABEL"
    },
    placeholder: {
        labelName: "Enter Scheme Name",
        labelKey: "EST_ESTATE_SCHEME_NAME_LACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    maxLength: 250,
    jsonPath: "Properties[0].propertyDetails.courtCases[0].estateOfficerCourt"
  }
  
  const dateOfAuction = {
    label: {
        labelName: "Commissioners Court",
        labelKey: "EST_COMMISSIONERS_COURT_LABEL"
    },
    placeholder: {
        labelName: "Enter Commissioners Court",
        labelKey: "EST_COMMISSIONERS_COURT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    maxLength: 250,
    jsonPath: "Properties[0].propertyDetails.courtCases[0].commissionersCourt"
  }
  
  const modeOfAuction = {
    label: {
        labelName: "Chief Administrators Court",
        labelKey: "EST_CHIEF_ADMINISTRATORS_COURT_LABEL"
    },
    placeholder: {
        labelName: "Enter Chief Administrators Court",
        labelKey: "EST_CHIEF_ADMINISTRATORS_COURT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    maxLength: 250,
    jsonPath: "Properties[0].propertyDetails.courtCases[0].chiefAdministartorsCourt"
  }
  
  const emdAmount = {
    label: {
        labelName: "Advisor to Admin Court",
        labelKey: "EST_ADVISOR_TO_ADMIN_COURT_LABEL"
    },
    placeholder: {
        labelName: "Enter Advisor to Admin Court",
        labelKey: "EST_ADVISOR_TO_ADMIN_COURT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    maxLength: 250,
    jsonPath: "Properties[0].propertyDetails.courtCases[0].advisorToAdminCourt"
  }
  
  
  const commonCourtCaseInformation = () => {
    return getCommonGrayCard({
      header: getCommonTitle({
        labelName: "Auction Details",
        labelKey: "EST_ALLOTMENT_AUCTION_DETAILS"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      courtCaseCard: getCommonContainer({
        estateOfficerCourt: getTextField(schemeName),
        commissionersCourt: getTextField(dateOfAuction),
        chiefAdministratorsCourt: getTextField(modeOfAuction),
        advisorToAdminCourt: getTextField(emdAmount)
      })
    });
  };
  
  export const courtCaseDetails = getCommonCard({
    header: courtCaseHeader,
    detailsContainer: getCommonContainer({
      multipleApplicantContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            width: "100%"
          }
        },
        children: {
          multipleApplicantInfo: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
              scheama: commonCourtCaseInformation(),
              items: [],
            //   addItemLabel: {
            //     labelName: "Add Court Case",
            //     labelKey: "EST_COMMON_ADD_COURT_CASE_LABEL"
            //   },
              headerName: "Auction Details",
              headerJsonPath:
                "children.cardContent.children.header.children.Court Case.props.label",
              sourceJsonPath: "Properties[0].propertyDetails.courtCases",
              prefixSourceJsonPath: "children.cardContent.children.courtCaseCard.children"
            },
            type: "array"
          }
        }
      }
    })
  })