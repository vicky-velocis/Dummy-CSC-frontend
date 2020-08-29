import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";
import React, { Component } from "react";
import { Button} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import set from "lodash/set";
import Label from "egov-ui-kit/utils/translationNode";
import {
  LabelContainer,

} from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { downloadInventoryPdf} from '../../ui-config/screens/specs/utils'
import store from "ui-redux/store";
import { getprintpdf } from "../../ui-utils/storecommonsapi";
import "./index.scss";
class InventoryContainer extends Component {

  state = {
    open: false,
    action: ""
  };

  onPrintClick=async()=>{  
    const { prepareFinalObject, toggleSnackbar, state,ProcessInstances } = this.props;

    try{
      let searchScreenObject = get(
              state.screenConfiguration.preparedFinalObject,
              "searchScreen",
              {}
            );
            
            // const response = await getprintpdf(queryObject,APIUrl);
            // if(response)
            // {
            //   let filestoreId = response.filestoreIds[0]
            //   downloadReceiptFromFilestoreID(filestoreId,mode,tenantId)
            // }
            downloadInventoryPdf(searchScreenObject);
    }
    catch(e)
    {
      toggleSnackbar(
        true,
        {
        labelName: "Workflow returned empty object !",
        labelKey: "PENSION_API_EXCEPTION_ERROR"
        },
        "error"
        );
        store.dispatch(toggleSpinner());

    }
   
  
    }
    componentDidMount = async () => {
      const { prepareFinalObject, toggleSnackbar } = this.props;
      
    };
    render() {
        const {  ProcessInstances,
          state,
          InventoryData,         
          moduleName } = this.props;
          
        return  ( <div>
          {
            InventoryData&&InventoryData[0]&&(              
              <div>
                
            {/* <table 
            style={{
              width: "100%",
            }}>
            <tr><td  style={{
              textAlign: "center",
            }}>  <Label labelClassName="" label={InventoryData.InventoryHeaderData[0].Title.key} /></td></tr>
            <tr><td  style={{
              textAlign: "center",
            }}><Label labelClassName="" label={InventoryData.InventoryHeaderData[0].SubTitle.key} /></td></tr>           
          </table> */}
           <table 
            style={{
              width: "100%",
            }}>
           <tr><td  style={{
              textAlign: "left",
              width:"15%"
            }}><Label labelClassName="" label="STORE_DETAILS_STORE_NAME" /></td>
            <td><Label labelClassName="" label={InventoryData[0].storeName} /></td>
            <td style={{
              textAlign: "right",
             
            }}> 

            <Button  color="primary" onClick={() => this.onPrintClick()}  style={{ alignItems: "right"}}>
                                     <LabelContainer
                                             labelName="PRINT"
                                             labelKey="STORE_PRINT"
                                             color="#FE7A51"/> </Button>
            </td>
            </tr>
           <tr><td  style={{
              textAlign: "left",
            }}><Label labelClassName="" label="STORE_DETAILS_DEPARTMENT_NAME" /></td>
            <td><Label labelClassName="" label={InventoryData[0].storeDepartment} /></td>
            </tr>
           <tr><td  style={{
              textAlign: "left",
            }}><Label labelClassName="" label="STORE_MATERIAL_NAME" /></td>
            <td><Label labelClassName="" label={InventoryData[0].materialName} /></td>
            </tr>        
          </table>
          </div>
            )
          }
         {/* {
           InventoryData&&InventoryData.InventoryHeaderData&&(
             <div style={{overscrollBehaviorX:"auto"}}>
             <table  id="reportTable"
             style={{
               width: "100%",
               marginBottom:"0px"
             }}
             className="table table-striped table-bordered">
             <thead>

<tr className="report-table-header">
  {
      InventoryData.InventoryHeaderData&&InventoryData.InventoryHeaderData[0].Rowdata.map((item, i) => {
       
          return (
            <th key={i}  style={{ verticalAlign:"middle", textAlign: "center"}}>
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label={item.value}
              />
              {item.data&&(
              <table id="Inventorycol"
             style={{
               width: "100%",
               marginBottom:"0px"
             }}
             className="table table-striped table-bordered">
               
                      <thead>
                      <tr className="report-table-header">
              {                
                item.data&& item.data.map((item,i)=>{
                  return(                   
                        <th>                          
                           <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold" }}
                label={item.value}
              />
              </th>
            
                 )
                }

                )
              }
              </tr>
              </thead>
             
                 
                    </table>
            )}
            </th>
          );
        
           })

  }
</tr>
             </thead>
             {
                InventoryData.InventoryRowdata&&(
                  <tbody>
                     {
                        InventoryData.InventoryRowdata.map((item,i)=>{
                          return(
                            <tr>
                              <th>{item.srNo}</th>
                              <th>{item.openingQty}</th>
                              <th>{item.openingUom}</th>
                              <th>{item.openingRate}</th>
                              <th>{item.receiptDate}</th>
                              <th>{item.receiptNo}</th>
                              <th>{item.receiptDepartment}</th>
                              <th>{item.receiptPurchaseQty}</th>
                              <th>{item.receiptPurchaseUom}</th>
                              <th>{item.receiptPurchaseUnitRate}</th>
                              <th>{item.receiptTotalValue}</th>
                              <th>{item.issuedDate}</th>
                              <th>{item.issuedNo}</th>
                              <th>{item.issuedToDepartment}</th>
                              <th>{item.issuedQty}</th>
                              <th>{item.issuedUom}</th>
                              <th>{item.issuedUnitRate}</th>
                              <th>{item.issuedTotalValue}</th>
                              <th>{item.balanceQty}</th>
                              <th>{item.balanceUom}</th>
                              <th>{item.balanceTotalValue}</th>
                            </tr>
                          )
                        
                        })
                     }

                </tbody>
                )
                
              }
             </table>
           </div>
           )
         } */}
         {
           InventoryData&&InventoryData[0]&&( 
           <div style={{ overscrollBehaviorX:"overlay",overflow:"overlay"}}>
             
              <table  id="reportTable"
             style={{
               width: "100%",
               marginBottom:"0px"
             }}
             className="table table-striped table-bordered">
             <thead>
             <tr className="report-table-header">
             <th   style={{ verticalAlign:"middle", textAlign: "center"}} rowspan="2">
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Sr No."
              />
              </th>
              <th  style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="3">
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Opening Balance"
              />
              </th>
             
              <th  style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="7">
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Receipt"
              />
              </th>             
              <th  style={{ verticalAlign:"middle", textAlign: "center"}} colSpan="7">
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issue"
              />
              </th>             
              <th  style={{ verticalAlign:"middle", textAlign:"center"}} colSpan="3">
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Balance"
              />
              </th>             
             </tr>
             <tr>
            
              <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
              <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Qty."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Value"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Receipt Date"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Material Receipt No."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Department"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Purchase Qty."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Purchase Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Rate per Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Total value of Inventory"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issue Date"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issue No."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issued Department Name"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issued Qty."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Issued Qty Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Rate per Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Total Value"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Qty."
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Unit"
              />
             </th>
             <th  style={{ verticalAlign:"middle", textAlign: "center",columnSpan:"1"}}>
             <Label
                className="report-header-row-label"
                labelStyle={{ wordWrap: "unset", wordBreak: "unset", fontWeight: "bold", }}
                label="Value"
              />
             </th>
             </tr>
             </thead>
             {
                InventoryData[0]&&(
                  <tbody>
                     {
                       InventoryData[0].invetoryDetails.map((item,i)=>{
                          return(
                            <tr>
                              <th>{item.srNo}</th>
                              <th>{item.openingQty}</th>
                              <th>{item.openingUom}</th>
                              <th>{item.openingRate}</th>
                              <th>{item.receiptDate}</th>
                              <th>{item.receiptNo}</th>
                              <th>{item.receiptDepartment}</th>
                              <th>{item.receiptPurchaseQty}</th>
                              <th>{item.receiptPurchaseUom}</th>
                              <th>{item.receiptPurchaseUnitRate}</th>
                              <th>{item.receiptTotalValue}</th>
                              <th>{item.issuedDate}</th>
                              <th>{item.issuedNo}</th>
                              <th>{item.issuedToDepartment}</th>
                              <th>{item.issuedQty}</th>
                              <th>{item.issuedUom}</th>
                              <th>{item.issuedUnitRate}</th>
                              <th>{item.issuedTotalValue}</th>
                              <th>{item.balanceQty}</th>
                              <th>{item.balanceUom}</th>
                              <th>{item.balanceTotalValue}</th>
                            </tr>
                          )
                        
                        })
                     }

                </tbody>
                )
                
              }
             </table>
             </div>
           )
        }
           
           </div>);
      }
  }
  const mapStateToProps = state => {
    const { auth, app } = state;
    const { menu } = app;
    const { userInfo } = auth;
    const name = auth && userInfo.name;
    let InventoryData = get(
      state,
      "screenConfiguration.preparedFinalObject.InventoryAPIData",
      []
    );
    return { name, menu,state,InventoryData };
  };


  const mapDispacthToProps = dispatch => {
    return {
      prepareFinalObject: (path, value) =>
        dispatch(prepareFinalObject(path, value)),
      toggleSnackbar: (open, message, variant) =>
        dispatch(toggleSnackbar(open, message, variant)),dispatch
    };
  };
  export default connect(
    mapStateToProps,
    mapDispacthToProps
    
  )(InventoryContainer);