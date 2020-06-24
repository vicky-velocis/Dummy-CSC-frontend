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
    getCommonGrayCard,    
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
import { TEXT,CHECKBOX,LABEL } from "../../../../ui-containers-local/DynamicTableContainer/constant";
  
  const isEditMode = getQueryArg(window.location.href, "edited");
  const MaterialTypeRelationDetailsCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        rltnDetailsCardContainer: getCommonContainer(
          {
            storeName: {
              ...getSelectField({
                label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
                placeholder: {
                  labelName: "Select Store Name",
                  labelKey: "STORE_DETAILS_STORE_NAME_SELECT"
                },
                required: true,
                jsonPath: "Employee[0].jurisdictions[0].storeName",
                sourceJsonPath: "createScreenMdmsData.hierarchyList",
                localePrefix :{
                  moduleName : "EGOV_LOCATION",
                  masterName : "TENANTBOUNDARY"
                },
                props: {
                  className: "hr-generic-selectfield",
                  optionValue: "code",
                  optionLabel: "name"
                }
              }),
            },
            departmentName: getTextField({
              label: {
                labelName: "Department Name",
                labelKey: "STORE_DETAILS_DEPARTMENT_NAME",
              },
              props: {
                className: "applicant-details-error",
              },
              // placeholder: {
              //   labelName: "Enter Material Type Code",
              //   labelKey: "MATERIAL_TYPE_CODE_PLACEHOLDER",
              // },
              pattern: getPattern("non-empty-alpha-numeric"),
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              jsonPath: "Employee[0].jurisdictions[0].departmentName",
            }),
            stckInHand: {
              ...getSelectField({
                label: {
                  labelName: "Stock-In-Hand Code",
                  labelKey: "STORE_DETAILS_STORE_STCK_HAND"
                },
                placeholder: {
                  labelName: "Select Stock-In-Hand Code",
                  labelKey: "STORE_DETAILS_STORE_STCK_HAND_SELECT"
                },
                required: true,
                jsonPath: "Employee[0].jurisdictions[0].stckInHand",
                localePrefix :{
                  moduleName : "EGOV_LOCATION",
                  masterName : "BOUNDARYTYPE"
                },
                props: {
                  className: "hr-generic-selectfield",
                  optionValue: "value",
                  optionLabel: "label",
                }
              }),
            },
            active: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-store-asset",
              componentPath: "CheckboxContainer",
              jsonPath: "stores[0].active",
              gridDefination: {
                xs: 6,
              },
              isFieldValid: true,
              required: false,
    
              props: {
                content: "STORE_DETAILS_ACTIVE",
                jsonPath: "Employee[0].jurisdictions[0].active",
                screenName: "create-material-type",
                checkBoxPath:"components.div.children.addMaterialTypeTable.children.cardContent.children.MaterialTypeRelationDetailsCard.props.items[1].item1.children.cardContent.children.rltnDetailsCardContainer",
              },
              beforeFieldChange: (action, state, dispatch) => {
                let tenantBoundary = get(
                  state.screenConfiguration.preparedFinalObject,
                  `createScreenMdmsData.egov-location.TenantBoundary`,
                  []
                );
              }
            },
          },
          {
            style: {
              overflow: "visible"
            }
          }
        )
      }),
      items: [],
      addItemLabel: {
        labelName: "ADD",
        labelKey: "STORE_COMMON_ADD_BUTTON"
      },
      headerName: "Map Material Type to Store",
      headerJsonPath:
        "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "Employee[0].jurisdictions",
      prefixSourceJsonPath:
        "children.cardContent.children.rltnDetailsCardContainer.children"
    },
    type: "array"
  };
  const callBackForUpdate = async (state, dispatch) => {
    console.log("update");
    let isFormValid = true;
  
    isFormValid = validateFields(
      "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children",
      state,
      dispatch,
      "create-material-type"
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
      "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children",
      state,
      dispatch,
      "create-material-type"
    );

    let materialTypeMapPath =
    "components.div.children.addMaterialTypeTable.children.cardContent.children.MaterialTypeRelationDetailsCard.props.items"; //[1].item1.children.cardContent.children.rltnDetailsCardContainer",
          
  let MaterialTypeMapItems = get(
    state.screenConfiguration.screenConfig["create-material-type"],
    materialTypeMapPath,
    []
  );

  let isMaterialTypemapValid = true;
  for (var j = 0; j < MaterialTypeMapItems.length; j++) {
    if (
      (MaterialTypeMapItems[j].isDeleted === undefined ||
        MaterialTypeMapItems[j].isDeleted !== false) &&
      !validateFields(
        `${materialTypeMapPath}[${j}].item${j}.children.cardContent.children.rltnDetailsCardContainer.children`,
        state,
        dispatch,
        "create-material-type"
      )
    )
    isMaterialTypemapValid = false;
  }
  
    if (!isFormValid || !isMaterialTypemapValid) {
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
  
    const checkBoxButton = [ "isParentType", "active"];
    const textFields = [
      "materialTypeCode",
      "materialTypeName",
      "materialTypeDescription",
      "parentMaterialTypeName",
    ];
    for (let i = 0; i < checkBoxButton.length; i++) {
      if (checkBoxButton[i]) {
        dispatch(
          handleField(
            "create-material-type",
            `components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.${checkBoxButton[i]}`,
            "props.value",
            false
          )
        );
      }
    }
  
    // document.getElementById('central-store').removeAttribute('checked');
  
    for (let i = 0; i < textFields.length; i++) {
      if ( `state.screenConfiguration.screenConfig.create-material-type.components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children[${textFields[i]}].props.value`) {
        dispatch(
          handleField(
            "create-material-type",
            `components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.${textFields[i]}`,
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
      labelName: `Material Type`,
      labelKey: "STORE_COMMON_MATERIAL_TYPE",
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
            labelName: "Add Material Type",
            labelKey: "STORE_COMMON_ADD_MATERIAL_TYPE",
          },
          {
            style: {
              marginBottom: 18,
            },
          }
        ),
        break: getBreak(),
  
        addMaterialTypeDetails: getCommonContainer({
          materialTypeCode: getTextField({
            label: {
              labelName: "Material Type Code",
              labelKey: "MATERIAL_TYPE_CODE",
            },
            props: {
              className: "applicant-details-error",
            },
            placeholder: {
              labelName: "Enter Material Type Code",
              labelKey: "MATERIAL_TYPE_CODE_PLACEHOLDER",
            },
            required: true,
            pattern: getPattern("non-empty-alpha-numeric"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "stores[0].code",
          }),
          materialTypeName: getTextField({
            label: {
              labelName: "Material Type Name",
              labelKey: "MATERIAL_TYPE_NAME",
            },
            props: {
              className: "applicant-details-error",
            },
            placeholder: {
              labelName: "Enter Material Type Name",
              labelKey: "MATERIAL_TYPE_NAME_PLACEHOLDER",
            },
            required: true,
            pattern: getPattern("alpha-only"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
  
            jsonPath: "stores[0].name",
          }),
          materialTypeDescription: getTextField({
            label: {
              labelName: "Material Type Description",
              labelKey: "MATERIAL_TYPE_DESCRIPTION",
            },
            props: {
              className: "applicant-details-error",
              multiline: "multiline",
              rowsMax: 2,
            },
            placeholder: {
              labelName: "Enter Material Type Description",
              labelKey: "MATERIAL_TYPE_DESCRIPTION_PLACEHOLDER",
            },
            required: true,
            pattern: getPattern("alpha-numeric-with-space-and-newline"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "stores[0].description",
          }),
          isParentType: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-store-asset",
            componentPath: "CheckboxContainer",
            jsonPath: "stores[0].isCentralStore",
            gridDefination: {
              xs: 6,
            },
            isFieldValid: true,
            required: false,
  
            props: {
              content: "MATERIAL_TYPE_PARENT_TYPE",
              jsonPath: "stores[0].isCentralStore",
              screenName: "create-material-type",
              checkBoxPath:
                "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.isParentType",
            },
          },
          parentMaterialTypeName: getSelectField({
            label: {
              labelName: "Parent materila type Name",
              labelKey: "MATERIAL_TYPE_PARENT_TYPE_NAME",
            },
            props: {
              className: "applicant-details-error",
            },
            placeholder: {
              labelName: "select Parent material type Name",
              labelKey: "MATERIAL_TYPE_PARENT_TYPE_NAME_PLACEHOLDER",
            },
            jsonPath: "stores[0].storeInCharge",
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
              xs: 6,
            },
            isFieldValid: true,
            required: false,
  
            props: {
              content: "MATERIAL_TYPE_ACTIVE",
              jsonPath: "stores[0].active",
              screenName: "create-material-type",
              checkBoxPath:
                "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.active",
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
    name: "create-material-type",
    beforeInitScreen: (action, state, dispatch) => {
      if (isEditMode) {
     //   dispatch(prepareFinalObject("stores", [{ code: "hello" }]));
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
          addMaterialTypeTable :getCommonCard({
            header: getCommonTitle(
              {
                labelName: "Map Material Type to Store",
                labelKey: "STORE_COMMON_MAP_MATERIAL_TYPE_TO_STORE"
              },
              {
                style: {
                  marginBottom: 18
                }
              }
            ),
            MaterialTypeRelationDetailsCard
          }),
          footer,
        },
      },
    },
  };
  
  export default screenConfig;
  