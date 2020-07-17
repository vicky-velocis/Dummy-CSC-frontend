import {
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern,
    getCommonContainer
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import get from "lodash/get";
  import filter from "lodash/filter";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
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
  
  const materialIssueCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        materialIssueCardContainer: getCommonContainer(
          {
            MaterialName: {
              ...getSelectField({
                label: {
                  labelName: "Material Nmae",
                  labelKey: "STORE_MATERIAL_NAME"
                },
                placeholder: {
                  labelName: "Select Material Name",
                  labelKey: "STORE_MATERIAL_NAME_SELECT"
                },
                required: true,               
                jsonPath: "materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.code",
                sourceJsonPath: "materials",
                props: {
                  optionValue: "code",
                  optionLabel: "name",
                  // optionValue: "id",
                  // optionLabel: "id",
                },
              }),
              beforeFieldChange: (action, state, dispatch) => {
                let Material = get(
                  state.screenConfiguration.preparedFinalObject,
                  `materials`,
                  []
                );               
                Material =  Material.filter(x=> x.code === action.value)
                console.log(Material)
                let indentDetails = get(
                  state.screenConfiguration.preparedFinalObject,
                  `materialIssues[0].indent.indentDetails`,
                  []
                ); 
                indentDetails = indentDetails.filter(x=> x.code === action.value)
                if(Material && Material[0])
                {
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.id",Material[0].id));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.getTenantId",getTenantId()));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.name",Material[0].name));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.description",Material[0].description));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.reorderLevel",Material[0].reorderLevel));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.materialType.id",Material[0].materialType.id));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.materialType.name",Material[0].materialType.name));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.baseUom.id",Material[0].baseUom.id));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.minQuantity",Material[0].minQuantity));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.stockingUom",Material[0].stockingUom));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.purchaseUom",Material[0].purchaseUom));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.inventoryType",Material[0].inventoryType));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.materialClass",Material[0].materialClass));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.maxQuantity",Material[0].maxQuantity));
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.reorderQuantity",Material[0].reorderQuantity));                
                dispatch(prepareFinalObject("materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.materialControlType",Material[0].materialControlType));
              }

              }

            },
            TotalIndentQty: {
              ...getTextField({
                label: {
                  labelName: "Total Indent Qty Required",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_INDENT_QTY_REQUIRED"
                },
                placeholder: {
                  labelName: "Total Indent Qty Required",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_INDENT_QTY_REQUIRED"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.indentDetail.indentQuantity"
              })
            },
            BalanceQty: {
              ...getTextField({
                label: {
                  labelName: "Balance Qty",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_BALANCE_QTY"
                },
                placeholder: {
                  labelName: "Balance Qty",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_BALANCE_QTY"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            QtyIssued: {
              ...getTextField({
                label: {
                  labelName: "Qty Issued",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_QTY_ISSUED"
                },
                placeholder: {
                  labelName: "Enter Qty Issued",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_QTY_ISSUED_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.indentDetail.indentQuantity"
              })
            },
            UOMName: {
              ...getTextField({
                label: {
                  labelName: "Total Indent Qty Required",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UOM_NAME"
                },
                placeholder: {
                  labelName: "Total Indent Qty Required",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UOM_NAME"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            UnitPrice: {
              ...getTextField({
                label: {
                  labelName: "Unit Price",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UNIT_PRICE"
                },
                placeholder: {
                  labelName: "Unit Price",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UNIT_PRICE"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            BalanceQtyAfterIssue: {
              ...getTextField({
                label: {
                  labelName: "Balance Qty After Issue",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_QTY_BALANCE_QTY_AFTER_ISSUE"
                },
                placeholder: {
                  labelName: "Balance Qty After Issue",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_QTY_BALANCE_QTY_AFTER_ISSUE"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            TotalValue: {
              ...getTextField({
                label: {
                  labelName: "Total Value",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_VALUE"
                },
                placeholder: {
                  labelName: "Total Value",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_TOTAL_VALUE"
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            AssestCode: {
              ...getTextField({
                label: {
                  labelName: "Assest Code",
                  labelKey: "Assest Code"
                },
                placeholder: {
                  labelName: "Assest Code",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_ASSEST_CODE"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            ProjectCode: {
              ...getTextField({
                label: {
                  labelName: "Project Code",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_PROJECT_CODE"
                },
                placeholder: {
                  labelName: "Project Code",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_PROJECT_CODE"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
              })
            },
            Remark: {
              ...getTextField({
                label: {
                  labelName: "Remark",
                  labelKey: "Enter Remark"
                },
                placeholder: {
                  labelName: "Total Indent Qty Required",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK_PLACEHOLDER"
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].storeMapping[0].department.name"
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
      items: [],
      addItemLabel: {
        labelName: "Add Material Indent Note",
        labelKey: "STORE_MATERIAL_INDENT_NOTE_ADD_MATERIAL_INDENT"
      },
      headerName: "Material Indent Note",
      headerJsonPath:
        "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "materialIssues[0].jurisdictions",
      prefixSourceJsonPath:
        "children.cardContent.children.materialIssueCardContainer.children"
    },
    type: "array"
  };
  
  export const materialIssue = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Indent Material Issue Details",
        labelKey: "STORE_MATERIAL_INDENT_NOTE_INDENT_MATERIAL_ISSUE_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    materialIssueCard
  });