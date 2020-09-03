import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer,
  getCommonGrayCard,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

export const auctionDetailsHeader = getCommonTitle({
  labelName: "Auction Details",
  labelKey: "EST_AUCTION_DETAILS_HEADER"
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

const buttonItem = {
  firstCont: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 4
    }
  },
  searchButton: {
    componentPath: "Button",
    gridDefination: {
      xs: 12,
      sm: 4
    },
    props: {
      variant: "contained",
      style: {
        color: "white",

        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
        borderRadius: "2px",
        width: "80%",
        height: "48px"
      }
    },
    children: {
      buttonLabel: getLabel({
        labelName: "Upload Bidders List",
        labelKey: "ESTATE_ALLOCATION_UPLOAD_BIDDERS_LIST_BUTTON"
      })
    }
  }
}

const commonAuctionInformation = () => {
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

const UploadButtonContainer = getCommonContainer({
  buttonContainer: getCommonContainer(
    {...buttonItem, searchButton: {...buttonItem.searchButton, 
      onClickDefination: {
        action: "condition",
        // callBack: searchApiCall
      }
    }, lastCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }
  })
})

export const AllotmentAuctionDetails = getCommonCard({
  header: auctionDetailsHeader,
  uploadButton:UploadButtonContainer,
  detailsContainer: commonAuctionInformation(),
})