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
   const createUrl = `/egov-store-asset/create-material-transfer-outward?step=0`;
  dispatch(setRoute(createUrl));
};

export const getMTONHeaderView = (isReview = true) => {
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
            labelName: "Material Transfer Outward",
            labelKey: "STORE_MTON_HEADER"
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
      issuingStoreName: getLabelWithValue(
        {
          labelName: "Issuing Store Name",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUING_STORE_NAME"
        },
        { jsonPath: "purchaseOrders[0].rateType" }
      ),
      issueDate: getLabelWithValue(
        {
          labelName: "Issue Date",
          labelKey: "STORE_MATERIAL_INDENT_NOTE_ISSUE_DATE"
        },
        { jsonPath: "purchaseOrders[0].rateType" }
      ),
      transferIndentNo: getLabelWithValue(
        {
          labelName: "Transfer Indent No.",
          labelKey: "STORE_MTON_INDENT_NUMBER"
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
      indentingStore: getLabelWithValue(
        { labelName: "Indenting Store", labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENTING_STORE" },
        { jsonPath: "purchaseOrders[0].purchaseOrderDate" }
      ),
      indentDeptName: getLabelWithValue(
        { labelName: "Indenting Dept. Name", labelKey: "STORE_MTON_INDENT_DEPT_NAME" },
        { jsonPath: "purchaseOrders[0].purchaseOrderDate" }
      ),
      indentPurpose: getLabelWithValue(
        { labelName: "Indent Purpose", labelKey: "STORE_MATERIAL_INDENT_INDENT_PURPOSE" },
        { jsonPath: "purchaseOrders[0].purchaseOrderDate" }
      ),
      indentRaisedBy: getLabelWithValue(
        { labelName: "Indent Raised By", labelKey: "STORE_PURCHASE_ORDER_INDENT_RAISED" },
        { jsonPath: "purchaseOrders[0].purchaseOrderDate" }
      ),
      issuedToEmployee: getLabelWithValue(
        {
          labelName: "Issued to Employee",
          labelKey: "STORE_MTON_ISSUED_TO_EMP"
        },
        { jsonPath: "purchaseOrders[0].rateType" }
      ),
      designation: getLabelWithValue(
        { labelName: "Designation", labelKey: "STORE_PURCHASE_ORDER_DSGNTN" },
        {
          jsonPath: "purchaseOrders[0].designation",
        }
      ),
      remarks: getLabelWithValue(
        { labelName: "Remarks", labelKey: "STORE_PURCHASE_ORDER_REMARK" },
        {
          jsonPath: "purchaseOrders[0].supplier.name",
        }
      ),
      issuedBy: getLabelWithValue(
        { labelName: "Issued by", labelKey: "STORE_PURCHASE_ORDER_ISSUEDBY" },
        {
          jsonPath: "purchaseOrders[0].advancePercentage"
        }
      ),
      designationIssuedEmp: getLabelWithValue(
        { labelName: "Designation", labelKey: "STORE_PURCHASE_ORDER_DSGNTN" },
        {
          jsonPath: "purchaseOrders[0].designation",
        }
      ),
    }),
  });
};
