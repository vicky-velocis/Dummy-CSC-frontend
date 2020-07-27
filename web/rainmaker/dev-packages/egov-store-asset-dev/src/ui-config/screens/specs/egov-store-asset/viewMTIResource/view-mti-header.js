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
   const createUrl = `/egov-store-asset/create-material-transfer-indent?step=0`;
  dispatch(setRoute(createUrl));
};

export const getMTIHeaderView = (isReview = true) => {
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
            labelName: "Material Transfer Indent",
            labelKey: "STORE_MTI_HEADER"
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
    viewOne: getCommonContainer({
      indentStore: getLabelWithValue(
        {
          labelName: "Indenting Store",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_STORE"
        },
        { jsonPath: "purchaseOrders[0].purchaseType" }
      ),
      indentDate: getLabelWithValue(
        {
          labelName: "Indent Date",
          labelKey: "STORE_MATERIAL_INDENT_INDENT_DATE"
        },
        { jsonPath: "purchaseOrders[0].store.name" }
      ),
      indentPurpose: getLabelWithValue(
        { labelName: "Indent Purpose", labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE" },
        { jsonPath: "purchaseOrders[0].purchaseOrderDate" }
      ),
      issuingStoreName: getLabelWithValue(
        {
          labelName: "Issuing Store Name",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME"
        },
        { jsonPath: "purchaseOrders[0].rateType" }
      ),
      remarks: getLabelWithValue(
        { labelName: "Remarks", labelKey: "STORE_PURCHASE_ORDER_REMARK" },
        {
          jsonPath: "purchaseOrders[0].supplier.name",
        }
      ),
      createdBy: getLabelWithValue(
        { labelName: "Created by", labelKey: "STORE_PURCHASE_ORDER_CREATEBY" },
        {
          jsonPath: "purchaseOrders[0].advancePercentage"
        }
      ),
      designation: getLabelWithValue(
        { labelName: "Designation", labelKey: "STORE_PURCHASE_ORDER_DSGNTN" },
        {
          jsonPath: "purchaseOrders[0].designation",
        }
      ),
    }),
  });
};
