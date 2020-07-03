import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
 import { getTodaysDateInYMD } from "../../utils";
  
  export const SupplierDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Material Details",
        labelKey: "STORE_MATERIAL_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    SupplierDetailsContainer: getCommonContainer({
      suppliercode: {
        ...getSelectField({
          label: {
            labelName: "Supplier Name",
            labelKey: "STORE_SUPPLIER_MASTER_SUPPLIER_NAME"
          },
          placeholder: {
            labelName: "Select Supplier Name",
            labelKey: "STORE_SUPPLIER_MASTER_NAME_SELECT"
          },
          required: true,
          jsonPath: "priceLists[0].supplier.code",
           // sourceJsonPath: "searchScreenMdmsData.store-asset.inventoryType",
           props: {
            data: [
              {
                value: "Asset",
                label: "Asset"
              },
              {
                value: "Consumable",
                label: "Consumable"
              },
             
            ],
            optionValue: "value",
            optionLabel: "label"
          },
        })
      },
      rateType: {
        ...getSelectField({
          label: { labelName: "Rate Type", labelKey: "STORE_PRICE_RATE_TYPE" },
          placeholder: {
            labelName: "Select Rate Type",
            labelKey: "STORE_PRICE_RATE_TYPE_SELECT"
          },
          required: true,
          jsonPath: "priceLists[0].rateType",
          sourceJsonPath: "createScreenMdmsData.store-asset.RateType",
        props: {
          // data: [
          //   {
          //     value: "DOT/DGS$ND/Tender/Quatation",
          //     label: "DOT/DGS$ND/Tender/Quatation"
          //   },
           
          // ],
          optionValue: "code",
          optionLabel: "name",
        },
        })
      },
      rateContractNumber: {
        ...getTextField({
          label: {
            labelName: "Rate Contract/Tender/Quatation No.",
            labelKey: "STORE_PRICE_RATE_CONTRACT_TENDER_QUATATION_NO"
          },
          placeholder: {
            labelName: "Rate Contract/Tender/Quatation No.",
            labelKey: "STORE_PRICE_RATE_CONTRACT_TENDER_QUATATION_NO"
          },
          required: true,
          pattern: getPattern("Name") || null,
          jsonPath: "priceLists[0].rateContractNumber"
        })
      },
      rateContractDate: {
        ...getDateField({
          label: {
            labelName: "Rate Contract/Tender/Quatation Date",
            labelKey: "STORE_PRICE_RATE_CONTRACT_TENDER_QUATATION_DATE"
          },
          placeholder: {
            labelName: "Rate Contract/Tender/Quatation Date",
            labelKey: "STORE_PRICE_RATE_CONTRACT_TENDER_QUATATION_DATE"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "priceLists[0].rateContractDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      agreementNumber: {
        ...getTextField({
          label: {
            labelName: "Agrement No",
            labelKey: "STORE_PRICE_AGREMENT_NO"
          },
          placeholder: {
            labelName: "Agrement No",
            labelKey: "STORE_PRICE_AGREMENT_NO"
          },
          required: true,
          pattern: getPattern("Name") || null,
          jsonPath: "priceLists[0].agreementNumber"
        })
      },
      agreementDate: {
        ...getDateField({
          label: {
            labelName: "Agrement Date",
            labelKey: "STORE_PRICE_AGREMENT_DATE"
          },
          placeholder: {
            labelName: "Agrement Date",
            labelKey: "STORE_PRICE_AGREMENT_DATE"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "priceLists[0].agreementDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      agreementStartDate: {
        ...getDateField({
          label: {
            labelName: "Agrement Start Date",
            labelKey: "STORE_PRICE_AGREMENT_START_DATE"
          },
          placeholder: {
            labelName: "Agrement Start Date",
            labelKey: "STORE_PRICE_AGREMENT_START_DATE"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "priceLists[0].agreementStartDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      agreementEndDate: {
        ...getDateField({
          label: {
            labelName: "Agrement End Date",
            labelKey: "STORE_PRICE_AGREMENT_END_DATE"
          },
          placeholder: {
            labelName: "Agrement End Date",
            labelKey: "STORE_PRICE_AGREMENT_END_DATE"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "priceLists[0].agreementEndDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      active: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-store-asset",
        componentPath: "CheckboxContainer",
        jsonPath: "priceLists[0].active",
        gridDefination: {
          xs: 4,
        },
        isFieldValid: true,
        required: false,
  
        props: {
          content: "STORE_PRICE_ACTIVE",
          jsonPath: "searchScreen.active",
          screenName: "createpricelist",
          checkBoxPath:
            "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children.active",
        },
      },
     
    })
  });