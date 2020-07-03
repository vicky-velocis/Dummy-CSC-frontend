import {
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import get from "lodash/get";
  import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  
  const arrayCrawler = (arr, n) => {
    if (n == 1) {
      return arr.map(item => {
        return { code: item.code, name: item.name };
      });
    } else
      return arr.map(item => {
        return arrayCrawler(item.children, n - 1);
      });
  };
  
  const MaterialDetailsCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        storeDetailsCardContainer: getCommonContainer(
          {
            materialcode: getSelectField({
              label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
              placeholder: {
                labelName: "Select Store Name",
                labelKey: "STORE_DETAILS_STORE_NAME_SELECT",
              },
              required: true,
              jsonPath: "priceLists[0].priceListDetails[0].material.code",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              // sourceJsonPath: "store.stores",
              // props: {
              //   optionValue: "id",
              //   optionLabel: "name",
              // },
               // sourceJsonPath: "store.stores",
               props: {
                data: [
                  {
                    value: "MAT02",
                    label: "MAT02"
                  },
                  
                ],
                optionValue: "value",
                optionLabel: "label"
              },
              
            }),
            // DepartmentName: {
            //   ...getTextField({
            //     label: {
            //       labelName: "Department Name",
            //       labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
            //     },
            //     placeholder: {
            //       labelName: "Department Names",
            //       labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
            //     },
            //     required: false,
            //     pattern: getPattern("Name") || null,
            //     jsonPath: "priceLists[0].priceListDetails[0].department.name"
            //   })
            // },
            // DepartmentName: {
            //   ...getTextField({
            //     label: {
            //       labelName: "Department Name",
            //       labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
            //     },
            //     placeholder: {
            //       labelName: "Department Names",
            //       labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
            //     },
            //     required: false,
            //     pattern: getPattern("Name") || null,
            //     jsonPath: "priceLists[0].priceListDetails[0].department.name"
            //   })
            // },
            quantity: {
              ...getTextField({
                label: {
                  labelName: "Department Name",
                  labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
                },
                placeholder: {
                  labelName: "Department Names",
                  labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "priceLists[0].priceListDetails[0].quantity"
              })
            },
            ratePerUnit: {
              ...getTextField({
                label: {
                  labelName: "Department Name",
                  labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
                },
                placeholder: {
                  labelName: "Department Names",
                  labelKey: "STORE_DETAILS_DEPARTMENT_NAME"
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "priceLists[0].priceListDetails[0].ratePerUnit"
              })
            },

            uomcode: getSelectField({
              label: { labelName: "Store Name", labelKey: "STORE_DETAILS_STORE_NAME" },
              placeholder: {
                labelName: "Select Store Name",
                labelKey: "STORE_DETAILS_STORE_NAME_SELECT",
              },
              required: true,
              jsonPath: "priceLists[0].priceListDetails[0].uom.code",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
            props: {
              optionLabel: "code",
              optionValue: "name"
            },
              
            }),
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
        labelName: "ADD STORE",
        labelKey: "STORE_MATERIAL_MAP_ADD"
      },
      headerName: "Store",
      headerJsonPath:
        "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "priceLists[0].jurisdictions",
      prefixSourceJsonPath:
        "children.cardContent.children.storeDetailsCardContainer.children"
    },
    type: "array"
  };
  
  export const MaterialPriceDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Material Map to Stpre Details",
        labelKey: "STORE_MATERIAL_MAP_STORE_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    MaterialDetailsCard
  });