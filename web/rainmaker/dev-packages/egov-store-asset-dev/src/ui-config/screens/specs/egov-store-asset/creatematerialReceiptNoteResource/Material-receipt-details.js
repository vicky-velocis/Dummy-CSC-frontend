import {
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getDateField,
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
      if (matcode === materialReceipt[0].receiptDetails[0].material.code)
      {
       
        //BalanceQty
        dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].indentDetail.BalanceQty",materialReceipt[0].receiptDetails[0].userAcceptedQty));
        //materialReceipt[0].receiptDetails[0].indentDetail.UnitPrice
        dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].indentDetail.UnitPrice",materialReceipt[0].receiptDetails[0].unitRate));
      }
      else
      {
        dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].indentDetail.indentQuantity",0));
      }
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
  
  const materialReceiptCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        materialReceiptCardContainer: getCommonContainer(
          {
            PONo: {
              ...getSelectField({
                label: {
                  labelName: "PO No",
                  labelKey: "STORE_MATERIAL_RECEIPT_PO_NUMBER"
                },
                placeholder: {
                  labelName: "Select PO No",
                  labelKey: "STORE_MATERIAL_RECEIPT_PO_NUMBER_SELECT"
                },
                required: true,               
                jsonPath: "materialReceipt[0].receiptDetails[0].purchaseOrderDetail.id",
                sourceJsonPath: "purchaseOrder.purchaseOrders",
                props: {
                  optionValue: "id",
                  optionLabel: "purchaseOrderNumber",
                  // optionValue: "id",
                  // optionLabel: "id",
                },
              }),
              beforeFieldChange: (action, state, dispatch) => {
                let purchaseOrder = get(
                  state.screenConfiguration.preparedFinalObject,
                  `purchaseOrder.purchaseOrders`,
                  []
                ); 
                purchaseOrder =  purchaseOrder.filter(x=> x.id === action.value) 
                if(purchaseOrder && purchaseOrder[0])  
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].purchaseOrderDetail.name",purchaseOrder[0].purchaseOrderNumber));
                //set material dropdown based on po selection
                let material=[];
                let purchaseOrderDetails =get(
                  purchaseOrder[0],
                  `purchaseOrderDetails`,
                  []
                );
                for (let index = 0; index < purchaseOrderDetails.length; index++) {
                  const element = purchaseOrderDetails[index];
                  material.push( element.material)
                  
                }
                dispatch(prepareFinalObject("ReceiptMaterial",material));
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].uom.code",purchaseOrderDetails[0].uom.code));
                //set AvailableQty from  po purchaseOrderDetails 0 index receivedQuantity,orderQuantity,unitPrice(unitRate)
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].AvailableQty",purchaseOrderDetails[0].receivedQuantity));
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].orderQuantity",purchaseOrderDetails[0].orderQuantity));
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].unitRate",purchaseOrderDetails[0].unitPrice));
              }

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
                jsonPath: "materialReceipt[0].receiptDetails[0].material.code",
                //sourceJsonPath: "createScreenMdmsData.store-asset.Material",
                sourceJsonPath:"ReceiptMaterial",
                props: {
                  optionValue: "code",
                  optionLabel: "name",
                  // optionValue: "id",
                  // optionLabel: "id",
                },
              }),
              beforeFieldChange: (action, state, dispatch) => {
                
                let materials = get(
                  state.screenConfiguration.preparedFinalObject,
                  `ReceiptMaterial`,
                  []
                ); 
                materials =  materials.filter(x=> x.code === action.value)   
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].material.name",materials[0].name));
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].MaterialNameDesc",materials[0].description));
                //dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].uom.code",materials[0].baseUom.code));
               // dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].uom.name",materials[0].name));

              }

            },
            MaterialNameDesc: {
              ...getTextField({
                label: {
                  labelName: "Material Description",
                  labelKey: "STORE_MATERIAL_DESCRIPTION"
                },
                placeholder: {
                  labelName: "Material Description",
                  labelKey: "STORE_MATERIAL_DESCRIPTION"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].MaterialNameDesc"
              })
            },
            UOMName: {
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
                jsonPath: "materialReceipt[0].receiptDetails[0].uom.code"
              })
            },
            AvailableQty: {
              ...getTextField({
                label: {
                  labelName: "Available Qty",
                  labelKey: "STORE_MATERIAL_RECEIPT_AVAILABLE_QTY"
                },
                placeholder: {
                  labelName: "Available Qty",
                  labelKey: "STORE_MATERIAL_RECEIPT_AVAILABLE_QTY_PLACEHOLDER"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].AvailableQty"
              })
            },
            orderQuantity: {
              ...getTextField({
                label: {
                  labelName: "Ordered Qty",
                  labelKey: "STORE_MATERIAL_RECEIPT_ORDERED_QTY"
                },
                placeholder: {
                  labelName: "Ordered Qty",
                  labelKey: "STORE_MATERIAL_RECEIPT_ORDERED_QTY_PLACEHOLDER"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].orderQuantity"
              })
            },
            QtyasperChallan: {
              ...getTextField({
                label: {
                  labelName: "Qty. as per Challan",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_AS_PER_CHALLAN"
                },
                placeholder: {
                  labelName: "Qty. as per Challan",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_AS_PER_CHALLAN_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].QtyasperChallan"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                  }
            },
            Rateperunit: {
              ...getTextField({
                label: {
                  labelName: "Qty Rate per unit",
                  labelKey: "STORE_MATERIAL_RECEIPT_RATE_PER_UNIT"
                },
                placeholder: {
                  labelName: "Enter Rate per unit",
                  labelKey: "STORE_MATERIAL_RECEIPT_RATE_PER_UNIT_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].Rateperunit"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                 }
            },
            TotalPrice: {
              ...getTextField({
                label: {
                  labelName: "Total Price",
                  labelKey: "STORE_MATERIAL_RECEIPT_TOTAL_PRICE"
                },
                placeholder: {
                  labelName: "Enter Total Price",
                  labelKey: "STORE_MATERIAL_RECEIPT_TOTAL_PRICE_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].TotalPrice"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                  }
            },
            QtyReceived: {
              ...getTextField({
                label: {
                  labelName: "Qty. Received",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_RECEIVED"
                },
                placeholder: {
                  labelName: "Enter Qty. Received",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_RECEIVED_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receivedQty"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                     }
            },
            QtyAccepted: {
              ...getTextField({
                label: {
                  labelName: "Qty. Accepted",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_ACCEPTED"
                },
                placeholder: {
                  labelName: "Enter Qty. Accepted",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_ACCEPTED_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].acceptedQty"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                let receivedQty =   get(state.screenConfiguration.preparedFinalObject,`materialReceipt[0].receiptDetails[0].receivedQty`,0)
                let QtyRejected = Number(receivedQty) - Number(action.value)
                dispatch(prepareFinalObject("materialReceipt[0].receiptDetails[0].QtyRejected",QtyRejected));
                     }
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
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].unitRate"
              })
            },
            QtyRejected: {
              ...getTextField({
                label: {
                  labelName: "Qty. Rejected",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_REJECTED"
                },
                placeholder: {
                  labelName: "Qty. Rejected",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_REJECTED_PLACEHOLDER"
                },
                props:{
                  disabled:true
                },
                required: false,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].QtyRejected"
              })
            },
            Rejectionremarks: {
              ...getTextField({
                label: {
                  labelName: "Rejection remarks",
                  labelKey: "STORE_MATERIAL_RECEIPT_REJECTION_REMARKS"
                },
                placeholder: {
                  labelName: "Enter Rejection remarks",
                  labelKey: "STORE_MATERIAL_RECEIPT_REJECTION_REMARKS_PLACEHOLDER"
                },
                props: {
                  className: "applicant-details-error",
                  multiline: "multiline",
                  rowsMax: 2,
                },
                required: false,
                pattern: getPattern("eventDescription") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].rejectionRemark"
              })
            },
            ValueofQtyaccepted: {  
              ...getTextField({
                label: {
                  labelName: "Value of Qty. accepted",
                  labelKey: "STORE_MATERIAL_RECEIPT_VALUE_OF_QTY_ACCEPTED"
                },
                placeholder: {
                  labelName: "Enter Value of Qty. accepted",
                  labelKey: "STORE_MATERIAL_RECEIPT_VALUE_OF_QTY_ACCEPTED_PLACEHOLDER"
                },
                props:{
                  disabled:true
                },
                required: true,
                pattern: getPattern("Amount") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].ValueofQtyaccepted"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                let acceptedQty =   get(state.screenConfiguration.preparedFinalObject,`materialReceipt[0].receiptDetails[0].acceptedQty`,0)
                let unitRate = get(state.screenConfiguration.preparedFinalObject,`materialReceipt[0].receiptDetails[0].unitRate`,0)
                let ValueofQtyaccepted = Number(acceptedQty) * Number(unitRate)
                dispatch(prepareFinalObject("materialIssues[0].materialIssueDetails[0].ValueofQtyaccepted",Number(ValueofQtyaccepted)));

                     }
            },
            lotNo: {
              ...getTextField({
                label: {
                  labelName: "LOT No",
                  labelKey: "STORE_MATERIAL_RECEIPT_LOT_NO"
                },
                placeholder: {
                  labelName: "Enter LOT No",
                  labelKey: "STORE_MATERIAL_RECEIPT_LOT_NO_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receiptDetailsAddnInfo[0].lotNo"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                     }
            },
            serialNo: {
              ...getTextField({
                label: {
                  labelName: "Serial No.",
                  labelKey: "STORE_MATERIAL_RECEIPT_SERIAL_NO"
                },
                placeholder: {
                  labelName: "Enter Serial No.",
                  labelKey: "STORE_MATERIAL_RECEIPT_SERIAL_NO_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receiptDetailsAddnInfo[0].serialNo"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                     }
            },
            batchNo: {
              ...getTextField({
                label: {
                  labelName: "Batch No.",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_RECEIVED"
                },
                placeholder: {
                  labelName: "Enter Batch No.",
                  labelKey: "STORE_MATERIAL_RECEIPT_QTY_RECEIVED_PLACEHOLDER"
                },
                props:{
                  disabled:false
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receiptDetailsAddnInfo[0].batchNo"
              }),
              beforeFieldChange: (action, state, dispatch) => {
                     }
            },
            ManufacturerDate : {
              ...getDateField({
                label: {
                  labelName: "Manufacturer Date",
                  labelKey: "STORE_MATERIAL_RECEIPT_MANUFACTURER_DATE "
                },
                placeholder: {
                  labelName: "Enter Manufacturer Date",
                  labelKey: "STORE_MATERIAL_RECEIPT_MANUFACTURER_DATE_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Date") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receiptDetailsAddnInfo[0].manufactureDate"
              })
            },
            expiryDate : {
              ...getDateField({
                label: {
                  labelName: "Expiry Date",
                  labelKey: "STORE_MATERIAL_RECEIPT_EXPIRY_DATE "
                },
                placeholder: {
                  labelName: "Enter Expiry Date",
                  labelKey: "STORE_MATERIAL_RECEIPT_EXPIRY_DATE_PLACEHOLDER"
                },
                required: true,
                pattern: getPattern("Date") || null,
                jsonPath: "materialReceipt[0].receiptDetails[0].receiptDetailsAddnInfo[0].expiryDate"
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
      sourceJsonPath: "materialReceipt[0].receiptDetails[0]",
      prefixSourceJsonPath:
        "children.cardContent.children.materialIssueCardContainer.children"
    },
    type: "array"
  };
  
  export const materialReceiptDetail = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Material Receipt Details",
        labelKey: "STORE_MATERIAL_RECEIPT_MATERIAL_RECEIPT_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    materialReceiptCard
  });