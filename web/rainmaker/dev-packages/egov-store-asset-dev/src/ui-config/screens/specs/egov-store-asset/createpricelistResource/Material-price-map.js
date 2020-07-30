import {
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getDateField,
    getTextField,
    getPattern,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { getTodaysDateInYMD } from "../../utils";
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
              label: {  labelName: " Material Name",
              labelKey: "STORE_MATERIAL_NAME" },
              placeholder: {
                labelName: "Select Material Name",
                labelKey: "STORE_MATERIAL_NAME_SELECT"
              },
              required: true,
              jsonPath: "priceLists[0].priceListDetails[0].material.code",            
              
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
            fromDate: {
              ...getDateField({
                label: {
                  labelName: "From Date",
                  labelKey: "STORE_PRICE_FROM_DATE"
                },
                placeholder: {
                  labelName: "Enter From Date",
                  labelKey: "STORE_PRICE_FROM_DATE_PLACEHOLDER"
                },
                required: false,
                visible:false,
                pattern: getPattern("Date") || null,
                jsonPath: "priceLists[0].priceListDetails[0].fromDate",
                props: {
                  inputProps: {
                    max: getTodaysDateInYMD()
                  }
                }
              })
            },
            toDate: {
              ...getDateField({
                label: {
                  labelName: "To Date",
                  labelKey: "STORE_PRICE_TO_DATE"
                },
                placeholder: {
                  labelName: "Enter To Date",
                  labelKey: "STORE_PRICE_TO_DATE_PLACEHOLDER"
                },
                required: false,
                visible:false,
                pattern: getPattern("Date") || null,
                jsonPath: "priceLists[0].priceListDetails[0].toDate",
                props: {
                  inputProps: {
                    max: getTodaysDateInYMD()
                  }
                }
              })
            },
            ratePerUnit: {
              ...getTextField({
                label: {
                  labelName: "Rate Per Unit",
                  labelKey: "STORE_PRICE_RATE_PER_UNIT"
                },
                placeholder: {
                  labelName: "Enter Rate Per Unit",
                  labelKey: "STORE_PRICE_RATE_PER_UNIT_PLACEHOLDER"
                },
                required: false,
                pattern: getPattern("Amount") || null,
                jsonPath: "priceLists[0].priceListDetails[0].ratePerUnit"
              })
            },
            quantity: {
              ...getTextField({
                label: {
                  labelName: "quantity",
                  labelKey: "STORE_PRICE_QUANTITY"
                },
                placeholder: {
                  labelName: "Enter quantity",
                  labelKey: "STORE_PRICE_QUANTITY_PLACEHOLDER"
                },
                required: false,
                pattern: getPattern("Amount") || null,
                jsonPath: "priceLists[0].priceListDetails[0].quantity"
              })
            },          

            uomcode: getSelectField({
              label: { labelName: "UOM ", labelKey: "STORE_PRICE_UOM" },
              placeholder: {
                labelName: "Select UOM",
                labelKey: "STORE_PRICE_UOM_SELECT",
              },
              required: true,
              jsonPath: "priceLists[0].priceListDetails[0].uom.code",
              gridDefination: {
                xs: 12,
                sm: 4,
              },
              sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
            props: {
              optionLabel: "name",
              optionValue: "code"
            },
              
            }),
            active: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-store-asset",
              componentPath: "CheckboxContainer",
              jsonPath: "priceLists[0].priceListDetails[0].active",
              gridDefination: {
                xs: 4,
              },
              isFieldValid: true,
              required: false,
        
              props: {
                content: "STORE_PRICE_ACTIVE",
                screenName: "createpricelist",
                checkBoxPath:
                  "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.active",
              },
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