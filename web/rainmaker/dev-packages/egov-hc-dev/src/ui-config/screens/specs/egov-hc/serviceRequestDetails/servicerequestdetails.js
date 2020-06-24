import { getBreak, getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getMapLocator = textSchema => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hc",
    componentPath: "MapLocator",
    props: {}
  };
};

const showHideMapPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["servicerequest"],
    "components.div.children.formwizardFirstStep.children.servicerequestdetails.children.cardContent.children.servicerequestdetailsContainer.children.mapsDialog.props.open",
    false
  );
  dispatch(
    handleField(
      "servicerequest",
      "components.div.children.formwizardFirstStep.children.servicerequestdetails.children.cardContent.children.servicerequestdetailsContainer.children.mapsDialog",
      "props.open",
      !toggle
    )
  );
};
export const servicerequestdetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Service Request Details",
      labelKey: "HC_SERVICE_REQUEST_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),


  break: getBreak(),
  servicerequestdetailsContainer: getCommonContainer({
  typeofrequest: {
    ...getSelectField({
      label: {
        labelName: "Type of Service Request",
        labelKey: "HC_TYPE_OF_SERVICE_REQUEST_LABEL"
      },     
      optionLabel: "name",
      optionValue: "name",
      placeholder: {
        labelName: "Type of Service Request",
        labelKey: "HC_TYPE_OF_SERVICE_REQUEST_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12,
        lg:12
      },
      sourceJsonPath: "applyScreenMdmsData.eg-horticulture.ServiceType",
      jsonPath: "SERVICEREQUEST.serviceType",
      errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
      required: true,
        
          
          
          
          
        
    })
  },
  nooftrees:{
    ...getTextField({
       label:{
          labelName:"No. of Trees for Cutting/Prunning/Removal",
          labelKey:"HC_NUMBER_OF_TREES_FOR_CUTTING_PRUNING_REMOVAL_LABEL"
       },
       placeholder:{
          labelName:"No. of Trees for Cutting/Prunning/Removal",
          labelKey:"HC_NUMBER_OF_TREES_FOR_CUTTING_PRUNING_REMOVAL_PLACEHOLDER"
       },
       gridDefination: {
        xs: 12,
        sm: 12,
        md: 12,
        lg:12
      },
       required:true,
       pattern:getPattern("NoOfTree"),
       errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
       jsonPath:"SERVICEREQUEST.treeCount"
    })
  },
  details:{
    ...getTextField({
       label:{
          labelName:"Service Request Additional Details",
          labelKey:"HC_SERVICE_REQUEST_ADDITIONAL_DETAILS_LABEL"
       },
       placeholder:{
          labelName:"Service Request Additional Details",
          labelKey:"HC_SERVICE_REQUEST_ADDITIONAL_DETAILS_LABEL_PLACEHOLDER"
       },
       gridDefination: {
        xs: 12,
        sm: 12,
        md: 12,
        lg:12
      },
       required:true,
       pattern:getPattern("serviceRequestDescription"),
       errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
       jsonPath:"SERVICEREQUEST.description"
    })
  },
  SILocationDetailsConatiner: getCommonContainer({
    propertyGisCoordinates:
    {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "gis-div-css",
        style: {
          width: "100%",
          cursor: "pointer"
        },
        jsonPath:
          "SERVICEREQUEST.address"
      },
      jsonPath: "SERVICEREQUEST.latitude",
      onClickDefination: {
        action: "condition",
        callBack: showHideMapPopup
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        gisTextField: {
          ...getTextField({
            label: {
              labelName: "Locate on Map",
              labelKey: "EC_VIOLATION_DETAILS_GIS_CORD_LABEL"
            },
            placeholder: {
              labelName: "Select your property location on map",
              labelKey: "EC_VIOLATION_DETAILS_GIS_CORD_PLACEHOLDER"
            },
            jsonPath:
              "SERVICEREQUEST.latitude",
            iconObj: {
              iconName: "gps_fixed",
              position: "end"
            },
            gridDefination: {
              xs: 12,
              sm: 12
            },
            required:true,
            props: {
              disabled: true,
              cursor: "pointer",
              jsonPath:
                "SERVICEREQUEST.latitude"
            }
          })
        }
      }
    }
  }),
  mapsDialog: {
    componentPath: "Dialog",
    props: {
      open: false
    },
    children: {
      dialogContent: {
        componentPath: "DialogContent",
        children: {
          popup: getMapLocator()
        }
      }
    }

  },
  locality: {
    ...getSelectField({
      label: {
        labelName: "Locality/Mohalla",
        labelKey: "HC_LOCALITY_MOHALLA_LABEL"
      },     
      optionLabel: "name",
      optionValue: "name",
      placeholder: {
        labelName: "Locality/Mohalla",
        labelKey: "HC_LOCALITY_MOHALLA_LABEL_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12,
        lg:12
      },
       required:true,
      sourceJsonPath: "applyScreenMdmsData.RAINMAKER-PGR.Sector",
      jsonPath: "SERVICEREQUEST.mohalla",
      errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
      required: true,
        
        
        
        
        
      
    })
  },
  houseno:{
      ...getTextField({
         label:{
            labelName:"House No. and Street Name",
            labelKey:"HC_HOUSE_NO_STREET_NAME_LABEL"
         },
         placeholder:{
            labelName:"House no and Street Name",
            labelKey:"HC_HOUSE_NO_STREET_NAME_LABEL_PLACEHOLDER"
         },
         gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg:12
        },
         required:true,
         pattern:getPattern("location"),
         errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
         jsonPath:"SERVICEREQUEST.houseNoAndStreetName"
      })
    },
    landmark:{
      ...getTextField({
         label:{
            labelName:"Landmark",
            labelKey:"HC_LANDMARK_LABEL"
         },
         placeholder:{
            labelName:"Landmark",
            labelKey:"HC_LANDMARK_LABEL_PLACEHOLDER"
         },
         gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg:12
        },
        pattern:getPattern("location"),
         errorMessage:"ERR_DEFAULT_INPUT_FIELD_MSG",
         jsonPath:"SERVICEREQUEST.landmark"
      }),
      

    },
  })
});

