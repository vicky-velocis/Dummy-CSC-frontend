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

const purchaseOrderDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      poDetailsCardContainer: getCommonContainer(
        {
          materialName: {
            ...getSelectField({
              label: { labelName: "Material Name", labelKey: "STORE_MATERIAL_NAME" },
              placeholder: {
                labelName: "Select Material Name",
                labelKey: "STORE_MATERIAL_NAME_SELECT"
              },
              required: true,
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].material.code",
              sourceJsonPath: "searchMaster.materialNames",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name"
              }
            }),
          }, 
          indentNumber: {
            ...getTextField({
              label: {
                labelName: "Indent No.",
                labelKey: "STORE_PURCHASE_ORDER_INDENT_NO"
              },
              placeholder: {
                labelName: "Enter Indent No.",
                labelKey: "STORE_PURCHASE_ORDER_INDENT_NO_PLACEHOLDER"
              },
              pattern: getPattern("alpha-numeric"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].indentNumber"
            })
          },
          materialDscptn: {
            ...getTextField({
              label: {
                labelName: "Material Description",
                labelKey: "STORE_MATERIAL_DESCRIPTION"
              },
              placeholder: {
                labelName: "Enter Material Description",
                labelKey: "STORE_MATERIAL_DESCRIPTION_PLCHLDER"
              },
              //pattern: getPattern("alpha-numeric"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].material.description"
            })
          },
          indentQuantity: {
            ...getTextField({
              label: {
                labelName: "Total Indent Quantity",
                labelKey: "STORE_PURCHASE_ORDER_INDENT_QUNTITY"
              },
              placeholder: {
                labelName: "Enter Indent Quantity",
                labelKey: "STORE_PURCHASE_ORDER_INDENTT_QUNTITY_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].indentQuantity"
            })
          },
          userQuantity: {
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
          orderQuantity: {
            ...getTextField({
              label: {
                labelName: "Order Quantity",
                labelKey: "STORE_PURCHASE_ORDER_ORDR_QLTY"
              },
              placeholder: {
                labelName: "Enter Order Quantity",
                labelKey: "STORE_PURCHASE_ORDER_BLNC_ORDR_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].orderQuantity"
            })
          },
          uomName: {
            ...getTextField({
              label: {
                labelName: "UOM Name",
                labelKey: "STORE_PURCHASE_ORDER_UOM"
              },
              placeholder: {
                labelName: "Enter UOM Name",
                labelKey: "STORE_PURCHASE_ORDER_UOM_PLACEHOLDER"
              },
              required: true,
              pattern: getPattern("alpha-numeric"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].uom.name"
            })
          },
          unitPrice: {
            ...getTextField({
              label: {
                labelName: "Unit Price",
                labelKey: "STORE_PURCHASE_ORDER_UNIT_PRC"
              },
              placeholder: {
                labelName: "Enter Unit Price",
                labelKey: "STORE_PURCHASE_ORDER_UNIT_PRC_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].unitPrice"
            })
          },
          receivedQuantity: {
            ...getTextField({
              label: {
                labelName: "Total Value",
                labelKey: "STORE_PURCHASE_ORDER_TOTAL_VALUE"
              },
              placeholder: {
                labelName: "Enter value",
                labelKey: "STORE_PURCHASE_ORDER_TOTAL_VALUE_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].receivedQuantity"
            })
          },
          tenderQuantity: {
            ...getTextField({
              label: {
                labelName: "Tender Quantity",
                labelKey: "STORE_PURCHASE_ORDER_TENDER_QLTY"
              },
              placeholder: {
                labelName: "Enter Tender Quantity",
                labelKey: "STORE_PURCHASE_ORDER_TENDER_QLTY_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].tenderQuantity"
            })
          },
          usedQuantity: {
            ...getTextField({
              label: {
                labelName: "Used Quantity",
                labelKey: "STORE_PURCHASE_ORDER_USED_QLTY"
              },
              placeholder: {
                labelName: "Enter Used Quantity",
                labelKey: "STORE_PURCHASE_ORDER_USED_QLTY_PLACEHOLDER"
              },
              pattern: getPattern("numeric-only"),
              jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].usedQuantity"
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
    // onMultiItemAdd: (state, muliItemContent) => {
    //   let preparedFinalObject = get(
    //     state,
    //     "screenConfiguration.preparedFinalObject",
    //     {}
    //   );
    //   let cardIndex = get(muliItemContent, "assignFromDate.index");
    //   let cardId = get(
    //     preparedFinalObject,
    //     `Employee[0].assignments[${cardIndex}].id`
    //   );
    //   if (cardId) {
    //     let isCurrentAssignment = get(
    //       preparedFinalObject,
    //       `Employee[0].assignments[${cardIndex}].isCurrentAssignment`
    //     );
    //     Object.keys(muliItemContent).forEach(key => {
    //       if (isCurrentAssignment && key === "currentAssignment") {
    //         set(muliItemContent[key], "props.disabled", false);
    //       } else {
    //         set(muliItemContent[key], "props.disabled", true);
    //       }
    //     });
    //   } else {
    //     Object.keys(muliItemContent).forEach(key => {
    //       if (key === "dummyDiv") {
    //         set(muliItemContent[key], "props.disabled", true);
    //       } else {
    //         set(muliItemContent[key], "props.disabled", false);
    //       }
    //     });
    //   }
    //   return muliItemContent;
    // },
    items: [],
    addItemLabel: {
      labelName: "ADD",
      labelKey: "STORE_COMMON_ADD_BUTTON"
    },
    headerName: "Purchase Order Details",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "purchaseOrders[0].purchaseOrderDetails",
    prefixSourceJsonPath:
      "children.cardContent.children.poDetailsCardContainer.children",
   // disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

export const purchaseOrderDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Purchase Order Details",
      labelKey: "STORE_PO_DETAILS_HEADER "
    },
    {
      style: {  
        marginBottom: 18
      }
    }
  ),
  // subheader: getCommonSubHeader({
  //   labelName:
  //     "Verify entered details before submission. Assignment details cannot be edited once submitted.",
  //   labelKey: "HR_ASSIGN_DET_SUB_HEADER"
  // }),
  purchaseOrderDetailsCard
});
