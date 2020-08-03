import {
  getCommonCard,
  getSelectField,
  getTextField,
  getDateField,
  getCommonTitle,
  getPattern,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTodaysDateInYMD
} from "../../utils";
import get from "lodash/get";

export const propertyHeader = getCommonTitle({
  labelName: "Property Details",
  labelKey: "EST_PROPERTY_DETAILS_HEADER"
}, {
  style: {
    marginBottom: 18,
    marginTop: 18
  }
})

const allocationTypeField = {
  label: {
      labelName: "Type of Allocation",
      labelKey: "EST_ALLOCATION_TYPE_LABEL"
  },
  placeholder: {
      labelName: "Select Type of Allocation",
      labelKey: "EST_ALLOCATION_TYPE_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.allocationType",
  sourceJsonPath: "applyScreenMdmsData.Estate.AllocationType",
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const modeOfAuctionField = {
  label: {
      labelName: "Mode of Auction",
      labelKey: "EST_MODE_OF_AUCTION_LABEL"
  },
  placeholder: {
      labelName: "Enter Mode of Auction",
      labelKey: "EST_MODE_OF_AUCTION_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  minLength: 1,
  maxLength: 100,
  jsonPath: "Properties[0].propertyDetails.modeOfAuction"
}

const schemeNameField = {
  label: {
      labelName: "Scheme Name",
      labelKey: "EST_SCHEME_NAME_LABEL"
  },
  placeholder: {
      labelName: "Enter Scheme Name",
      labelKey: "EST_SCHEME_NAME_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  minLength: 1,
  maxLength: 100,
  jsonPath: "Properties[0].propertyDetails.schemeName"
}

const dateOfAuctionField = {
  label: {
      labelName: "Date of Auction",
      labelKey: "EST_DATE_OF_AUCTION_LABEL"
  },
  placeholder: {
      labelName: "Enter Date of Auction",
      labelKey: "EST_DATE_OF_AUCTION_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "Properties[0].propertyDetails.dateOfAuction",
  props: {
      inputProps: {
          max: getTodaysDateInYMD()
      }
  }
}

const dateOfAllotmentField = {
  label: {
      labelName: "Date of Allotment",
      labelKey: "EST_DATE_OF_ALLOTMENT_LABEL"
  },
  placeholder: {
      labelName: "Enter Date of Allotment",
      labelKey: "EST_DATE_OF_ALLOTMENT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "Properties[0].propertyDetails.dateOfAllotment",
  props: {
      inputProps: {
          max: getTodaysDateInYMD()
      }
  }
}

const allotmentNumberField = {
  label: {
      labelName: "Allotment Number",
      labelKey: "EST_ALLOTMENT_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Enter Allotment Number",
      labelKey: "EST_ALLOTMENT_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  minLength: 1,
  maxLength: 50,
  jsonPath: "Properties[0].propertyDetails.allotmentNumber"
}

const areaOfPropertyField = {
  label: {
      labelName: "Area of the Property in sqft",
      labelKey: "EST_AREA_OF_PROPERTY_LABEL"
  },
  placeholder: {
      labelName: "Enter Area of the Property in sqft",
      labelKey: "EST_AREA_OF_PROPERTY_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  minLength: 2,
  maxLength: 15,
  jsonPath: "Properties[0].propertyDetails.areaOfProperty"
}

const rateField = {
  label: {
      labelName: "Rate per sqft",
      labelKey: "EST_RATE_LABEL"
  },
  placeholder: {
      labelName: "Enter Rate per sqft",
      labelKey: "EST_RATE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  minLength: 2,
  maxLength: 5,
  jsonPath: "Properties[0].propertyDetails.rate"
}

const possessionDateField = {
  label: {
      labelName: "Possession Date",
      labelKey: "EST_POSSESSION_DATE_LABEL"
  },
  placeholder: {
      labelName: "Enter Possession Date",
      labelKey: "EST_POSSESSION_DATE_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  required: true,
  jsonPath: "Properties[0].propertyDetails.possessionDate",
  props: {
      inputProps: {
          max: getTodaysDateInYMD()
      }
  }
}

const categoryField = {
  label: {
      labelName: "Category",
      labelKey: "EST_CATEGORY_LABEL"
  },
  placeholder: {
      labelName: "Select Category",
      labelKey: "EST_CATEGORY_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.category",
  sourceJsonPath: "applyScreenMdmsData.Estate.Category",
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const subCategoryField = {
  label: {
      labelName: "Sub Category",
      labelKey: "EST_SUBCATEGORY_LABEL"
  },
  placeholder: {
      labelName: "Select Sub Category",
      labelKey: "EST_SUBCATEGORY_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.subCategory",
  sourceJsonPath: "applyScreenMdmsData.Estate.SubCategory",
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const siteNumberField = {
  label: {
      labelName: "Site Number",
      labelKey: "EST_SITE_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Enter Site Number",
      labelKey: "EST_SITE_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 50,
  jsonPath: "Properties[0].propertyDetails.rate"
}

const sectorNumberField = {
  label: {
      labelName: "Sector Number",
      labelKey: "EST_SECTOR_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Select Sector Number",
      labelKey: "EST_SECTOR_NUMBER_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.sectorNumber",
  sourceJsonPath: "applyScreenMdmsData.Estate.SectorNumber",
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const fileNumberField = {
  label: {
      labelName: "File Number",
      labelKey: "EST_FILE_NUMBER_LABEL"
  },
  placeholder: {
      labelName: "Enter File Number",
      labelKey: "EST_FILE_NUMBER_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  minLength: 1,
  maxLength: 50,
  jsonPath: "Properties[0].propertyDetails.rate"
}

const lastNocDateField = {
  label: {
      labelName: "Last NOC Date",
      labelKey: "EST_LAST_NOC_DATE_LABEL"
  },
  placeholder: {
      labelName: "Enter Last NOC Date",
      labelKey: "EST_LAST_NOC_DATE_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "Properties[0].propertyDetails.lastNocDate",
  props: {
      inputProps: {
          max: getTodaysDateInYMD()
      }
  }
}

const propertyTypeField = {
  label: {
      labelName: "Property Type",
      labelKey: "EST_PROPERTY_TYPE_LABEL"
  },
  placeholder: {
      labelName: "Select Property Type",
      labelKey: "EST_PROPERTY_TYPE_PLACEHOLDER"
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.propertyType",
  sourceJsonPath: "applyScreenMdmsData.Estate.PropertyType",
  gridDefination: {
      xs: 12,
      sm: 6
  }
}

const serviceCategoryField = {
  label: {
      labelName: "Service Category",
      labelKey: "EST_SERVICE_CATEGORY_LABEL"
  },
  placeholder: {
      labelName: "Enter Service Category",
      labelKey: "EST_SERVICE_CATEGORY_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  minLength: 1,
  maxLength: 100,
  jsonPath: "Properties[0].propertyDetails.serviceCategory"
}

export const propertyDetails = getCommonCard({
  header: propertyHeader,
  detailsContainer: getCommonContainer({
    allocationType: getSelectField(allocationTypeField),
    modeOfAuction: getTextField(modeOfAuctionField),
    schemeName: getTextField(schemeNameField),
    dateOfAuction: getDateField(dateOfAuctionField),
    dateOfAllotment: getDateField(dateOfAllotmentField),
    allotmentNumber: getTextField(allotmentNumberField),
    areaOfProperty: getTextField(areaOfPropertyField),
    rate: getTextField(rateField),
    possessionDate: getDateField(possessionDateField),
    category: getSelectField(categoryField),
    subCategory: getSelectField(subCategoryField),
    siteNumber: getTextField(siteNumberField),
    sectorNumber: getSelectField(sectorNumberField),
    fileNumber: getTextField(fileNumberField),
    lastNocDate: getDateField(lastNocDateField),
    propertyType: getSelectField(propertyTypeField),
    serviceCategory: getTextField(serviceCategoryField)
  })
})
