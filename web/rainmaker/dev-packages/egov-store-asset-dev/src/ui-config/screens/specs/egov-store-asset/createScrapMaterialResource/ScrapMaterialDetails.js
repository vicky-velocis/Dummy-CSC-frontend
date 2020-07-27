import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
const ScrapMaterialDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      ScrapMaterialDetailsCardContainer: getCommonContainer(
        {
          materialName: {
            ...getSelectField({
              label: { labelName: "Material Name", labelKey: "STORE_MATERIAL_NAME" },
              placeholder: {
                labelName: "Select Material Name",
                labelKey: "STORE_MATERIAL_NAME_SELECT"
              },
              required: true,
              jsonPath: "purchaseOrders[0].MTIDetails[0].material.code",
              sourceJsonPath: "searchMaster.materialNames",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name"
              }
            }),
          }, 
          lotNo: {
            ...getSelectField({
              label: { labelName: "LOT No.", labelKey: "STORE_SCRAP_LOT_NO" },
              placeholder: {
                labelName: "Select Lot No.",
                labelKey: "STORE_SCRAP_LOT_NO_PLCHLDR"
              },
              required: true,
              jsonPath: "purchaseOrders[0].MTIDetails[0].uom.code",
              sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name"
              }
            }),
          },
          balanceQuantity: {
            ...getTextField({
              label: {
                labelName: "Balance Quantity",
                labelKey: "STORE_PURCHASE_ORDER_BLNC_QLTY"
              },
              placeholder: {
                labelName: "Enter Balance Quantity",
                labelKey: "STORE_PURCHASE_ORDER_BLNC_QLTY_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].userQuantity"
            })
          },
          balanceValue: {
            ...getTextField({
              label: {
                labelName: "Balance Value",
                labelKey: "STORE_SCRAP_BAL_VALUE"
              },
              placeholder: {
                labelName: "Enter Balance Value",
                labelKey: "STORE_SCRAP_BAL_VALUE_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].MTIDetails[0].indentQuantity"
            })
          },
          unitRate: {
            ...getTextField({
              label: {
                labelName: "Unit Rate",
                labelKey: "STORE_MATERIAL_RECEIPT_UNIT_RATE"
              },
              placeholder: {
                labelName: "Enter Unit Rate",
                labelKey: "STORE_MATERIAL_RECEIPT__UNIT_RATE_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].MTIDetails[0].userQuantity"
            })
          },
          scrapReason: {
            ...getSelectField({
              label: { labelName: "Scrap Reason", labelKey: "STORE_SCRAP_REASON" },
              placeholder: {
                labelName: "Select Scrap Reason",
                labelKey: "STORE_SCRAP_REASON_PLCHLDR"
              },
              required: true,
              jsonPath: "purchaseOrders[0].MTIDetails[0].uom.code",
              sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name"
              }
            }),
          },
          scrapQty: {
            ...getTextField({
              label: {
                labelName: "Scrap Qty",
                labelKey: "STORE_SCRAP_QUANTITY"
              },
              placeholder: {
                labelName: "Enter Scrap Qty",
                labelKey: "STORE_SCRAP_QUANTITY_PLCHLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].MTIDetails[0].orderQuantity"
            })
          },  
      
          scrapValue: {
            ...getTextField({
              label: {
                labelName: "Scrap Value",
                labelKey: "STORE_SCRAP_VALUE"
              },
              placeholder: {
                labelName: "Enter Scrap Value",
                labelKey: "STORE_SCRAP_VALUE_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].MTIDetails[0].usedQuantity"
            })
          },
      
        },
        {
          style: {
            overflow: "visible"
          }
        }
      )
    }),
    onMultiItemAdd: (state, muliItemContent) => {
      return muliItemContent;
    },
    items: [],
    addItemLabel: {
      labelName: "ADD",
      labelKey: "STORE_COMMON_ADD_BUTTON"
    },
    headerName: "Scrap Material Details",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "purchaseOrders[0].MTIDetails",
    prefixSourceJsonPath:
      "children.cardContent.children.ScrapMaterialDetailsCardContainer.children",
   // disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

export const ScrapMaterialDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Scrap Material Details",
      labelKey: "STORE_SCRAP_DETAILS_HEADER"
    },
    {
      style: {  
        marginBottom: 18
      }
    }
  ),
  ScrapMaterialDetailsCard
});
