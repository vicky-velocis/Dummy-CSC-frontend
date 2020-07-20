import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";

import { Item } from "egov-ui-framework/ui-atoms";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import store from "../../ui-redux/store";
import ImageUpload from "egov-ui-kit/common/common/ImageUpload";
import {
  LabelContainer,
  TextFieldContainer,
} from "egov-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  },
  roleName: {
    label: {
      labelName: "Role Name",
      labelKey: "WF_ROLE_LABEL"
    },
    placeholder: {
      labelName: "Select Role",
      labelKey: "WF_ROLE_PLACEHOLDER"
    }
  },
};
 
class HCActionDialog extends React.Component {
  
  state = {
    employeeList: [],    
    roles: "",
    allEmployeeList:[],
    allEmployeeListOfSDO:[],
    allEmployeeListOfJE:[],
    handleChange: this.props.handleFieldChange,
    path: this.props.dataPath,
    
    
  };
  
  componentDidMount(){
  this.getEmployeeListSDO("SDO")
  this.getEmployeeListJE("JE")
}
  getButtonLabelName = label => {
    
     switch (label) {
       
      case "VERIFY AND FORWARD":        
        return "Verify and Forward";
        case "VERIFY AND FORWARD TO SDO":        
        return "Verify and Forward to SDO";
        case "FORWARD FOR INSPECTION":           
        return "Forward For Inspection";
      case "INSPECT":           
        return "Inspect";
     case "REJECT":          
        return "Reject";
      case "REQUEST CLARIFICATION":      
        return "Request Clarification";
     case "APPROVE":      
        return "APPROVE";
     case "COMPLETE":            
        return "Complete";
      default:
        return label;
    }
  };
  
  getEmployeeListJE = async (rolename)=>  {
    // alert("inside getEmployeeListSDO")
    let employeeListData = [];
    // console.log("^^^^^^^^^^^^^^^^^^savita inside getEmployeeList")
    const tenantId = getTenantId();
    const queryObj = [
      {
        key: "roles",
        value: rolename
      },
      {
        key: "tenantId",
        value: tenantId
      }
    ];
    const payload = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      queryObj
    );
    // debugger;
    

    var dropdownEmployeeListJE = []
    dropdownEmployeeListJE=
      payload &&
      payload.Employees.map((item, index) => {
        const name = get(item, "user.name")     
        return {
        value: item.id,
        label: name
      };
      });
      this.setState({ allEmployeeListOfJE:dropdownEmployeeListJE  });
      // console.log("RRRRRrr",employeeListData)
       
  }
  getEmployeeListSDO = async (rolename)=>  {
    // alert("inside getEmployeeListSDO")
    let employeeListData = [];
    // console.log("^^^^^^^^^^^^^^^^^^savita inside getEmployeeList")
    const tenantId = getTenantId();
    const queryObj = [
      {
        key: "roles",
        value: rolename
      },
      {
        key: "tenantId",
        value: tenantId
      }
    ];
    const payload = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      queryObj
    );
    // debugger;
    

    var dropdownEmployeeListSDO = []
    dropdownEmployeeListSDO=
      payload &&
      payload.Employees.map((item, index) => {
        const name = get(item, "user.name")     
        return {
        value: item.id,
        label: name
      };
      });
      this.setState({ allEmployeeListOfSDO:dropdownEmployeeListSDO  });
      // console.log("RRRRRrr",employeeListData)
       
  }
  getEmployeeList = async (rolename)=>  {
    let employeeListData = [];
    // console.log("^^^^^^^^^^^^^^^^^^savita inside getEmployeeList")
    const tenantId = getTenantId();
    const queryObj = [
      {
        key: "roles",
        value: rolename
      },
      {
        key: "tenantId",
        value: tenantId
      }
    ];
    const payload = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      queryObj
    );
    // debugger;
    

    var dropdownEmployeeList = []
    dropdownEmployeeList=
      payload &&
      payload.Employees.map((item, index) => {
        const name = get(item, "user.name")     
        return {
        value: item.id,
        label: name
      };
      });
      this.setState({ allEmployeeList:dropdownEmployeeList  });
      // console.log("RRRRRrr",employeeListData)
       
  } 
