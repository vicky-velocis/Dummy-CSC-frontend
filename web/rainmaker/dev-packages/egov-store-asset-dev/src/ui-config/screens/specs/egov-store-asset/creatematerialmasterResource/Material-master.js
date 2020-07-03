import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
 // import { getTodaysDateInYMD } from "../../utils";
  
  export const MaterialMasterDetails = getCommonCard({
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
    MaterialDetailsContainer: getCommonContainer({
      MaterialCode: {
        ...getSelectField({
          label: {
            labelName: "Material Code",
            labelKey: "STORE_MATERIAL_CODE"
          },
          placeholder: {
            labelName: "Material Code",
            labelKey: "STORE_MATERIAL_CODE_SELECT"
          },
          required: false,
          pattern: getPattern("Name") || null,
          jsonPath: "materials[0].code",
          sourceJsonPath: "createScreenMdmsData.store-asset.Material",
          props: {
            optionValue: "code",
            optionLabel: "description",
          },
        })
      },
      MaterialoldCode: {
        ...getTextField({
          label: {
            labelName: "Material Old Code",
            labelKey: "STORE_MATERIAL_OLD_CODE"
          },
          placeholder: {
            labelName: "Material Old Code",
            labelKey: "STORE_MATERIAL_OLD_CODE"
          },
          required: false,
          pattern: getPattern("Name") || null,
          jsonPath: "materials[0].oldCode"
        })
      },

      MaterialType: {
        ...getSelectField({
          label: { labelName: "Material Type", labelKey: "STORE_COMMON_MATERIAL_TYPE" },
          placeholder: {
            labelName: "Select Material Type",
            labelKey: "STORE_MATERIAL_TYPE_NAME_SELECT"
          },
          required: true,
          jsonPath: "materials[0].materialType.code",
          sourceJsonPath: "createScreenMdmsData.store-asset.MaterialType",
        props: {
          optionValue: "code",
          optionLabel: "name",
        },
        })
      },

      MaterialName: {
        ...getTextField({
          label: {
            labelName: "Material Name",
            labelKey: "STORE_MATERIAL_NAME"
          },
          placeholder: {
            labelName: "Material Name",
            labelKey: "STORE_MATERIAL_NAME"
          },
          required: true,
          pattern: getPattern("Name") || null,
          jsonPath: "materials[0].name"
        })
      },
      MaterialDescription: {
        ...getTextField({
          label: {
            labelName: "Material Description",
            labelKey: "STORE_MATERIAL_DESCRIPTION"
          },
          placeholder: {
            labelName: "Material Description",
            labelKey: "STORE_MATERIAL_DESCRIPTION"
          },
          props: {
            className: "applicant-details-error",
            multiline: "multiline",
            rowsMax: 4,
          },
          required: true,
          pattern: getPattern("eventDescription") || null,
          jsonPath: "materials[0].description"
        })
      },

      BaseUOMName: {
        ...getSelectField({
          label: { labelName: "Base UOM Name", labelKey: "STORE_BASE_UOM_NAME" },
          placeholder: {
            labelName: "Select Base UOM Name",
            labelKey: "STORE_BASE_UOM_NAME_SELECT"
          },
          required: true,
          jsonPath: "materials[0].baseUom.code",
          sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
          props: {
            optionLabel: "code",
            optionValue: "name"
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
          required: false,
          jsonPath: "materials[0].inventoryType",
           sourceJsonPath: "searchScreenMdmsData.store-asset.InventoryType",
          props: {
            // data: [
            //   {
            //     value: "Asset",
            //     label: "Asset"
            //   },
            //   {
            //     value: "Consumable",
            //     label: "Consumable"
            //   },
             
            // ],
            optionValue: "code",
            optionLabel: "name"
          },
        })
      },
      MaterialStatus: {
        ...getTextField({
          label: {
            labelName: "Material Status",
            labelKey: "STORE_MATERIAL_STATUS"
          },
          placeholder: {
            labelName: "Material Status",
            labelKey: "STORE_MATERIAL_STATUS"
          },
          required: false,
          pattern: getPattern("Name") || null,
          jsonPath: "materials[0].status"
        })
      },
    })
  });