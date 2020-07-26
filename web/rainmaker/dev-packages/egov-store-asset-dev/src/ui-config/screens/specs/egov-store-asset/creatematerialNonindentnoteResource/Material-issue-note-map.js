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
  import{getOpeningBalanceSearchResults} from '../../../../../ui-utils/storecommonsapi'
  const getBalanceQty = async (action, state, dispatch) => {
    const tenantId = getTenantId();
    const storecode = get(state.screenConfiguration.preparedFinalObject,"materialIssues[0].fromStore.code", '' )
    let queryObject = [
      {
        key: "tenantId",
        value: tenantId,
      },
    ];
    queryObject.push({
      key: "storeName",
      value: storecode
    });
  
      
    try {
      let response = await getOpeningBalanceSearchResults(queryObject, dispatch);
      //let c = response.materialReceipt[0].receiptDetails[0].

      let  materialReceipt = response.materialReceipt
      console.log(materialReceipt[0].receiptDetails[0].userAcceptedQty)
      let matcode = get(state.screenConfiguration.preparedFinalObject,"materialIssues[0].indent.indentDetails[0].materialIssueDetails[0].material.code", '' )
      //alert(materialReceipt[0].receiptDetails[0].material.code +'_'+matcode)
      // if (matcode === materialReceipt[0].receiptDetails[0].material.code)
      // {
       
        //BalanceQty
        dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.BalanceQty",materialReceipt[0].receiptDetails[0].userAcceptedQty));
        //materialIssues[0].materialIssueDetails[0].indentDetail.UnitPrice
        dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.UnitPrice",materialReceipt[0].receiptDetails[0].unitRate));
      // }
      // else
      // {
      //   dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",0));
      // }
      // materialReceipt = materialReceipt.filter(x=>x.receivingStore.code === storecode)
      // console.log(materialReceipt[0])
      
     
      
    } catch (e) {
      console.log(e);
    }
  };
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
            ReceiptNo: {
              ...getSelectField({
                label: {
                  labelName: "Receipt No.",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_RECEIPT_NO"
                },
                placeholder: {
                  labelName: "Select Receipt No.",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_RECEIPT_NO_SELECT"
                },
                required: true,               
                jsonPath: "materialIssues[0].materialIssueDetails[0].mrnNumber",
                //sourceJsonPath: "materials",
               // sourceJsonPath: "indentsmaterial",
                props: {
                  data: [
                    {
                      code: "MRN/00003/2017",
                      name: "MRN/00003/2017"
                    },
                   
                  ],
                  optionValue: "code",
                  optionLabel: "name",
                  // optionValue: "id",
                  // optionLabel: "id",
                },
              }),


            },
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
                jsonPath: "materialIssues[0].materialIssueDetails[0].receiptId",
                //sourceJsonPath: "materials",
                sourceJsonPath: "indentsmaterial",
                props: {
                  optionValue: "materialCode",
                  optionLabel: "materialName",
                  // optionValue: "id",
                  // optionLabel: "id",
                },
              }),
              beforeFieldChange: (action, state, dispatch) => {
                let Material = get(
                  state.screenConfiguration.preparedFinalObject,
                  `NonIndentMaterial`,
                  []
                ); 
                if(Material && Material[0])
                {
                            
                dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.material.code",indentsmaterial[0].materialCode));                
                dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.uom.code",indentsmaterial[0].uomCode));                
                dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.balanceQty",indentsmaterial[0].balance));
                dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.unitRate",indentsmaterial[0].unitRate));
               
                
              }

              }

            },
            balanceQty: {
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
                jsonPath: "materialIssues[0].materialIssueDetails[0].balanceQty"
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
                jsonPath: "materialIssues[0].materialIssueDetails[0].userQuantityIssued"
              }),
              beforeFieldChange: (action, state, dispatch) => {               
                // let UnitPrice = get(state.screenConfiguration.preparedFinalObject,`materialIssues[0].materialIssueDetails[0].indentDetail.unitRate`,0)
                // let BalanceQty = get(state.screenConfiguration.preparedFinalObject,`materialIssues[0].materialIssueDetails[0].indentDetail.balanceQty`,0)               
                // let BalanceQtyAfterIssue = BalanceQty - Number(action.value)
                // let TotalValue = Number(UnitPrice)* Number(action.value)
                // let pendingIndentQuantity = 0
                // let indentQty = get(state.screenConfiguration.preparedFinalObject,`materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity`,0)
                // pendingIndentQuantity = indentQty- Number(action.value)
                // dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].userQuantityIssued",Number(action.value)));
                // dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.userQuantity",Number(action.value)));
                // // calculation after input qty
                // dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.BalanceQtyAfterIssue",BalanceQtyAfterIssue));
                // dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].indentDetail.TotalValue",TotalValue)); 
                // dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].pendingIndentQuantity",pendingIndentQuantity));
              }
            },
            uomCode: {
              ...getTextField({
                label: {
                  labelName: "UOM",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UOM_NAME"
                },
                placeholder: {
                  labelName: "UOM",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_UOM_NAME"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0]..materialIssueDetails[0].uom.code"
              })
            },
            unitRate: {
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
                jsonPath: "materialIssues[0].materialIssueDetails[0].unitRate"
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
                jsonPath: "materialIssues[0].materialIssueDetails[0].BalanceQtyAfterIssue"
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
                props:{
                  disabled:true
                },
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].materialIssueDetails[0].TotalValue"
              })
            },
            Remark: {
              ...getTextField({
                label: {
                  labelName: "Remark",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK"
                },
                placeholder: {
                  labelName: "Enter Remark",
                  labelKey: "STORE_MATERIAL_INDENT_NOTE_REMARK_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "materialIssues[0].materialIssueDetails[0].description"
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
        labelName: "Add ",
        labelKey: "STORE_MATERIAL_COMMON_CARD_ADD"
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
        labelName: "Non-Indent Material Issue Details",
        labelKey: "STORE_MATERIAL_INDENT_NOTE_NON_INDENT_MATERIAL_ISSUE_NOTE_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    materialIssueCard
  });