import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonHeader,
  getCommonTitle,
  getSelectField,
  getTextField,
  getDateField,
  getPattern,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import {
  getLocalization,
  getTenantId,
  localStorageGet, 
  localStorageSet,
  lSRemoveItemlocal,
  lSRemoveItem
} from "egov-ui-kit/utils/localStorageUtils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import set from "lodash/set";
import store from "redux/store";
const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};
import {showinvitelist, deleteguestbyid} from "../searchResource/citizenSearchFunctions"




const onRowDelete = async (rowData, allrowdata) => {

	//console.log("Deleteeeeeeeeeeeeeeeeeee");
	//console.log(rowData)
	//console.log(allrowdata)
	
	deleteguestbyid(rowData)
}

// const load_invite_summary(row)= async (rowData, allrowdata) => {

const load_invite_summary = rowData => {
		const reviewUrl = `event_summary?eventId=${rowData[0]}&eventuuId=${rowData[6]}&tenantId=`+getTenantId();
		window.location.href =reviewUrl;
 }

const onAllEmployeeselect = async (rowData, allrowdata,state,dispatch,action) => {

	console.log("SELCT ALL CLICKKKKKKKKKKKKKKKKK Employee");
	console.log(rowData)
	console.log(allrowdata)
	
		if(rowData.length == localStorageGet("gridobjlength") && allrowdata.length == localStorageGet("gridobjlength"))
		{
			let selectedrows = [];
		//	let selectedrows1=[];
					
			 let tempdata = localStorageGet("gridobj");
			 console.log(tempdata);
			// let tempdata1 = tempdata.split('},{').join('}|');
			 let tempdata1 = tempdata.split('},{').join('}|{');
			 let tempdata2 = tempdata1.split('|')
					 
				tempdata2.map( item => {
					//console.log("------");
					console.log((item));
					let temp = JSON.parse(item) 
					 let obj={}
					  obj['Department']= temp.assignments ? temp.assignments[0].EmpName : "-"
					  obj['Designation']=temp.assignments ? temp.assignments[0].DesignationName : "-"
					  obj['Employee Name']= temp.user? temp.user.name : "-"
					  obj['Mobile No']=temp.user ? temp.user.mobileNumber : "-"
					  obj['Email ID']=temp.user ? temp.user.emailId : "-"
					  obj['Department Id']=temp.assignments ? temp.assignments[0].id:"-"
					  obj['Employee ID']=temp.user ? temp.user.uuid : "-"
					  obj['DepartmentName']=temp.assignments ? temp.assignments[0].department : "-"
					selectedrows.push(obj)
					
			})
			localStorageSet("committeelistAll", JSON.stringify(selectedrows));	
		}
		else
		{
			if(rowData.length == 0)
			{
				localStorageSet("committeelist",[]);
			}
			localStorageSet("committeelistAll", []);
			
		}
} 
const onEmployeeselect = async (type, rowData, state,dispatch,action) => {

//	alert('******************************')
	if(type == "cell")
	{
	
	}
	else
	{	
    
		console.log(type);
		console.log( rowData);
	//	debugger;
		let selectedrows = [];
    let localinvdata = localStorageGet("committeelist");
     
		console.log("committeelist");
		console.log( localinvdata);
		if(localinvdata === null || localinvdata === "undefined")
		{
      let tempAll = JSON.parse(localStorageGet("committeelistAll"));
      
      let checked =false;

if(tempAll!==null)
{
     
      tempAll.map((item,index)=>{
        if(item['Employee ID'] === rowData[6])
        {
          checked=true;
          tempAll.splice(index,1)
          localStorageSet("committeelist", JSON.stringify(tempAll));	
          
        }
        })

      }
if(checked===false){
      let obj={}
       obj['Department']=rowData[0]
      obj['Employee Name']=rowData[2]
      obj['Mobile No']=rowData[3]
      obj['Email ID']=rowData[4]
      obj['Department Id']=rowData[5]
      obj['Employee ID']=rowData[6]
      obj['Designation']=rowData[1]
      obj['DepartmentName']=rowData[7]
    //  selectedrows.push(rowData)
      selectedrows.push(obj)
      
      localStorageSet("committeelist", JSON.stringify(selectedrows));
      let data = selectedrows.map(item => ({
        // alert(item)
        [getTextToLocalMapping("Department")]:
        item.Department || "-",
         [getTextToLocalMapping("Name")]: item['Employee Name'] || "-",
         [getTextToLocalMapping("Mobile No")]: item['Mobile No'] || "-",
         [getTextToLocalMapping("Email ID")]:  item['Email ID'] || "-",
         [getTextToLocalMapping("Department Id")]: item['Department Id'] || "-",
         [getTextToLocalMapping("Employee ID")]:  item['Employee ID'] || "-",
         [getTextToLocalMapping("Designation")]:  item['Designation'] || "-",
         [getTextToLocalMapping("DepartmentName")]:  item['DepartmentName'] || "-"
         
         
       
        
       }));
     
      }  
      // store.dispatch(
        // handleField(
          // "createCommitteeMaster",
          // "components.div.children.formwizardSecondStep.children.searchDepartmentEmployeesResults_committee1",
          // "props.data",
          // data
        // )
      // );
    
      
		}
		else
		{
    //  alert('bb')
      
console.log('in else')
      let temp = JSON.parse(localStorageGet("committeelist"));
      



  let flag=false;


    //   debugger
    //   let filteredPeople = temp.filter((item) => 
    //   item['Employee ID'] !== rowData[6]
    // );
    debugger
      let checked =false;
    temp.map((item,index)=>{
      if(item['Employee ID'] === rowData[6])
      {
        checked=true;
        temp.splice(index,1)
        localStorageSet("committeelist", JSON.stringify(temp));	
        
      }
      })
if(checked===false){
  selectedrows = temp;
  let obj={}
  
  obj['Department']=rowData[0]
  obj['Employee Name']=rowData[2]
  obj['Mobile No']=rowData[3]
  obj['Email ID']=rowData[4]
  obj['Department Id']=rowData[5]
  obj['Employee ID']=rowData[6]
  obj['Designation']=rowData[1]
  obj['DepartmentName']=rowData[7]
  
  selectedrows.push(obj)
  localStorageSet("committeelist", JSON.stringify(selectedrows));	
  
}

// if(flag===false)
// {
   
// selectedrows = filteredPeople;
// let obj={}

// obj['Department']=rowData[0]
// obj['Employee Name']=rowData[2]
// obj['Mobile No']=rowData[3]
// obj['Email ID']=rowData[4]
// obj['Department Id']=rowData[5]
// obj['Employee ID']=rowData[6]
// obj['Designation']=rowData[1]
// obj['DepartmentName']=rowData[7]

// selectedrows.push(obj)

 

//    localStorageSet("committeelist", JSON.stringify(selectedrows));	
// }
   console.log(localStorageGet("committeelist"))
    

      let data = selectedrows.map(item => ({
        // alert(item)
        [getTextToLocalMapping("Department")]:
        item.Department || "-",
         [getTextToLocalMapping("Employee Name")]: item['Employee Name'] || "-",
         [getTextToLocalMapping("Mobile No")]: item['Mobile No'] || "-",
         [getTextToLocalMapping("Email ID")]:  item['Email ID'] || "-",
         [getTextToLocalMapping("Department Id")]: item['Department Id'] || "-",
         [getTextToLocalMapping("Employee ID")]:  item['Employee ID'] || "-",
         [getTextToLocalMapping("DepartmentName")]:  item['DepartmentName'] || "-"
         
        
       }));
     
      
      // store.dispatch(
        // handleField(
          // "createCommitteeMaster",
          // "components.div.children.formwizardSecondStep.children.searchDepartmentEmployeesResults_committee1",
          // "props.data",
          // data
        // )
      // );
    
    }	
	}
  
};

 
    
