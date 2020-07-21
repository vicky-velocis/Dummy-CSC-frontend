import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
//import Card from '@material-ui/core/Card';
import { Multiselect } from "multiselect-react-dropdown";
import { Card, TextFieldIcon, TextField,AutoSuggestDropdown,Button } from "components";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchEmployeeToAssign } from "egov-ui-kit/redux/common/actions";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import {   prepareFinalObject  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { fetchComplaintAutoRouting } from "egov-ui-kit/redux/complaints/actions";
import MultiItemCard from './multiItemCard';
import { httpRequest } from "egov-ui-kit/utils/api";
import { result } from "lodash";
class AutoRoutingMapping extends Component {
    constructor(props){
        super(props);
        this.multiselectRef = React.createRef();
       
        this.state = {
            category:"",
            officerlevel1 : [],
            officerlevel2 :[],
            categoriesArr : [],
            sectorArr :[],
            autoRouting : [{id: new Date().getTime() ,sector:[],employee:""}] 
        }
        this.multiDropdownStyle = {
            chips: {
              background: "#FE7A51"
            },
            searchBox: {
              border: "none",
              borderBottom: "1px solid #cccccc",
              borderRadius: "0px",
            },
            multiselectContainer: {
              color: "#FE7A51",
              flex : 1
            },    
          optionListContainer:{
              "position" : "relative !important",
              "z-index" : "99999"
          }
          };

          this.onSelect = this.onSelect.bind(this);
          this.onRemove = this.onRemove.bind(this);
        //  this.onEmployeeChange = this.onEmployeeChange(this);
    }
    componentDidMount = () => {
        let { fetchEmployeeToAssign,fetchComplaintAutoRouting } = this.props;
        const queryParams = [{ key: "roles", value: "PGR_LME" }]; //
        fetchEmployeeToAssign(queryParams);
        fetchComplaintAutoRouting();
      };
    getLocalizedLabel = (label) => {
        const { localizationLabels } = this.props;
        return getTranslatedLabel(label, localizationLabels);
      };
       department = {
        id: "department",
        required: true,
        jsonPath: "services[0].department",
        floatingLabelText: this.getLocalizedLabel("CS_ADDCOMPLAINT_DEPARTMENT"),
        hintText: this.getLocalizedLabel("HR_DEPARTMENT_PLACEHOLDER"),
        errorMessage: this.getLocalizedLabel("HR_DEPARTMENT_PLACEHOLDER"),
        boundary: true,
        dropDownData: [],
        errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
        errorText: "",
    }
    category = {
      id: "category",
      required: true,
      jsonPath: "services[0].category",
      floatingLabelText: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_CATEGORY"),
      hintText: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_CATEGORY_PLACEHOLDER"),
      errorMessage: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_CATEGORY_PLACEHOLDER"),
      boundary: true,
      dropDownData: [],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: "",
  }
     employee = {
      id: "employee",
      jsonPath: "services[0].employee",
      floatingLabelText: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_EMPLOYEE"),
      hintText: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_EMPLOYEE_PLACEHOLDER"),
      errorMessage: this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_EMPLOYEE_PLACEHOLDER"),
      boundary: true,
      dropDownData: [],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: "",
  }

    onSelect(selectedList, selectedItem,prepareFinalObject,officer,autoroute ={}) {  
   
        if(officer === "EO1"){
                this.setState({officerlevel1 : selectedList},()=>{
                  prepareFinalObject("AutoroutingEscalationMap.escalationOfficer1", this.state.officerlevel1);
                })
        }
       else if(officer === "EO2"){
            this.setState({officerlevel2 : selectedList},()=>{
              prepareFinalObject("AutoroutingEscalationMap.escalationOfficer2", this.state.officerlevel2);
            })
        }
        else if(officer === "sector") {
           const newAutoRoutingArr = this.state.autoRouting.map(data => {
             if(data.id === autoroute.id)
                 data.sector = selectedList;
            
            return data;
           })
           this.setState({autoRouting : newAutoRoutingArr})
        }
      }
  
      onRemove(selectedList, removedItem,prepareFinalObject,officer,autoroute ={}) {  
         
          if(officer === "EO1"){
              this.setState({officerlevel1 : selectedList},()=>{
                prepareFinalObject("AutoroutingEscalationMap.escalationOfficer1", this.state.officerlevel1);
              })     
          }
          else if(officer === "EO2"){
              this.setState({officerlevel2 : selectedList},()=>{
                prepareFinalObject("AutoroutingEscalationMap.escalationOfficer2", this.state.officerlevel2);
              })
           }
           else if(officer === "sector") {
            const newAutoRoutingArr = this.state.autoRouting.map(data => {
              if(data.id === autoroute.id)
                  data.sector = selectedList;
             
             return data;
            })
            this.setState({autoRouting : newAutoRoutingArr})
         }
    }

    onEmployeeChange = (chosenEmployee,autoroute)=> {
      const newAutoRoutingArr = this.state.autoRouting.map(data => {
        if(data.id === autoroute.id)
            data.employee = chosenEmployee;
       
       return data;
      })
      this.setState({autoRouting : newAutoRoutingArr})

    }

    onDeleteCard = (e , element) => {
      const {autoRouting}  = this.state;
      if(autoRouting.length > 1){
      let filteredAutoRouting = autoRouting.filter( routeObj => routeObj.id !== element.id)
          this.setState({autoRouting : filteredAutoRouting})
      }
    }

    onAddCard = (e) => {
      const {autoRouting} = this.state
      
      this.setState ({autoRouting : [...autoRouting , {id:new Date().getTime(),sector:[],employee:""}]})
    }

    populatingAutoRoutingData = (category) => {
        const {AutoroutingEscalation} = this.props;

        const rawdata = Object.values(AutoroutingEscalation).filter(ele => ele.category === category.value);
        this.generateActualDataSource(rawdata);
    }

    generateActualDataSource(rawdata){
        const {empDetails,sectors} = this.props;
        if(rawdata){
          const escalationOfficer1 = rawdata[0].escalationOfficer1.map(code => {
                                        return empDetails.find(emp => emp.value === code)
                                        }).filter(result => result)

          const escalationOfficer2 = rawdata[0].escalationOfficer2.map(code => {
                                        return empDetails.find(emp => emp.value === code)
                                        }).filter(result => result)

          const autoRouting =   rawdata[0].autoRouting &&  rawdata[0].autoRouting.map((detail,index) => {
            let sectorEmpDetail ={}
            let employee ="";
            sectorEmpDetail.id = new Date().getTime()+index;
                if(detail.Employee.trim()){
                    employee = empDetails.find(emp => emp.value === detail.Employee)
                }
                if(employee){
                  sectorEmpDetail.employee = employee;
                }else{
                   sectorEmpDetail.employee = {value: "", label: "", dept: ""}
                }

                sectorEmpDetail.sector = detail.Sector.map(code =>{
                   return sectors.find(sec => sec.value === code)
                   }).filter(result => result)

                   return sectorEmpDetail;
                
          })

          this.setState({officerlevel1 : escalationOfficer1, officerlevel2:escalationOfficer2,autoRouting})
        }
    }

    onSubmit = async(e) => {
     const {officerlevel1,officerlevel2,autoRouting,category} = this.state;
     const { toggleSnackbarAndSetText } = this.props;
     let AutoroutingEscalationMap ={};
     let isDataValid = true;
     let SectorArr =[];
     let duplicateSector =[];
     let sectroErrMsg ="";
        AutoroutingEscalationMap.category = category;
        AutoroutingEscalationMap.escalationOfficer1 = officerlevel1.map(eo => eo.value);
        AutoroutingEscalationMap.escalationOfficer2 = officerlevel2.map(eo => eo.value);
        AutoroutingEscalationMap.autoRouting = autoRouting.map(ar => {
            let autoroute ={};
            autoroute.Employee = ar.employee.value;
            autoroute.Sector = ar.sector.map(sec =>{
              if(!SectorArr.includes(sec.value)){
                SectorArr.push(sec.value)
              }
              else{
                duplicateSector.push(sec.value);
                isDataValid = false;
              }
              return sec.value;
            } );
           
            return autoroute;
        });
        if(duplicateSector.length>1){
          sectroErrMsg = `${duplicateSector.join()}  ${this.getLocalizedLabel("PGR_AUTOROUTE_MAPPINGR_DUPLICATE_SECTOR_ONE")}`
        }
        else{
          sectroErrMsg = `${duplicateSector.join()}  ${this.getLocalizedLabel("PGR_AUTOROUTE_MAPPINGR_DUPLICATE_SECTOR_MORE")}`
        }
        if(!isDataValid){
          e.preventDefault();
          toggleSnackbarAndSetText(
            true,
            {
              labelName: "Same sector can not be assign to many employee",
              labelKey: sectroErrMsg
            },
            "error"
          );
        }  
        else{
          const requestBody = {AutoroutingEscalationMap}
       //  const response = await httpRequest("egov-mdms-service/v1", "_search", [], requestBody);
       console.log("requestbody",requestBody )
        }

       
    }

    render() {
        const {departmentName , empDetails ,categories, prepareFinalObject,sectors} = this.props;
        const {officerlevel1,officerlevel2,categoriesArr,sectorArr,autoRouting,category} =this.state;
        return(
            <Screen >
             <Card 
             textChildren={
                 <div>
                <div className="col-sm-6 col-xs-12">
                <AutoSuggestDropdown
                className="fix-for-layout-break"
                fullWidth={true}
                onChange={(chosendepartment, index) => {

                  let filterCategory = categories.filter ( cat => cat.dept === chosendepartment.value);
                    this.setState({categoriesArr : filterCategory ,category:"",officerlevel1:[],officerlevel2:[],autoRouting:[{id: new Date().getTime() ,sector:[],employee:""}]})
               //   prepareFinalObject("AutoroutingEscalationMap.category", chosenCity.label);
                }}
                {...this.department}
                dataSource={departmentName}
                />
                </div>
                <div className="col-sm-6 col-xs-12">
                <AutoSuggestDropdown
                className="fix-for-layout-break"
                fullWidth={true}
                onChange={(chosenCategory, index) => {
                  this.setState({category : chosenCategory.value}, () => {
                    this.populatingAutoRoutingData(chosenCategory);
                    prepareFinalObject("AutoroutingEscalationMap.category", chosenCategory.label);
                  })
                
                }}
                {...this.category}
                dataSource={categoriesArr}
                value = {category}
                />
                </div>
                <div className="col-sm-6 col-xs-12"></div>
                <div className="col-sm-12 col-md-12 col-xs-12" style={{display:"flex"}} >   
                <Label  label="PGR_AUTOROUTE_MAPPING_ESCALATION_OFFICER1"  fontSize={14}  dark={true} bold={true}  style={{flex: 1}}  />
                  <Multiselect   
                    options={empDetails}  
                    closeIcon="close"      
                    displayValue="label"       
                    onSelect={(selectedList, selectedItem) => this.onSelect(selectedList, selectedItem,prepareFinalObject,"EO1")}                   
                    onRemove={(selectedList, selectedItem) => this.onRemove(selectedList, selectedItem,prepareFinalObject,"EO1")} 
                    ref={this.multiselectRef}    
                    style={this.multiDropdownStyle}
                    closeIcon={"circle"}     
                    placeholder={ this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_ESCALATION_OFFICER1_PLACEHOLDER")} 
                    selectedValues={officerlevel1}       
                    avoidHighlightFirstOption             
                   />   
                  </div>   
                  <div className="col-sm-12 col-md-12 col-xs-12" style={{display:"flex"}} >   
                  <Label  label="PGR_AUTOROUTE_MAPPING_ESCALATION_OFFICER2"  fontSize={14}  dark={true} bold={true}  style={{flex: 1}}  />
                  <Multiselect   
                    options={empDetails}  
                    closeIcon="close"      
                    displayValue="label"       
                    onSelect={(selectedList, selectedItem) => this.onSelect(selectedList, selectedItem,prepareFinalObject,"EO2")}                   
                    onRemove={(selectedList, selectedItem) => this.onRemove(selectedList, selectedItem,prepareFinalObject,"EO2")} 
                    ref={this.multiselectRef}    
                    style={this.multiDropdownStyle}
                    closeIcon={"circle"}     
                    placeholder={this.getLocalizedLabel("PGR_AUTOROUTE_MAPPING_ESCALATION_OFFICER2_PLACEHOLDER")} 
                    selectedValues={officerlevel2}       
                    avoidHighlightFirstOption             
                   />   
                  </div>   
                  </div>  
             }
             />
             <MultiItemCard 
                employee ={this.employee}
                empDetails = {empDetails}
                sectors ={sectors}
                sectorArr = {sectorArr}
                multiDropdownStyle={this.multiDropdownStyle}
                handleSelect = {this.onSelect}
                handleRemove = {this.onRemove}
                prepareFinalObject ={prepareFinalObject}
                autoRouting = {autoRouting}
                handleDeleteCard ={this.onDeleteCard}
                handleAddCard ={this.onAddCard}
                multiselectRef={this.multiselectRef}
                handleEmployeeChange = {this.onEmployeeChange}
                getLocalizedLabel={this.getLocalizedLabel} 
              />

                <div className="responsive-action-button-cont">
              <Button
                id="sumit-button-autorouting"
                className="responsive-action-button"
                primary={true}
                label={<Label buttonLabel={true} label="CS_COMMON_SUBMIT" />}
                fullWidth={true}
                onClick={(e) => this.onSubmit(e)}
              />
            </div>
    
          </Screen>
        )
    } 
}

const mapStateToProps = state => {
    const { complaints,common } = state;
    const { localizationLabels } = state.app;
    const {complaintDepartment,categoriesById,complaintSector,AutoroutingEscalation} = complaints 
    const {
        departmentById,
        designationsById,
        employeeToAssignById
      } = state.common;
   
      const empDetails =
      employeeToAssignById &&
      Object.values(employeeToAssignById).map((item, index) => {
          const deptCode = item.assignments[0] && item.assignments[0].department;
          const empCode = item.code;
          const empName = `${item.name} (${item.code})`;
        return {
                value : empCode,
                label : empName,
                dept : deptCode
        };
      });


   const departmentName = complaintDepartment && Object.values(complaintDepartment).map(dept => {
        let label = dept.name;
        let value = dept.code;
        return {
            label,
            value
        }
    })

    let categories =[];
    if(categoriesById){
      Object.values(categoriesById).forEach(category => {
        let  dept = category.department;
        let value = category.menuPath;
        let label = category.menuPath;
        const cat = {
            dept ,
            value,
            label
        }
          if(!categories.some(item => item.value === cat.value))
               categories.push(cat)
      })
    }

    const sectors = complaintSector && Object.values(complaintSector).map(sec => {
      let label = sec.name;
      let value = sec.code;
      return {
          label,
          value
      }
    })

    return { departmentName,localizationLabels,empDetails,categories,sectors,AutoroutingEscalation };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
          fetchComplaintAutoRouting:() =>
             dispatch(fetchComplaintAutoRouting()),
         fetchEmployeeToAssign: (queryParams, requestBody) =>
             dispatch(fetchEmployeeToAssign(queryParams, requestBody)),
          handleFieldChange: (formKey, fieldKey, value) =>
             dispatch(handleFieldChange(formKey, fieldKey, value)),
          prepareFinalObject: (jsonPath, value) =>
             dispatch(prepareFinalObject(jsonPath, value)),
          toggleSnackbarAndSetText: (open, message, error) =>
             dispatch(toggleSnackbarAndSetText(open, message, error))
      };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AutoRoutingMapping);
  