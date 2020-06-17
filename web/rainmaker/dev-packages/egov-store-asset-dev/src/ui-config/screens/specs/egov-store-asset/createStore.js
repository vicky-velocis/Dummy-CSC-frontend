import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField,
  getCommonHeader,
  getBreak,
  getCheckBoxwithLabel,
  getDateField,
  getLabel,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getCommonApplyFooter, validateFields } from "../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
//import { httpRequest } from "../../../../../ui-utils/api";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";

const isEditMode = getQueryArg(window.location.href, "edited");

const callBackForUpdate = async (state, dispatch) => {
  console.log("update");
  let isFormValid = true;

  isFormValid = validateFields(
    "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children",
    state,
    dispatch,
    "createStore"
  );

  if (!isFormValid) {
    const errorMessage = {
      labelName: "Please fill all fields",
      labelKey: "ERR_FILL_ALL_FIELDS",
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  } else {
    //trigger api for create store
    dispatch(setRoute(`/egov-store-asset/acknowledgement`));
  }
};
//Submit Button
const callBackForSubmit = async (state, dispatch) => {
  console.log("submit");
  let isFormValid = true;

  isFormValid = validateFields(
    "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children",
    state,
    dispatch,
    "createStore"
  );

  if (!isFormValid) {
    const errorMessage = {
      labelName: "Please fill all fields",
      labelKey: "ERR_FILL_ALL_FIELDS",
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
  } else {
    //trigger api for create store
    dispatch(setRoute(`/egov-store-asset/acknowledgement`));
  }
};

// Reset Button
const callBackForReset = async (state, dispatch) => {
  console.log("reset");

  const checkBoxButton = ["isCentralStore", "active"];
  const textFields = [
    "storeCode",
    "storeName",
    "departmentName",
    "storeDescription",
    "billingAddress",
    "deliveryAddress",
    "inChargeEmployee",
    "contactNumber1",
    "contactNumber2",
    "email",
    "officeLocation",
  ];
  for (let i = 0; i < checkBoxButton.length; i++) {
    if (checkBoxButton[i]) {
      dispatch(
        handleField(
          "createStore",
          `components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.${checkBoxButton[i]}`,
          "props.value",
          false
        )
      );
    }
  }

  // document.getElementById('central-store').removeAttribute('checked');

  for (let i = 0; i < textFields.length; i++) {
    if (
      state.screenConfiguration.screenConfig.createStore.components.div.children
        .formwizardFirstStep.children.formDetail.children.cardContent.children
        .addStoreDetails.children[textFields[i]].props.value
    ) {
      dispatch(
        handleField(
          "createStore",
          `components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.${textFields[i]}`,
          "props.value",
          ""
        )
      );
    }
  }

  dispatch(prepareFinalObject("stores", []));
};

export const buttonController = () => {
  if (isEditMode)
    return {
      updateButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            // minWidth: "200px",
            height: "48px",
            marginRight: "16px",
          },
        },
        children: {
          updateButtonLabel: getLabel({
            labelName: "update",
            labelKey: "STORE_DETAILS_UPDATE_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: callBackForUpdate,
        },
        visible: true,
      },
    };
  else
    return {
      resetButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            // minWidth: "200px",
            height: "48px",
            marginRight: "16px",
          },
        },
        children: {
          resetButtonLabel: getLabel({
            labelName: "Reset",
            labelKey: "STORE_DETAILS_RESET_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: callBackForReset,
        },
        visible: true,
      },
      submitButton: {
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
            labelName: "Submit",
            labelKey: "STORE_DETAILS_SUBMIT_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: callBackForSubmit,
        },
      },
    };
};

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Store`,
    labelKey: "STORE_COMMON_STORE_MASTER",
  }),
});
export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1",
  },
  children: {
    formDetail: getCommonCard({
      header: getCommonTitle(
        {
          labelName: "Add Store",
          labelKey: "STORE_DETAILS_ADD_STORE",
        },
        {
          style: {
            marginBottom: 18,
          },
        }
      ),
      break: getBreak(),

      addStoreDetails: getCommonContainer({
        storeCode: getTextField({
          label: {
            labelName: "Store Code",
            labelKey: "STORE_DETAILS_STORE_CODE",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Enter Store Code",
            labelKey: "STORE_DETAILS_STORE_CODE_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("non-empty-alpha-numeric"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].code",
        }),
        storeName: getTextField({
          label: {
            labelName: "Store Name",
            labelKey: "STORE_DETAILS_STORE_NAME",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Enter Store Name",
            labelKey: "STORE_DETAILS_STORE_NAME_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("alpha-only"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",

          jsonPath: "stores[0].name",
        }),
        departmentName: getSelectField({
          label: {
            labelName: "Department Name",
            labelKey: "STORE_DETAILS_DEPARTMENT_NAME",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Select Department Name",
            labelKey: "STORE_DETAILS_DEPARTMENT_NAME_PLACEHOLDER",
          },
          jsonPath: "stores[0].department",
          //  required: true,
          localePrefix: {
            moduleName: "firenoc",
            masterName: "FireStations",
          },
        }),
        storeDescription: getTextField({
          label: {
            labelName: "Store Description",
            labelKey: "STORE_DETAILS_STORE_DESCRIPTION",
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 2,
          },
          placeholder: {
            labelName: "Enter Store Description",
            labelKey: "STORE_DETAILS_STORE_DESCRIPTION_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("alpha-numeric-with-space-and-newline"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].description",
        }),
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
            screenName: "createStore",
            checkBoxPath:
              "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.isCentralStore",
          },
        },
        billingAddress: getTextField({
          label: {
            labelName: "Billing Address",
            labelKey: "STORE_DETAILS_BILLING_ADDRESS",
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 2,
          },
          placeholder: {
            labelName: "Enter Billing Address",
            labelKey: "STORE_DETAILS_BILLING_ADDRESS_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("alpha-numeric-with-space-and-newline"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].billingAddress",
        }),
        deliveryAddress: getTextField({
          label: {
            labelName: "Delivery Address",
            labelKey: "STORE_DETAILS_DELIVERY_ADDRESS",
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 2,
          },
          placeholder: {
            labelName: "Enter Delivery Address",
            labelKey: "STORE_DETAILS_DELIVERY_ADDRESS_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("alpha-numeric-with-space-and-newline"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].deliveryAddress",
        }),
        inChargeEmployee: getSelectField({
          label: {
            labelName: "Store In-charge Employee Name",
            labelKey: "STORE_DETAILS_IN_CHARGE_EMPLOYEE",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Select In-charge Employee Name",
            labelKey: "STORE_DETAILS_IN_CHARGE_EMPLOYEE_PLACEHOLDER",
          },
          jsonPath: "stores[0].storeInCharge",
          //  required: true,
          localePrefix: {
            moduleName: "firenoc",
            masterName: "FireStations",
          },
        }),
        contactNumber1: getTextField({
          label: {
            labelName: "Contact No.1",
            labelKey: "STORE_DETAILS_CONTACT_NUMBER_1",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Enter contact number",
            labelKey: "STORE_DETAILS_CONTACT_NUMBER_PLACEHOLDER",
          },
          required: true,
          pattern: getPattern("MobileNo"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].contactNo1",
        }),
        contactNumber2: getTextField({
          label: {
            labelName: "Contact No.2",
            labelKey: "STORE_DETAILS_CONTACT_NUMBER_2",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Enter contact number",
            labelKey: "STORE_DETAILS_CONTACT_NUMBER_PLACEHOLDER",
          },
          pattern: getPattern("MobileNo"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",

          jsonPath: "stores[0].contactNo2",
        }),
        email: getTextField({
          label: {
            labelName: "Email Address",
            labelKey: "STORE_DETAILS_EMAIL",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Enter email",
            labelKey: "STORE_DETAILS_EMAIL_PLACEHOLDER",
          },
          pattern: getPattern("Email"),
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "stores[0].email",
        }),
        officeLocation: getSelectField({
          label: {
            labelName: "Office Location",
            labelKey: "STORE_DETAILS_OFFICE_LOCATION",
          },
          props: {
            className: "applicant-details-error",
          },
          placeholder: {
            labelName: "Select Office Location",
            labelKey: "STORE_DETAILS_OFFICE_LOCATION_PLACEHOLDER",
          },
          jsonPath: "stores[0].officeLocation",
          //   required: true,
          localePrefix: {
            moduleName: "firenoc",
            masterName: "FireStations",
          },
        }),
        active: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-store-asset",
          componentPath: "CheckboxContainer",
          jsonPath: "stores[0].active",
          gridDefination: {
            xs: 12,
          },
          isFieldValid: true,
          required: false,

          props: {
            content: "STORE_DETAILS_ACTIVE",
            jsonPath: "stores[0].active",
            screenName: "createStore",
            checkBoxPath:
              "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addStoreDetails.children.active",
          },
        },
        inActiveDate: {
          ...getDateField({
            label: {
              labelName: "In-active Date",
              labelKey: "STORE_DETAILS_IN_ACTIVE_DATE",
            },
            placeholder: {
              labelName: "In-active Date",
              labelKey: "STORE_DETAILS_IN_ACTIVE_DATE_PLACEHOLDER",
            },
            pattern: getPattern("Date"),
            jsonPath: "stores[0].inActiveDate",
            props: {
              style: {
                //visibility: 'hidden'  -----    this will hide the field but space will be allocated
                display: "none", //have this if u dont want space as well
              },
            },
          }),
        },
      }),
    }),
  },
};

export const footer = getCommonApplyFooter({
  ...buttonController(),
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "createStore",
  beforeInitScreen: (action, state, dispatch) => {
    if (isEditMode) {
      dispatch(prepareFinalObject("stores", [{ code: "hello" }]));
    }

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10,
              },
              ...header,
            },
          },
        },
        formwizardFirstStep,
        footer,
      },
    },
  },
};

export default screenConfig;
