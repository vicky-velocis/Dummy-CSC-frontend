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
const MTIDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      mtiDetailsCardContainer: getCommonContainer(
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
          uomName: {
            ...getSelectField({
              label: { labelName: "UOM Name", labelKey: "STORE_PURCHASE_ORDER_UOM" },
              placeholder: {
                labelName: "Enter UOM Name",
                labelKey: "STORE_PURCHASE_ORDER_UOM"
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
        
          quantityRequired: {
            ...getTextField({
              label: {
                labelName: "Quantity Required",
                labelKey: "STORE_MATERIAL_INDENT_QUANTITY_REQUIRED"
              },
              placeholder: {
                labelName: "Enter Quantity Required",
                labelKey: "STORE_MATERIAL_INDENT_QUANTITY_REQUIRED_PLACEHOLDER"
              },
              required:true,
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
          totalValue: {
            ...getTextField({
              label: {
                labelName: "Total Value",
                labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_VALUE"
              },
              placeholder: {
                labelName: "Total Value",
                labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_VALUE"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].MTIDetails[0].orderQuantity"
            })
          },  
      
          remark: {
            ...getTextField({
              label: {
                labelName: "Remark",
                labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK"
              },
              placeholder: {
                labelName: "Enter Remark",
                labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK_PLACEHOLDER"
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
    headerName: "Material Transfer Indent Details",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "purchaseOrders[0].MTIDetails",
    prefixSourceJsonPath:
      "children.cardContent.children.mtiDetailsCardContainer.children",
   // disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

export const MTIDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Material Transfer Indent Details",
      labelKey: "STORE_MTI_DETAILS_HEADER "
    },
    {
      style: {  
        marginBottom: 18
      }
    }
  ),
  MTIDetailsCard
});