export const textToLocalMapping = {
  "Guest Type": getLocaleLabels(
    "Guest Type",
    "PR_INVITE_GUEST_TYPR",
    getTransformedLocalStorgaeLabels()
  ),
  "Guest Name": getLocaleLabels(
    "Guest Name",
    "PR_INVITE_NAME_TYPR",
    getTransformedLocalStorgaeLabels()
  ),
  "Guest Email": getLocaleLabels(
    "Guest Email",
    "PR_INVITE_GUEST_EMAIL",
    getTransformedLocalStorgaeLabels()
  ),
  "Guest Mobile Number": getLocaleLabels(
    "Guest Mobile Number",
    "PR_INVITE_GUEST_CONTACT",
    getTransformedLocalStorgaeLabels()
  ),
   "Guest Action": getLocaleLabels(
    "Guest Action",
    "PR_INVITE_GUEST_ACTION",
    getTransformedLocalStorgaeLabels()
  ),
   "Guest ID": getLocaleLabels(
    "Guest ID",
    "PR_INVITE_GUEST_ID",
    getTransformedLocalStorgaeLabels()
  ),
 
  "NOC No": getLocaleLabels(
    "NOC No",
    "NOC_COMMON_TABLE_COL_NOC_NO_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "NOC Type": getLocaleLabels(
    "NOC Type",
    "NOC_TYPE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Application Date": getLocaleLabels(
    "Application Date",
    "NOC_COMMON_TABLE_COL_APP_DATE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  Status: getLocaleLabels(
    "Status",
    "NOC_COMMON_TABLE_COL_STATUS_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  INITIATED: getLocaleLabels(
    "Initiated,",
    "NOC_INITIATED",
    getTransformedLocalStorgaeLabels()
  ),
  APPLIED: getLocaleLabels(
    "Applied",
    "NOC_APPLIED",
    getTransformedLocalStorgaeLabels()
  ),
  DOCUMENTVERIFY: getLocaleLabels(
    "Pending for Document Verification",
    "WF_FIRENOC_DOCUMENTVERIFY",
    getTransformedLocalStorgaeLabels()
  ),
  APPROVED: getLocaleLabels(
    "Approved",
    "NOC_APPROVED",
    getTransformedLocalStorgaeLabels()
  ),
  REJECTED: getLocaleLabels(
    "Rejected",
    "NOC_REJECTED",
    getTransformedLocalStorgaeLabels()
  ),
  CANCELLED: getLocaleLabels(
    "Cancelled",
    "NOC_CANCELLED",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_FIRENOC_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_FIRENOC_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),
  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_FIRENOC_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for Fire-NOC Applications": getLocaleLabels(
    "Search Results for Fire-NOC Applications",
    "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  )
};

export const searchDepartmentEmployeesResults = getCommonCard({
   invireselgrid : {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Department"),
      getTextToLocalMapping("Employee Name"),
      getTextToLocalMapping("Mobile No"),
      getTextToLocalMapping("Email ID"),
      
     
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: true,
	  filterType: 'checkbox',
      hover: true,
	  selectableRowsHeader : false,
      rowsPerPageOptions: [5, 10, 15, 20],
	  onRowsSelect:(currentRowsSelected , allRowsSelected) =>{
		onEmployeeselect('cell','')
	  },
      onRowClick: (row, index) => {
     
        onEmployeeselect('rowdata',row,dispatch)
      },
	  // onRowsDelete:(rowsDeleted, data) =>{
		// onRowDelete(rowsDeleted, data)
	  // },
	  selectedRows: {
      text: "row(s) selected",
      delete: "Delete",
      deleteAria: "Delete Selected Rows",
    }
	  
	  // onCellClick: (colData)=>{
		// void()
	  // },
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
}, 
Invite: {
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
				labelName: "Invite Employees",
				labelKey: "PR_INVITE_EMPLOYEES_BUTTON"
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
			  callBack: (action, state, dispatch) => { showinvitelist(action, state, dispatch) }
			}
		}

});

