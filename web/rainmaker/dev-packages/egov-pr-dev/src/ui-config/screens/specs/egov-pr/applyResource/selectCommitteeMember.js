import {
    getBreak,
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import {
   
    getCommonSubHeader,
    
    getDateField,
    
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import get from "lodash/get";
  import "./index.css";
  import { httpRequest } from "../../../../../ui-utils/api";
  
  import { GetCommiteeEmployees, SearchCommitteeEmployees, InvitePress } from "../searchResource/citizenSearchFunctions";
  
  let previousUoms = [];
  // GET EMPLOYEES
const GetEmployees = async (action, state, dispatch,deptvalue) => {
  //alert(deptvalue)
  try {
    let payload = null;
	 const queryStr = [
        { key: "departments", value: deptvalue },
      ]
    payload = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "_search",
      queryStr,
      {}
    );
    dispatch(prepareFinalObject("applyScreenMdmsData.employees", payload));
  } catch (e) {
    console.log(e);
  }
};

  
  export const selectCommitteeMember = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Select Committee Member",
        labelKey: "PR_SELECT_COMMITTEE_MEMBER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    
    break: getBreak(),
    propertyDetailsConatiner: getCommonContainer({
       
     
	  
	   MultiSelect: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "MultiSelect",
          props: {
            optionvalue : []
          },
		  sourceJsonPath : "applyScreenMdmsData[common-masters].Department"
        },
		
		break : getBreak(),
		SearchEmployee: {
			...getTextField({
			  label: {
				labelName: "Search Employee",
				labelKey: "PR_SEARCH_EMPLOYEE_"
			  },
			  placeholder: {
				 labelName: "Search Employee",
				labelKey: "PR_SEARCH_EMPLOYEE_"
			  },
			   gridDefination: {
					xs: 8,
					sm: 8,
					md: 8
				  },
				props: {
				  style: {
				  marginTop : "40px"
				  }
				},  
			  required: false,
			  pattern: getPattern("Name"),
			  errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
			  jsonPath: "CreateInvite.employeename",
			})
		  },
		  break : getBreak(),
      GetEmployees: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
           // minWidth: "200px",
          height: "48px",
          marginRight: "45px"
          }
        },
        children: {
          nextButtonLabel: getLabel({
          labelName: "Search Employees",
          labelKey: "PR_SEARCH_EMPLOYEES_BUTTON"
          }),
          nextButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_right"
          }
          }
        },
        onClickDefination: {

        
          action: "condition",
          callBack: (state, dispatch) => {
            
         //  alert(localStorage.getItem('dept')) 
            
            GetCommiteeEmployees(state, dispatch,localStorage.getItem('selectedDepartmentsInvite')) }
        }

       
      }





      
      // organizerEmployee: {
      //   ...getSelectField({
      //     label: { labelName: "Organizer Employee", labelKey: "ORGANIZER_EMPLOYEE_LABEL" },
      //     // localePrefix: {
      //     //   moduleName: "TENANT",
      //     //   masterName: "TENANTS"
      //     // },
      //     optionLabel: "name",
      //     optionValue: "code",
      //     placeholder: {
      //       labelName: "Select Organizer Employee",
      //       labelKey: "NOC_ORGANIZER_EMPLOYEE_PLACEHOLDER"
      //     },
      //     sourceJsonPath: "applyScreenMdmsData.employees.Employees",
      //    required: true,
          
      //     jsonPath: "PublicRealation[0].CreateMasterCommitee.organizerUsernName",
      //     props: {
      //       className:"applicant-details-error",
      //      required: true
      //       // disabled: true
      //     },
         
      
      //   }),
      
      // },
      
     
    })
  });
  