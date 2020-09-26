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
  import { getSearchResults } from "../../../../ui-utils/commons";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { httpRequest } from "../../../../ui-utils/api";
  const code = getQueryArg(window.location.href, "code");
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const headerrow = getCommonContainer({
    header: getCommonHeader({ labelKey: "NULM_APPLICATION_FOR_SUH_PROGRAM" }),
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
    window.location.href = `/employee/egov-nulm/createSuh?tenantId=${tenantId}&code=${code}&edited=true`;
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
    personName: getLabelWithValue(
        { labelKey: "NULM_SUH_CITIZEN_SHELTER_PERSON_NAME" },
        { jsonPath: "OrganizationRequest.organizationName" }
      ),
      gender: getLabelWithValue(
        { labelKey: "NULM_SEP_GENDER" },
        { jsonPath: "OrganizationRequest.address" }
      ),
      age: getLabelWithValue(
        { labelKey: "NULM_SEP_AGE" },
        { jsonPath: "OrganizationRequest.emailId" }
      ),
      address: getLabelWithValue(
        { labelKey: "NULM_SMID_ADDRESS" },
        { jsonPath: "OrganizationRequest.representativeName" }
      ),   
      reasonForStaying: getLabelWithValue(
        { labelKey: "NULM_SUH_LOG_REASON_FOR_STAY" },
        { jsonPath: "OrganizationRequest.mobileNo" }
      ),
      isHandicapped: getLabelWithValue(
        { labelKey: "NULM_SEP_HANDICAPPED" },
        { jsonPath: "OrganizationRequest.registrationNo" }
      ),
      nominatedBy: getLabelWithValue(
        { labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINATED_BY" },
        { jsonPath: "OrganizationRequest.registrationNo" }
      ),
      nomineeName: getLabelWithValue(
        { labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_NAME" },
        { jsonPath: "OrganizationRequest.registrationNo" }
      ),
      nomineeNumber: getLabelWithValue(
        { labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_CONTACT" },
        { jsonPath: "OrganizationRequest.registrationNo" }
      ),
    });
  };
  
  export const getSuhDetails = () => {
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
              labelKey: "NULM_SUH_DETAILS",
            }),
          },
        },
      },
      viewOne: renderService(),
    });
  };
  
  
  const storeView = getSuhDetails();
  const screenConfig = {
    uiFramework: "material-ui",
    name: "viewSuh",
    beforeInitScreen: (action, state, dispatch) => {
    //   let OrganizationRequest = {};
    //   OrganizationRequest.tenantId = tenantId;
    //   OrganizationRequest.organizationUuid= code;
    //   const requestBody = {OrganizationRequest}
    //   getSearchResults([],requestBody, dispatch,"organization")
    //   .then(response =>{
    //     if(response && response.ResponseBody)
    //           dispatch(prepareFinalObject("OrganizationRequest", response.ResponseBody[0]));
    //   });
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
        //  footer,
        },
      },
    },
  };
  
  export default screenConfig;
  