export const searchInvitedEmployeesResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
		getTextToLocalMapping("Guest Type"),
		getTextToLocalMapping("Guest Name"),
		getTextToLocalMapping("Guest Email"),
		getTextToLocalMapping("Guest Mobile Number"),
		getTextToLocalMapping("Status"),
		getTextToLocalMapping("Guest Action"),
		getTextToLocalMapping("Guest ID"),
		
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
	  disableToolbarSelect : false,
	  selectableRows: false,
      rowsPerPageOptions: [5, 10, 15, 20],
	  // onRowsSelect:(current , all) =>{
		// alert("Seelected Row")
		// console.log("currenttttttttttt");
		// console.log(current);
		// console.log("allllllllllllllllllllllllll");
		// console.log(all);
	  // }
      onRowClick: (rowsDeleted, data) => {
        onRowDelete(rowsDeleted, data);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};




// List of events to invite guests
export const eventlistforinvitation = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Event Id"),
      getTextToLocalMapping("Event Title"),
      getTextToLocalMapping("Date & Time"),
	  getTextToLocalMapping("Committee"),
      getTextToLocalMapping("Budget"),
      getTextToLocalMapping("Event Status"),
      getTextToLocalMapping("Event UUID")
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        load_invite_summary(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

export const searchDepartmentEmployeesResults_committee = getCommonCard({
  gridtitle :  getCommonHeader({
      labelName: `Select Employee`, //later use getFinancialYearDates
      labelKey: "PR_SELECT_EMPLOYEE"
    }),
  committieegrid : {
 uiFramework: "custom-molecules",
 // moduleName: "egov-tradelicence",
 componentPath: "Table",
 visible: true,
 props: {
  data: [],
   columns: [
     getTextToLocalMapping("Department"),
     getTextToLocalMapping("Designation"),
     getTextToLocalMapping("Employee Name"),
     getTextToLocalMapping("Mobile No"),
     getTextToLocalMapping("Email ID"),
     {
      name: getTextToLocalMapping("Department Id"),
      options: {
        display: false,
        // customBodyRender: value => (
          // <span>
            // {value.eventDetailUuid}
          // </span>
        // )
      }
    },{
      name: getTextToLocalMapping("Employee ID"),
      options: {
        display: false,
        // customBodyRender: value => (
          // <span>
            // {value.eventDetailUuid}
          // </span>
        // )
      }
    },
   
    {
      name: getTextToLocalMapping("DepartmentName"),
      options: {
        display: false,
        // customBodyRender: value => (
          // <span>
            // {value.eventDetailUuid}
          // </span>
        // )
      }
    },

    
   ],
   title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
   options: {
     filter: false,
     download: false,
     responsive: "stacked",
     selectableRows: true,
     rowsSelected: [],     
     filterType: 'checkbox',
     hover: true,
	 selectableRowsHeader : true,
	// disableToolbarSelect : true,
	 selectableRowsOnClick : false,
     rowsPerPageOptions: [5, 10, 15, 20],
	onRowsSelect:(currentRowsSelected , allRowsSelected,state,dispatch,action) =>{
		onAllEmployeeselect(currentRowsSelected , allRowsSelected,state,dispatch,action)
		//onEmployeeselect('cell','')
   },
     onRowClick: (row, index,state,dispatch,action) => {
         onEmployeeselect('rowdata',row,state,dispatch,action)
     },
   // onRowsDelete:(rowsDeleted, data) =>{
   // onRowDelete(rowsDeleted, data)
   // },
   // selectedRows: {
     // text: "row(s) selected",
     // delete: "Delete",
     // deleteAria: "Delete Selected Rows",
   // }
  // selectableRows: true,
      // onCellClick: (colData)=>{
   // void()
   // },
   },
   customSortColumn: {
     column: "Application Date",
     sortingFn: (data, i, sortDateOrder) => {
       const epochDates = data.reduce((acc, curr) => {
         acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
         return acc;
       }, []);
       const order = sortDateOrder === "asc" ? true : false;
       const finalData = sortByEpoch(epochDates, !order).map(item => {
         item.pop();
         return item;
       });
       return { data: finalData, currentOrder: !order ? "asc" : "desc" };
     }
   }
 }
}, 
committiee_btn: {
     componentPath: "Button",
     visible: false,
     
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
       labelName: "Invite Employees",
       labelKey: "PR_INVITE_EMPLOYEES_BUTTON"
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
     //  callBack: (action, state, dispatch) => { showinvitelist(action, state, dispatch) }
     }
   }

});