// componentDidMount(){
//   // 
// }

 
  render() {
    
    let {
      open,
      onClose,
      dropDownData,
      handleFieldChange,
      onButtonClick,
      dialogData,
      dataPath,
      
    } = this.props;
    const {
      buttonLabel,      
      showEmployeeList,
      dialogHeader,
      moduleName,
      isDocRequired,
      
      // dispatch
    } = dialogData;
    const { getButtonLabelName } = this;
    const {getEmployeeList}=this;
    let{state} = this.props
 
    try{
    let servicerequestmedia = get(state, "form.workflow.files.wfDocuments");
    let media = []
  

    servicerequestmedia.map((item, index) => {
      media.push({fileName: item.file.name || "document",
      fileStoreId:item.fileStoreId,
      documentType: item.file.type || "image"
      })
  
    });


    store.dispatch(prepareFinalObject("services[0].wfDocuments",media ));
    }
    catch(e){
      // alert("$$$$$")
      console.log("error initially")
    }
    let fullscreen = false;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }   
    dataPath = `${dataPath}[0]`;    
    return (
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
        // style={{zIndex:2000}}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                    
                      {/* in all buttons except VERIFY AND FORWARD TO SDO,FORWARD FOR INSPECTION, Inspect, Complete, Reject,a role list need to be shown which is mandatory to be selected, so below code is done for that & mandatory code is done in workflow container*/}
                  { ( buttonLabel==="REQUEST CLARIFICATION" || buttonLabel==="VERIFY AND FORWARD"  ) &&  showEmployeeList && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px", width: "100%" }}
                        label={fieldConfig.roleName.label}
                        placeholder={fieldConfig.roleName.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        onChange={e => { handleFieldChange(`${dataPath}.roleList`,[e.target.value]); handleFieldChange(`${dataPath}.assignee`,[]);this.getEmployeeList(e.target.value) }}
                      
                      // onChange={this.props.onChange; this.handleChange}
                        jsonPath={`${dataPath}.roleList[0]`}
                      />
                    </Grid>
                  )}
                  {/* in all buttons except VERIFY AND FORWARD TO SDO, FORWARD FOR INSPECTION, Inspect, Complete, Reject,an assignee list need to be shown which is not mandatory to be selected, so below code is done for that */}
                  {(buttonLabel==="REQUEST CLARIFICATION" || buttonLabel==="VERIFY AND FORWARD") &&  showEmployeeList && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px", width: "100%" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={this.state.allEmployeeList}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>handleFieldChange(`${dataPath}.assignee`,[e.target.value])}
                        jsonPath={`${dataPath}.assignee[0]`}
                        // jsonPath={`${dataPath}.isRoleSpecific`}
                      />
                    </Grid>
                  
                  )}
                {/* in button VERIFY AND FORWARD TO SDO, Inspect, Complete, Reject,only an assignee list need to be shown which is not mandatory to be selected, so below code is done for that */}

                {(buttonLabel==="FORWARD FOR INSPECTION") &&  showEmployeeList && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px", width: "100%" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={this.state.allEmployeeListOfJE}
                         optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        // onClose={handleFieldChange(`${dataPath}.assignee`,[""])}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>{handleFieldChange(`${dataPath}.assignee`,[e.target.value])}}
                        jsonPath={`${dataPath}.assignee[0]`}
                        // jsonPath={`${dataPath}.isRoleSpecific`}
                      />
                    </Grid>)}
                  
                    
                  {/* non mandatory assignee list of SDO*/}
                  {(buttonLabel==="VERIFY AND FORWARD TO SDO") &&  showEmployeeList && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px", width: "100%" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={this.state.allEmployeeListOfSDO}
                         optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        // onClose={handleFieldChange(`${dataPath}.assignee`,[""])}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>{handleFieldChange(`${dataPath}.assignee`,[e.target.value])}}
                        jsonPath={`${dataPath}.assignee[0]`}
                        // jsonPath={`${dataPath}.isRoleSpecific`}
                      />
                    </Grid>)}
                
                
                {/* code for comments is just here not anywhere else, after this, button code starts */}
                    <Grid item sm="12">
                    <TextFieldContainer
                    style={{ marginRight: "15px", width: "100%" }}
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.comments.label}
                      onChange={e =>
                        handleFieldChange(`${dataPath}.comment`, e.target.value)
                      }
                      jsonPath={`${dataPath}.comment`}
                      placeholder={fieldConfig.comments.placeholder}
                    />
                  </Grid>
                    
                  {/*button and image code starts */}
                 {/*only upload already captured documents, image, PDF */}
                 {(buttonLabel==="VERIFY AND FORWARD TO SDO" || buttonLabel==="VERIFY AND FORWARD" || buttonLabel==="REQUEST CLARIFICATION" || buttonLabel==="APPROVE" || buttonLabel==="REJECT" || buttonLabel==="FORWARD FOR INSPECTION") && (<Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <div className="rainmaker-displayInline">
                        
                        {isDocRequired && (
                          <span style={{ marginLeft: 5, color: "red" }}>*</span>
                        )}
                      </div>
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />
                    </div>
                    <UploadMultipleFiles
                      maxFiles={4}
                      inputProps={{
                        accept: "image/*, .pdf, .png, .jpeg"
                      }}
                      buttonLabel={{ labelName: "UPLOAD FILES",labelKey : "HC_UPLOAD_FILES_BUTTON" }}
                      jsonPath={`${dataPath}.wfDocuments`}
                      maxFileSize={5000}
                    />
                    <LabelContainer
                        labelName="Upload Document Should be less than 5MB"
                        labelKey="HC_UPLOAD_DOCUMENT_MSG_LABEL"
                      />
                    <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                                         <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={() =>
                         onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  )}

                    {/* upload camera image */}
                  {(buttonLabel==="INSPECT" || buttonLabel==="COMPLETE") && (<Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <div className="rainmaker-displayInline">
                        {isDocRequired && (
                          <span style={{ marginLeft: 5, color: "red" }}>*</span>
                        )}
                      </div>
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />
                    </div>
                    <ImageUpload module="egov-workflow"  formKey={"workflow"} fieldKey={`wfDocuments`} />
                    
                    <Grid sm={12} style={{ textAlign: "right", marginTop: "16px", paddingTop:"10px"}} className="bottom-button-container">
                                         <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={() =>
                         onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  )}

                </Grid>
              }
            />
          }
        />
      </Dialog>
    );
  
}
}
export default withStyles(styles)(HCActionDialog);
