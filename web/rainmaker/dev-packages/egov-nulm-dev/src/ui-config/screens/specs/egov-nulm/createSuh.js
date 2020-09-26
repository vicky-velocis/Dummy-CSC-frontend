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
  import { getSearchResults } from "../../../../ui-utils/commons";
  import get from "lodash/get";
  import { httpRequest } from "../../../../ui-utils/api";
  import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
  import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
  import commonConfig from '../../../../config/common';
  import store from "egov-ui-framework/ui-redux/store";
  let isEditMode = getQueryArg(window.location.href, "edited");
  const storeName = getQueryArg(window.location.href, "name");
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const callBackForUpdate = async (state, dispatch) => {
    console.log("update");
    let isFormValid = true;
  
    isFormValid = validateFields(
      "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addSUH.children",
      state,
      dispatch,
      "register-organization"
    );
  
    if (!isFormValid) {
      const errorMessage = {
        labelName: "Please fill all fields",
        labelKey: "ERR_FILL_ALL_FIELDS",
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    } else {
      //trigger api for update store
      const { screenConfiguration } = state;
      const { stores } = screenConfiguration.preparedFinalObject;
      const tenantId = getTenantId();
      stores[0].tenantId = tenantId;
     
      stores[0].officeLocation.tenantId = tenantId;
  
      const queryObject = [
        {
          key: "tenantId",
          value: tenantId
        }
      ];
  
      const requestBody = { stores };
  
      try {
        const response = await httpRequest(
          "post",
          "store-asset-services/stores/_update",
          "",
          queryObject,
          requestBody
        );
        if (response) {
          dispatch(setRoute(`/egov-store-asset/acknowledgement?screen=storeMaster&mode=update&code=${response.stores[0].name}`));
        }
  
      } catch (error) {
        dispatch(
          toggleSnackbar(
            true,
            { labelName: error.message, labelCode: error.message },
            "error"
          )
        );
      }
    }
  };
  //Submit Button
  const callBackForSubmit = async (state, dispatch) => {
    
    let isFormValid = true;
  
    isFormValid = validateFields(
      "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addSUH.children",
      state,
      dispatch,
      "createSuh"
    );
  
    if (!isFormValid) {
      const errorMessage = {
        labelName: "Please fill all fields",
        labelKey: "ERR_FILL_ALL_FIELDS",
      };
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    } else {
        const {OrganizationRequest} = state.screenConfiguration.preparedFinalObject;

        if(OrganizationRequest && OrganizationRequest.nominatedBy && OrganizationRequest.nominatedBy==="Others"){
                if(!(OrganizationRequest.nomineeName && OrganizationRequest.nomineeNumber)){
                    const errorMessage = {
                        labelName: "Please fill Nominee Details",
                        labelKey: "NILM_SUH_CITIZEN_FILL_NOMINEE",
                      };
                      dispatch(toggleSnackbar(true, errorMessage, "warning"));
                      return;
                }
        }else{
            OrganizationRequest.nominatedBy ="Self";
        }

      //trigger api for create store
    //   const { screenConfiguration } = state;
    //   const { OrganizationRequest } = screenConfiguration.preparedFinalObject;
    //   const tenantId = getTenantId();
    //   OrganizationRequest.tenantId = tenantId;

    //   const queryObject = [];
    //   const requestBody = { OrganizationRequest };
    //   console.log("requestbody", requestBody);
    //   try {
    //     const response = await httpRequest(
    //       "post",
    //       "/nulm-services/v1/organization/_create",
    //       "",
    //       queryObject,
    //       requestBody
    //     );
    //     if (response) {
    //       dispatch(setRoute(`/egov-nulm/acknowledgement?screen=regOrganization&mode=create&code=${OrganizationRequest.organizationName}`));
    //     }
  
    //   } catch (error) {
    //     dispatch(
    //       toggleSnackbar(
    //         true,
    //         { labelName: error.message, labelCode: error.message },
    //         "error"
    //       )
    //     );
    //   }
  
    }
  };
  
  // Reset Button
  const callBackForReset = async (state, dispatch) => {
   
    const textFields = [
      "organizationName",
      "address",
      "emailId",
      "nomineeName",
      "mobileNo",
      "registrationNo",
    ];
  
    for (let i = 0; i < textFields.length; i++) {
      if (
        state.screenConfiguration.screenConfig['register-organization'].components.div.children
          .formwizardFirstStep.children.formDetail.children.cardContent.children
          .addSUH.children[textFields[i]].props.value
      ) {
        dispatch(
          handleField(
            "register-organization",
            `components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addSUH.children.${textFields[i]}`,
            "props.value",
            ""
          )
        );
      }
    }
  
    dispatch(prepareFinalObject("OrganizationRequest", {}));
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
          visible: false,
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
              labelKey: "NULM_SUH_SUBMIT_BUTTON",
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
      labelName: `SUH Program`,
      labelKey: "NULM_APPLICATION_FOR_SUH_PROGRAM",
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
            labelName: "SUH Details",
            labelKey: "NULM_SUH_DETAILS",
          },
          {
            style: {
              marginBottom: 18,
            },
          }
        ),
        break: getBreak(),
  
        addSUH: getCommonContainer({
            personName: {
                ...getTextField({
                  label: {
                    labelName: "Shelter Requested for the Person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_PERSON_NAME"
                  },
                  placeholder: {
                    labelName: "Enter Shelter Requested for the Person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_PERSON_NAME_PLACEHOLDER"
                  },
                  required: true,
                  pattern: getPattern("Name") || null,
                  jsonPath: "OrganizationRequest.personName"
                })
              },
              gender: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                  xs: 6
                },
                jsonPath: "OrganizationRequest.gender",
                type: "array",
                props: {
                  required: true,
                  jsonPath: "OrganizationRequest.gender",
                  label: { name: "Gender", key: "NULM_SEP_GENDER" },
                  buttons: [
                    {
                      labelName: "FEMALE",
                      labelKey: "COMMON_GENDER_MALE",
                      value:"FEMALE",           
                    },
                    {
                      label: "MALE",
                      labelKey: "COMMON_GENDER_FEMALE",
                      value:"MALE",           
                    },
                    {
                      label: "OTHERS",
                      labelKey: "NULM_SEP_GENDER_OTHERS",
                      value:"OTHERS",           
                    }
                  ],      
                 // defaultValue: "MALE"
                },
                type: "array",
               
              },
          
              age: {
                ...getTextField({
                  label: {
                    labelName: "age",
                    labelKey: "NULM_SEP_AGE"
                  },
                  placeholder: {
                    labelName: "Enter age",
                    labelKey: "NULM_SEP_AGE_PLACEHOLDER"
                  },
                  required: true,
                  pattern: getPattern("age") || null,
                  jsonPath: "OrganizationRequest.age"
                })
              },          
              address: {
                ...getTextField({
                  label: {
                    labelName: "Addrss",
                    labelKey: "NULM_SMID_ADDRESS"
                  },
                  placeholder: {
                    labelName: "Enter Addrss",
                    labelKey: "NULM_SEP_ADDRESS_PLACEHOLDER"
                  },
                  required: true,
                  pattern: getPattern("Address") || null,
                  jsonPath: "OrganizationRequest.address"
                })
              },
              reasonForStaying: {
                ...getTextField({
                  label: {
                    labelName: "Reason for staying",
                    labelKey: "NULM_SUH_LOG_REASON_FOR_STAY"
                  },
                  placeholder: {
                    labelName: "Enter Reason for staying",
                    labelKey: "NULM_SUH_LOG_REASON_FOR_STAY_PLACEHOLDER"
                  },
                  required: true,
                  pattern: getPattern("Address") || null,
                  jsonPath: "OrganizationRequest.reasonForStaying"
                })
              },
              isHandicapped: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                  xs: 6
                },
                jsonPath: "OrganizationRequest.isHandicapped",
                type: "array",
                props: {
                  required: true,
                  jsonPath: "OrganizationRequest.isHandicapped",
                  label: { name: "Urban Poor", key: "NULM_SEP_HANDICAPPED" },
                  buttons: [
                    {
                      labelName: "YES",
                      labelKey: "NULM_SEP_YES",
                      value:"YES",           
                    },
                    {
                      label: "NO",
                      labelKey: "NULM_SEP_NO",
                      value:"NO",           
                    },        
                  ],      
                  defaultValue: "NO"
                },
                type: "array",   
              },
              nominatedBy: {
                uiFramework: "custom-containers",
                componentPath: "RadioGroupContainer",
                gridDefination: {
                  xs: 6
                },
                jsonPath: "OrganizationRequest.nominatedBy",
                type: "array",
                props: {
                  required: true,
                  jsonPath: "OrganizationRequest.nominatedBy",
                  label: { name: "Nominated by", key: "NULM_SUH_CITIZEN_SHELTER_NOMINATED_BY" },
                  buttons: [
                    {
                      labelName: "Self",
                      labelKey: "NULM_SUH_CITIZEN_SELF",
                      value:"Self",           
                    },
                    {
                      label: "Others",
                      labelKey: "NULM_SUH_CITIZEN_OTHERS",
                      value:"Others",           
                    },        
                  ],      
                  defaultValue: "Self"
                },
                type: "array",   
                beforeFieldChange: (action, state, dispatch) => {
                    let nomineeNamePath = action.componentJsonpath.replace(
                      ".nominatedBy",
                      ".nomineeName"
                    );
                    let nomineeNumberPath = action.componentJsonpath.replace(
                        ".nominatedBy",
                        ".nomineeNumber"
                      );
                    if (action.value === "Self") {
                      dispatch( handleField("createSuh", nomineeNamePath, "props.value",""));
                      dispatch( handleField("createSuh", nomineeNumberPath, "props.value",""));
                      dispatch( handleField("createSuh", nomineeNamePath, "props.disabled",true));
                     dispatch( handleField("createSuh", nomineeNumberPath, "props.disabled",true));
                  } 
                  if (action.value === "Others") {
                    dispatch( handleField("createSuh", nomineeNamePath, "props.disabled",false));
                    dispatch( handleField("createSuh", nomineeNumberPath, "props.disabled",false));
                } 
                }
              },

              nomineeName: {
                ...getTextField({
                  label: {
                    labelName: "Name of the nominated person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_NAME"
                  },
                  placeholder: {
                    labelName: "Enter Name of the nominated person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_NAME_PLACEHOLDER"
                  },
                //  required: true,
                  props: {
                    disabled: true
                },
                  pattern: getPattern("Name") || null,
                  jsonPath: "OrganizationRequest.nomineeName"
                })
              },
          
              nomineeNumber: {
                ...getTextField({
                  label: {
                    labelName: "Contact Number of the nominated person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_CONTACT"
                  },
                  placeholder: {
                    labelName: "Enter Contact Number of the nominated person",
                    labelKey: "NULM_SUH_CITIZEN_SHELTER_NOMINEE_CONTACT_PLACEHOLDER"
                  },
                //  required: true,
                  props: {
                    disabled: true
                },
                  pattern: getPattern("MobileNo") || null,
                  jsonPath: "OrganizationRequest.nomineeNumber"
                })
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
    name: "createSuh",
    beforeInitScreen: (action, state, dispatch) => {
      
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
  