export const searchDepartmentEmployeesResults_committee1 = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   // data:localStorage.getItem('committeelist')===null ||localStorage.getItem('committeelist')===""?[]:JSON.parse(localStorage.getItem('committeelist')),
   data:[],
    columns: [
      getTextToLocalMapping("Department"),
      getTextToLocalMapping("Designation"),
      
      getTextToLocalMapping("Employee Name"),
      getTextToLocalMapping("Mobile No"),
      getTextToLocalMapping("Email ID"),
      {
        name: getTextToLocalMapping("Department Id"),
        options: {
          display: false,
          // customBodyRender: value => (
            // <span>
              // {value.eventDetailUuid}
            // </span>
          // )
        }
      },{
        name: getTextToLocalMapping("Employee ID"),
        options: {
          display: false,
          // customBodyRender: value => (
            // <span>
              // {value.eventDetailUuid}
            // </span>
          // )
        }
      },
      

   
    
    ],
  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
       // load_invite_summary(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};
export const searchDepartmentEmployeesResults_committeeSummary = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    data:[],
    columns: [
      getTextToLocalMapping("Department"),
      getTextToLocalMapping("Designation"),
      
      getTextToLocalMapping("Employee Name"),
      getTextToLocalMapping("Mobile No"),
      getTextToLocalMapping("Email ID"),
      
      
      {
        name: getTextToLocalMapping("Department Id"),
        options: {
          display: false,
          // customBodyRender: value => (
            // <span>
              // {value.eventDetailUuid}
            // </span>
          // )
        }
      },{
        name: getTextToLocalMapping("Employee ID"),
        options: {
          display: false,
          // customBodyRender: value => (
            // <span>
              // {value.eventDetailUuid}
            // </span>
          // )
        }
      },
      
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
       // load_invite_summary(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};
