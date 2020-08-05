import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer,
  getCommonGrayCard,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

export const ownerHeader = getCommonTitle({
  labelName: "Owner Details",
  labelKey: "EST_OWNER_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const serialNumberField = {
  label: {
    labelName: "Sr No",
    labelKey: "EST_SERIAL_NUMBER_LABEL"
  },
  required: true,
  jsonPath: "Properties[0].ownerDetails[0].serialNumber",
  props: {
    value: 1,
    disabled: true
  },
  gridDefination: {
    xs: 12,
    sm: 6
  }
}

const ownerNameField = {
  label: {
    labelName: "Owner Name",
    labelKey: "EST_OWNER_NAME_LABEL"
  },
  placeholder: {
    labelName: "Enter Owner Name",
    labelKey: "EST_OWNER_NAME_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  maxLength: 150,
  jsonPath: "Properties[0].ownerDetails[0].ownerName"
}

const fatherHusbandNameField = {
  label: {
    labelName: "Father/Husband Name",
    labelKey: "EST_FATHER_HUSBAND_NAME_LABEL"
  },
  placeholder: {
    labelName: "Enter Father/Husband Name",
    labelKey: "EST_FATHER_HUSBAND_NAME_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  maxLength: 150,
  jsonPath: "Properties[0].ownerDetails[0].fatherHusbandName"
}

const getRelationshipRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].ownerDetails[0].relationship",
  props: {
    label: {
      name: "Relationship",
      key: "EST_RELATIONSHIP_LABEL"
    },
    buttons: [{
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
    jsonPath: "Properties[0].ownerDetails[0].relationship",
    required: true
  },
  required: true,
  type: "array"
};

const addressField = {
  label: {
    labelName: "Address",
    labelKey: "EST_ADDRESS_LABEL"
  },
  placeholder: {
    labelName: "Enter Address",
    labelKey: "EST_ADDRESS_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  props: {
    multiline: true,
    rows: 2
  },
  maxLength: 150,
  jsonPath: "Properties[0].ownerDetails[0].address"
}

const mobileNumberField = {
  label: {
    labelName: "Mobile No.",
    labelKey: "TL_MOBILE_NUMBER_LABEL"
  },
  placeholder: {
    labelName: "Enter Mobile No.",
    labelKey: "TL_MOBILE_NUMBER_PLACEHOLDER"
  },
  pattern: getPattern("MobileNo"),
  // props: {
  //   value: userInfo.userName,
  //   disabled: true
  // },
  jsonPath: "Properties[0].ownerDetails[0].mobileNumber",
}

const shareField = {
  label: {
    labelName: "Share",
    labelKey: "EST_SHARE_LABEL"
  },
  placeholder: {
    labelName: "Enter Share",
    labelKey: "EST_SHARE_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  maxLength: 5,
  jsonPath: "Properties[0].ownerDetails[0].share"
}

const cpNumberField = {
  label: {
    labelName: "CP No.",
    labelKey: "EST_CP_NUMBER_LABEL"
  },
  placeholder: {
    labelName: "Enter CP No.",
    labelKey: "EST_CP_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  maxLength: 100,
  jsonPath: "Properties[0].ownerDetails[0].cpNumber"
}

const commonOwnerInformation = () => {
  return getCommonGrayCard({
    header: getCommonTitle({
      labelName: "Owner",
      labelKey: "EST_COMMON_OWNER_INFORMATION"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    ownerCard: getCommonContainer({
      ownerName: getTextField(ownerNameField),
      fatherHusbandName: getTextField(fatherHusbandNameField),
      relationship: getRelationshipRadioButton,
      address: getTextField(addressField),
      mobileNumber: getTextField(mobileNumberField),
      share: getTextField(shareField),
      cpNumber: getTextField(cpNumberField)
    })
  });
};

export const ownerDetails = getCommonCard({
  header: ownerHeader,
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
            scheama: commonOwnerInformation(),
            items: [],
            addItemLabel: {
              labelName: "Add Owner",
              labelKey: "EST_COMMON_ADD_OWNER_LABEL"
            },
            headerName: "Owner ",
            headerJsonPath: "children.cardContent.children.header.children.key.props.label",
            sourceJsonPath: "Properties[0].ownerDetails",
            prefixSourceJsonPath: "children.cardContent.children.ownerCard.children"
          },
          type: "array"
        }
      }
    }
  })
})