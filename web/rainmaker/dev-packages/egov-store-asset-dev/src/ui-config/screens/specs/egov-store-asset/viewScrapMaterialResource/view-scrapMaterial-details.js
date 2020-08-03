import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const gotoCreatePage = (state, dispatch) => {
  const createUrl = `/egov-store-asset/create-scrap-material?step=1`;
  dispatch(setRoute(createUrl));
};

const assignmentCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      scrapDetailsCardContainer: getCommonContainer({
        materialName: getLabelWithValue(
          {
            labelName: "Material Name",
            labelKey: "STORE_MATERIAL_NAME"
          },
          { jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].material.name" }
        ),
        lotNo: getLabelWithValue(
          { labelName: "LOT No.", labelKey: "STORE_SCRAP_LOT_NO" },
          {
            jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].uom.name",    
          }
        ),
        balanceQuantity: getLabelWithValue(
          {
            labelName: "Balance Quantity",
            labelKey: "STORE_PURCHASE_ORDER_BLNC_QLTY"
          },
          { jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].indentNumber" }
        ),
        balanceValue: getLabelWithValue(
          { labelName: "Balance Value", labelKey: "STORE_SCRAP_BAL_VALUE" },
          {
            jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].indentQuantity",
          }
        ),
        unitRate: getLabelWithValue(
          {
            labelName: "Unit Rate",
            labelKey: "STORE_MATERIAL_RECEIPT_UNIT_RATE"
          },
          { jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].material.description" }
        ),
        scrapReason: getLabelWithValue(
          { labelName: "Scrap Reason", labelKey: "STORE_SCRAP_REASON" },
          {
            jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].indentQuantity",
          }
        ),
        scrapQty: getLabelWithValue(
          { labelName: "Scrap Qty", labelKey: "STORE_SCRAP_QUANTITY" },
          {
            jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].userQuantity",
          }
        ),
        scrapValue: getLabelWithValue(
          { labelName: "Scrap Value", labelKey: "STORE_SCRAP_VALUE" },
          {
            jsonPath: "purchaseOrders[0].purchaseOrderDetails[0].userQuantity",
          }
        ),
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "purchaseOrders[0].purchaseOrderDetails",
    prefixSourceJsonPath:
      "children.cardContent.children.scrapDetailsCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const getScrapMaterialDetailsView = (isReview = true) => {
  return getCommonGrayCard({
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
            labelName: "Scrap Material Details",
            labelKey: "STORE_SCRAP_DETAILS_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: gotoCreatePage
          }
        }
      }
    },
    viewOne: assignmentCard
  });
};
