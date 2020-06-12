import {
    getCommonHeader,
    getLabel,
    getBreak,
    getStepperObject,
    getCommonTitle,
    getCommonCard,
    getCommonContainer,
    getTextField,
    getPattern,
    getDateField
  } from "egov-ui-framework/ui-config/screens/specs/utils";

import {
    getIconStyle,
    objectToDropdown,
    getTodaysDateInYMD,
    getFinancialYearDates,
    getNextMonthDateInYMD,
    setFilteredTradeTypes,
    getUniqueItemsFromArray,
    fillOldLicenseData,
    getTradeTypeDropdownData,
    getDetailsForOwner, 
    calculateAge
  } from "../utils";

  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils";
  import find from "lodash/find";
  import get from "lodash/get";

  export const stepsData = [
    { labelName: "Details", labelKey: "RP_COMMON_TR_DETAILS" },
    { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }
  ];
  export const stepper = getStepperObject(
    { props: { activeStep: 0 } },
    stepsData
  );


  const colony = {
    label: {
        labelName: "Colony",
        labelKey: "RP_COLONY_LABEL"
    },
    placeholder: {
        labelName: "Enter Colony",
        labelKey: "RP_COLONY_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true
  }

  const sitePlotNumberField = {
    label: {
        labelName: "Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_LABEL"
    },
    placeholder: {
        labelName: "Enter Transit Site/Plot number",
        labelKey: "RP_SITE_PLOT_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true
  }


  const allotmentDate = {
    label: {
        labelName: "Date of Allotment",
        labelKey: "RP_ALLOTMENT_DATE_LABEL"
    },
    placeholder: {
        labelName: "Enter Date of Allotment",
        labelKey: "RP_ALLOTMENT_DATE_PLACEHOLDER"
    },
    pattern: getPattern("Date"),
    required: true,
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }

  const areaProperty = {
    label: {
        labelName: "Area of the property",
        labelKey: "RP_AREA_PROPERTY_LABEL"
    },
    placeholder: {
        labelName: "Enter Area of the property",
        labelKey: "RP_AREA_PROPERTY_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true
  }

  const allotmentNumber = {
    label: {
        labelName: "Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_LABEL"
    },
    placeholder: {
        labelName: "Enter Allotment Number",
        labelKey: "RP_ALLOTMENT_NUMBER_PLACEHOLDER"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 1,
    maxLength: 100,
    required: true
  }

  const possesionDate = {
    label: {
        labelName: "Date of Possession",
        labelKey: "RP_POSSESSION_DATE_LABEL"
    },
    placeholder: {
        labelName: "Enter Date of Possession",
        labelKey: "RP_POSSESSION_DATE_PLACEHOLDER"
    },
    pattern: getPattern("Date"),
    required: true,
    props: {
        inputProps: {
            max: getTodaysDateInYMD()
        }
    }
  }

  const propertyDetailsHeaderObj = getCommonTitle(
    {
        labelName: "Property Details",
        labelKey: "RP_PROPERTY_DETAILS_HEADER"
    },
    {
        style: {
            marginBottom: 18,
            marginTop: 18
        }
    }
  )

  const propertyDetails = getCommonCard(
    {
      header: propertyDetailsHeaderObj,
      detailsContainer: getCommonContainer({
          colony: getTextField(colony),
          sitePlotNumberField: getTextField(sitePlotNumberField),
          allotmentDate: getDateField(allotmentDate), 
          allotmentNumber: getTextField(allotmentNumber), 
          areaProperty: getTextField(areaProperty),          
          possesionDate: getDateField(possesionDate),          
      })
    }
  )


  export const formwizardFirstStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form1"
    },
    children: {
      propertyDetails
    }
  };
  

  
  const header = getCommonHeader({
    labelName: "Rented Properties Add Update",
    labelKey: "RP_COMMON_RENTED_PROPERTIES_ADD_UPDATE"
  });
  const rentedPropertiesAddUpdate = {
    uiFramework: "material-ui",
    name: "rented-search",
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "search"
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 6
                },
                ...header
              }
            }
          },
          stepper,
          formwizardFirstStep
        }
      }
    }
  };
  
  export default rentedPropertiesAddUpdate;