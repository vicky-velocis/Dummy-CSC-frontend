import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getCommonTitle,
    getCommonHeader,
    getCommonCaption,
    getCommonValue,
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    handleScreenConfigurationFieldChange as handleField,
    prepareFinalObject,
    toggleSnackbar,
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getCommonApplyFooter, validateFields } from "../utils";
  import {materialTypeStoreMapView} from './viewResource/materialTypeStoreMap'
  const headerrow = getCommonContainer({
    header: getCommonHeader({ labelKey: "STORE_COMMON_MATERIAL_TYPE" }),
    connectionNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-opms-asset",
      componentPath: "ConsumerNoContainer",
      props: {
        number: 127676376,
      },
    },
  });
  export const getLabelWithValue = (label, value, props = {}) => {
    return {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        style: {
          marginBottom: "16px",
          wordBreak: "break-word",
        },
        ...props,
      },
      children: {
        label: getCommonCaption(label),
        value: getCommonValue(value),
      },
    };
  };
  //Edit Button
  const callBackForEdit = async (state, dispatch) => {
    window.location.href = `/egov-store-asset/create-material-type?edited=true`;
  };
  export const footer = getCommonApplyFooter({
    editButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          // minWidth: "200px",
          height: "48px",
          marginRight: "45px",
        },
      },
      children: {
        submitButtonLabel: getLabel({
          labelName: "Edit",
          labelKey: "STORE_DETAILS_EDIT_BUTTON",
        }),
      },
      onClickDefination: {
        action: "condition",
        callBack: callBackForEdit,
      },
    },
  });
  export const renderService = () => {
    return getCommonContainer({
        materialTypeCode: getLabelWithValue(
        { labelKey: "MATERIAL_TYPE_CODE" },
        { jsonPath: "WaterConnection[0].waterSubSource" }
      ),
      materialTypeName: getLabelWithValue(
        { labelKey: "MATERIAL_TYPE_NAME" },
        { jsonPath: "WaterConnection[0].waterSubSource" }
      ),
      materialTypeDescription: getLabelWithValue(
        { labelKey: "MATERIAL_TYPE_DESCRIPTION" },
        { jsonPath: "WaterConnection[0].waterSubSource" }
      ),
      isParentType: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-store-asset",
        componentPath: "CheckboxContainer",
        jsonPath: "stores[0].isCentralStore",
        gridDefination: {
          xs: 12,
          sm:6,
        },
        isFieldValid: true,
        required: false,
  
        props: {
          content: "MATERIAL_TYPE_PARENT_TYPE",
          jsonPath: "stores[0].isCentralStore",
          id: "central-store",
          disabled: true,
          screenName: "create-material-type",
          checkBoxPath:
            "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.isParentType",
        },
      },
      parentMaterialTypeName: getLabelWithValue(
        { labelKey: "MATERIAL_TYPE_PARENT_TYPE_NAME" },
        { jsonPath: "WaterConnection[0].waterSubSource" }
      ),
      active: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-store-asset",
        componentPath: "CheckboxContainer",
        jsonPath: "stores[0].isCentralStore",
        gridDefination: {
          xs: 12,
          sm:6
        },
        isFieldValid: true,
        required: false,
  
        props: {
          content: "MATERIAL_TYPE_ACTIVE",
          jsonPath: "stores[0].isCentralStore",
          id: "central-store",
          disabled: true,
          screenName: "create-material-type",
          checkBoxPath:
            "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.active",
       },
      },
  
      // editSection: {
      //   componentPath: "Button",
      //   props: { color: "primary", style: { margin: "-16px" } },
      //   visible: true,
      //   gridDefination: { xs: 12, sm: 12, align: "left" },
      //   children: {
      //     buttonLabel: getLabel({
      //       labelKey: "WS_CONNECTION_DETAILS_VIEW_CONSUMPTION_LABEL",
      //     }),
      //   },
      //   //   onClickDefination: {
      //   //     action: "page_change",
      //   //     path: `meter-reading?connectionNos=${connectionNumber}&tenantId=${tenantId}`,
      //   //   },
      // },
    });
  };
  
  export const getStoreDetails = () => {
    return getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
          style: { marginBottom: "10px" },
        },
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10,
            },
            ...getCommonSubHeader({
              labelKey: "STORE_COMMON_VIEW_MATERIAL_TYPE",
            }),
          },
        },
      },
      viewOne: renderService(),
    });
  };
  const storeView = getStoreDetails();
  const screenConfig = {
    uiFramework: "material-ui",
    name: "view-material-type",
    beforeInitScreen: (action, state, dispatch) => {
      //  beforeInitFn(action, state, dispatch, connectionNumber);
      //dispatch(prepareFinalObject("stores", [{ isCentralStore: false }]));
      dispatch(
        prepareFinalObject("WaterConnection", [{ waterSubSource: "hello" }])
      );
      dispatch(
        prepareFinalObject("Employee[0].jurisdictions[0]", [{ active: true,stckInHand:"yes", departmentName:"ABC" ,storeName:"xyz"},{ active: true,stckInHand:"yes", departmentName:"ABC" ,storeName:"xyz"}])
      );
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css search-preview",
          id: "connection-details",
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header1: {
                gridDefination: {
                  xs: 12,
                  sm: 8,
                },
                ...headerrow,
              },
            },
          },
          storeView,
          materialTypeStoreMapView,
          footer,
        },
      },
    },
  };
  
  export default screenConfig;
  