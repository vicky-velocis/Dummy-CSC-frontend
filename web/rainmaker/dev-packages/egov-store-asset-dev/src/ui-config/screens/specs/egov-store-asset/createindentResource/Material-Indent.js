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
  
  export const MaterialIndentDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Material  Indent",
        labelKey: "STORE_MATERIAL_INDENT_MATERIAL_INDENT"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    IndentDetailsContainer: getCommonContainer({
      StoreName: {
        ...getSelectField({
          label: {
            labelName: "Store Name",
            labelKey: "STORE_DETAILS_STORE_NAME"
          },
          placeholder: {
            labelName: "Select Store Name",
            labelKey: "STORE_DETAILS_STORE_NAME_SELECT"
          },
          required: true,
          jsonPath: "indents[0].issueStore.code",         
          sourceJsonPath: "store.stores",
          props: {
            optionValue: "code",
            optionLabel: "name",
          },
        })
      },
      IndentDate: {
        ...getDateField({
          label: {
            labelName: "Indent Date",
            labelKey: "STORE_MATERIAL_INDENT_INDENT_DATE"
          },
          placeholder: {
            labelName: "Enter Indent Date",
            labelKey: "STORE_MATERIAL_INDENT_INDENT_DATE_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "indents[0].indentDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      IndentPurpose: {
        ...getSelectField({
          label: { labelName: "Indent Purpose", labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE" },
          placeholder: {
            labelName: "Select Indent Purpose",
            labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE_SELECT"
          },
          required: true,
          jsonPath: "indents[0].indentPurpose",
          //sourceJsonPath: "createScreenMdmsData.store-asset.RateType",
        props: {
          data: [
            {
              code: "Consumption",
              name: "Capital/Repair/Consumption"
            },
           
          ],
          optionValue: "code",
          optionLabel: "name",
        },
        })
      },
      InventryType: {
        ...getSelectField({
          label: { labelName: "Inventry Type", labelKey: "STORE_INVENTRY_TYPE" },
          placeholder: {
            labelName: "Select Inventry Type",
            labelKey: "STORE_MATERIAL_TYPE_NAME_SELECT"
          },
          required: true,
          jsonPath: "indents[0].inventoryType",
           sourceJsonPath: "searchScreenMdmsData.store-asset.InventoryType",
          props: {
           
            optionValue: "code",
            optionLabel: "name"
          },
        })
      },
      ExpectedDeliveryDate: {
        ...getDateField({
          label: {
            labelName: "Expected Delivery Date",
            labelKey: "STORE_MATERIAL_INDENT_EXPECTED_DELIVERY_DATE"
          },
          placeholder: {
            labelName: "Enter Expected Delivery Date",
            labelKey: "STORE_MATERIAL_INDENT_EXPECTED_DELIVERY_DATE_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Date") || null,
          jsonPath: "indents[0].expectedDeliveryDate",
          props: {
            inputProps: {
              max: getTodaysDateInYMD()
            }
          }
        })
      },
      Naration: {
        ...getTextField({
          label: {
            labelName: "Naration",
            labelKey: "STORE_MATERIAL_INDENT_NARATION"
          },
          placeholder: {
            labelName: "Naration",
            labelKey: "STORE_MATERIAL_INDENT_NARATION_PLACEHOLDER"
          },
          required: true,
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 2,
          },
          pattern: getPattern("eventDescription") || null,
          jsonPath: "indents[0].narration"
        })
      },
    })
  });