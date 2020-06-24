import {
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getLabelWithValue
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  

  
  const materialTypeMapCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "review-hr",
      scheama: getCommonGrayCard({
        materialTypeMapCardContainer: getCommonContainer({
            storeName: getLabelWithValue(
            {
              labelName: "Store Name",
              labelKey: "STORE_DETAILS_STORE_NAME"
            },
            { jsonPath: "Employee[0].jurisdictions[0].storeName",
            localePrefix :{
              moduleName : "EGOV_LOCATION",
              masterName : "TENANTBOUNDARY"
            }, }
          ),
          departmentName: getLabelWithValue(
            {
              labelName: "Department Name",
              labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
            },
            { jsonPath: "Employee[0].jurisdictions[0].departmentName",
            }
          ),
          stckInHand: getLabelWithValue(
            { labelName: "Stock-In-Hand Code", labelKey: "STORE_DETAILS_STORE_STCK_HAND" },
            {
              jsonPath: "Employee[0].jurisdictions[0].stckInHand",
            }
          ),
        }),
        active: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-store-asset",
            componentPath: "CheckboxContainer",
            jsonPath: "Employee[0].jurisdictions[0].active",
            gridDefination: {
              xs: 12,
              sm:6
            },
            isFieldValid: true,
            required: false,
      
            props: {
              content: "MATERIAL_TYPE_ACTIVE",
              jsonPath: "Employee[0].jurisdictions[0].active",
              disabled: true,
              screenName: "create-material-type",
              checkBoxPath:
                "components.div.children.formwizardFirstStep.children.formDetail.children.cardContent.children.addMaterialTypeDetails.children.active",
           },
          },
      }),
  
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Employee[0].jurisdictions",
      prefixSourceJsonPath:
        "children.cardContent.children.materialTypeMapCardContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  };
  
  export const materialTypeStoreMapView =   getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
          style: { marginBottom: "10px" }
        },
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              labelName: "Map Material Type to Store",
              labelKey: "STORE_COMMON_MAP_MATERIAL_TYPE_TO_STORE"
            })
          },
          
        }
      },
      viewOne: materialTypeMapCard
    });

  