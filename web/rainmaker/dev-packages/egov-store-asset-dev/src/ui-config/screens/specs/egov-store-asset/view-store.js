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
const headerrow = getCommonContainer({
  header: getCommonHeader({ labelKey: "STORE_COMMON_STORE_MASTER" }),
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
  window.location.href = `/egov-store-asset/createStore?edited=true`;
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
    storeCode: getLabelWithValue(
      { labelKey: "STORE_DETAILS_STORE_CODE" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    storeName: getLabelWithValue(
      { labelKey: "STORE_DETAILS_STORE_NAME" },
      {
        jsonPath: "WaterConnection[0].waterSubSource",
      }
    ),
    departmentName: getLabelWithValue(
      { labelKey: "STORE_DETAILS_DEPARTMENT_NAME" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    storeDescription: getLabelWithValue(
      { labelKey: "STORE_DETAILS_STORE_DESCRIPTION" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    isCentralStore: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-store-asset",
      componentPath: "CheckboxContainer",
      jsonPath: "stores[0].isCentralStore",
      gridDefination: {
        xs: 12,
      },
      isFieldValid: true,
      required: false,

      props: {
        content: "STORE_DETAILS_CENTRAL_STORE",
        jsonPath: "stores[0].isCentralStore",
        id: "central-store",
        disabled: true,
        screenName: "view-store",
        checkBoxPath:
          "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.isCentralStore",
      },
    },
    billingAddress: getLabelWithValue(
      { labelKey: "STORE_DETAILS_BILLING_ADDRESS" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    deliveryAddress: getLabelWithValue(
      { labelKey: "STORE_DETAILS_DELIVERY_ADDRESS" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    inChargeEmployee: getLabelWithValue(
      { labelKey: "STORE_DETAILS_IN_CHARGE_EMPLOYEE" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    contactNumber1: getLabelWithValue(
      { labelKey: "STORE_DETAILS_CONTACT_NUMBER_1" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    contactNumber2: getLabelWithValue(
      { labelKey: "STORE_DETAILS_CONTACT_NUMBER_2" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    email: getLabelWithValue(
      { labelKey: "STORE_DETAILS_EMAIL" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),

    officeLocation: getLabelWithValue(
      { labelKey: "STORE_DETAILS_OFFICE_LOCATION" },
      { jsonPath: "WaterConnection[0].waterSubSource" }
    ),
    active: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-store-asset",
      componentPath: "CheckboxContainer",
      jsonPath: "stores[0].isCentralStore",
      gridDefination: {
        xs: 12,
      },
      isFieldValid: true,
      required: false,

      props: {
        content: "STORE_DETAILS_ACTIVE",
        jsonPath: "stores[0].isCentralStore",
        id: "central-store",
        disabled: true,
        screenName: "view-store",
        checkBoxPath:
          "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.isCentralStore",
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
            labelKey: "STORE_COMMON_VIEW_STORE",
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
  name: "view-store",
  beforeInitScreen: (action, state, dispatch) => {
    //  beforeInitFn(action, state, dispatch, connectionNumber);
    //dispatch(prepareFinalObject("stores", [{ isCentralStore: false }]));
    dispatch(
      prepareFinalObject("WaterConnection", [{ waterSubSource: "hello" }])
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
        footer,
        // connectionDetailsFooter
      },
    },
  },
};

export default screenConfig;
