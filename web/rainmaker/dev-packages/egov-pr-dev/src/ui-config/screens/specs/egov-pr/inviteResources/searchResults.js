import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
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
		const reviewUrl = `event_summary?eventId=${rowData[0]}&eventuuId=${rowData[6]}&status=${rowData[4]}&tenantId=`+getTenantId();
		window.location.href =reviewUrl;
 }

const onAllEmployeeselect = async (rowData, allrowdata,state,dispatch,action) => {

	
	
		if(rowData.length == localStorageGet("gridobjlength") && allrowdata.length == localStorageGet("gridobjlength"))
		{
			let selectedrows = [];
			let selectedrows1=[];
					
			 let tempdata = localStorageGet("gridobj");
			// console.log(tempdata);
			// let tempdata1 = tempdata.split('},{').join('}|');
			 let tempdata1 = tempdata.split('},{').join('}|{');
			 let tempdata2 = tempdata1.split('|')
					 
				tempdata2.map( item => {
					//console.log("------");
					console.log((item));
					let temp = JSON.parse(item) 
					 let obj=[]
					  obj[0]= temp.assignments ? temp.assignments[0].DeptName : "-"
					  obj[1]= temp.user? temp.user.name : "-"
					  obj[2]=temp.user ? temp.user.mobileNumber : "-"
            obj[3]=temp.user ? temp.user.emailId : "-"
            obj[4]=temp.user ? temp.user.uuid : "-"
					  //obj['Department Id']=commiteeMember.departmentUuid
					  //obj['Employee ID']=commiteeMember.userUuid
					  //obj['DepartmentName']=temp.assignments ? temp.assignments[0].department : "-"
					selectedrows.push(obj)
					
			})
			localStorageSet("InvitelistAll", JSON.stringify(selectedrows));	
		}
		else
		{
			if(rowData.length == 0)
			{
				localStorageSet("Invitelist",[]);
			}
			localStorageSet("InvitelistAll", []);
			
		}
} 
const onPressselectAll = async (type, rowData, allrowdata, currentRowsSelected , allRowsSelected) => {
  


let selectedrows = [];
let selectedrows1=[];
    
 let tempdata = localStorageGet("gridobj");
 console.log('Presssssssstempdata');
 console.log(tempdata);
// let tempdata1 = tempdata.split('},{').join('}|');
 let tempdata1 = tempdata.split('},{').join('}|{');
 let tempdata2 = tempdata1.split('|')
 getTextToLocalMapping("Guest Type"),
 getTextToLocalMapping("Guest Name"),
 getTextToLocalMapping("Guest Mobile Number"),
 getTextToLocalMapping("Email ID"),
 {
   name: getTextToLocalMapping("Guest UUID"),
   options: {
     display: false,
     
   }
 },


  tempdata2.map( item => {
    //console.log("------");
    console.log((item));
    let temp = JSON.parse(item) 
     let obj=[]
      obj[0]= temp.eventGuestType ? temp.eventGuestType : "-"
      obj[1]= temp.guestName? temp.guestName : "-"
      obj[2]=temp.guestMobile ? temp.guestMobile : "-"
      obj[3]=temp.guestEmail ? temp.guestEmail : "-"
      obj[4]=temp.eventGuestUuid ? temp.eventGuestUuid : "-"
     
     
    selectedrows.push(obj)

})
localStorageSet("ResendInvitelistAll", JSON.stringify(selectedrows));	




}
 
const onEmployeeselect = async (type, rowData, allrowdata) => {

	if(allrowdata == "resend")
	{
		if(type == "cell")
		{
			//console.log(type);
			//console.log("Current" + rowData);
			//console.log("All "+allrowdata);
		}
		else
		{	
			console.log(type);
			console.log( rowData);
			debugger;
			let selectedrows = [];
			let localinvdata = localStorageGet("ResendInvitelist");
			if(localinvdata === null || localinvdata === "undefined")
			{

        let tempAll= JSON.parse(localStorageGet("ResendInvitelistAll"));
				console.log("temppppppppppppp")
        console.log(tempAll)
       let checked =false;
       if(tempAll!=null)
       {
       tempAll.map((item,index)=>{
          if(item[4] === rowData[4])
          {
            checked=true;
            tempAll.splice(index,1)
            localStorageSet("ResendInvitelist", JSON.stringify(tempAll));	
            localStorageSet("ResendInvitelistAll", "");
          }
          })
          if(checked===false){
				selectedrows.push(rowData)

        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
          }
        }
			}
			else
			{
				let temp = JSON.parse(localStorageGet("ResendInvitelist"));
				console.log("temppppppppppppp")
        console.log(temp)
       let checked =false;
       temp.map((item,index)=>{
          if(item[4] === rowData[4])
          {
            checked=true;
            temp.splice(index,1)
            localStorageSet("ResendInvitelist", JSON.stringify(temp));	
            localStorageSet("ResendInvitelistAll", "");
          }
          })
          if(checked===false){
				selectedrows = temp;
				selectedrows.push(rowData)
        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));	
          }
			}	
		}
	}
	else
	{
		if(type == "cell")
		{
			//console.log(type);
			//console.log("Current" + rowData);
			//console.log("All "+allrowdata);
		}
		else
		{	
			console.log(type);
			console.log( rowData);
			debugger;
			let selectedrows = [];
			let localinvdata = localStorageGet("Invitelist");
			if(localinvdata === null || localinvdata === "undefined")
			{

        let tempAll = JSON.parse(localStorageGet("InvitelistAll"));
        
          let checked =false;
    
    if(tempAll!==null)
    {
         
          tempAll.map((item,index)=>{
            if(item[4] === rowData[4])
            {
              checked=true;
              tempAll.splice(index,1)
              localStorageSet("Invitelist", JSON.stringify(tempAll));	
              
            }
            })
    
          }
    if(checked===false){
				selectedrows.push(rowData)

				localStorageSet("Invitelist", JSON.stringify(selectedrows));
      }
    }
			else
			{
				let temp = JSON.parse(localStorageGet("Invitelist"));
				console.log("temppppppppppppp")
        console.log(temp)
        
        let checked =false;
        temp.map((item,index)=>{
          if(item[4] === rowData[4])
          {
            checked=true;
            temp.splice(index,1)
            localStorageSet("Invitelist", JSON.stringify(temp));	
            
          }
          })
    if(checked===false){
				selectedrows = temp;
				selectedrows.push(rowData)
        localStorageSet("Invitelist", JSON.stringify(selectedrows));	
    }
			}	
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
    "WF_PublicRelation_DOCUMENTVERIFY",
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
    "WF_PublicRelation_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_PublicRelation_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),
  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_PublicRelation_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for PUBLIC-RELATIONS Applications": getLocaleLabels(
    "Search Results for PUBLIC-RELATIONS Applications",
    "NOC_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  )
};

export const searchDepartmentEmployeesResults = getCommonCard({
   invireselgrid : {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Department"),
      getTextToLocalMapping("Employee Name"),
      getTextToLocalMapping("Mobile No"),
      getTextToLocalMapping("Email ID"),
      {
        name: getTextToLocalMapping("Employee ID"),
		 options: {
          display: false
        }
      },
     
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: true,
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
      onRowClick: (row, index) => {
        onEmployeeselect('rowdata',row)
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
        marginRight: "45px",
        marginTop: "20px"
        
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
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
		getTextToLocalMapping("Guest Type"),
		getTextToLocalMapping("Guest Name"),
		getTextToLocalMapping("Guest Email"),
		getTextToLocalMapping("Guest Mobile Number"),
		{
        name: getTextToLocalMapping("Status"),
		 options: {
          display: false
        }
      },
		//getTextToLocalMapping("Guest Action"),
		 {
        name: getTextToLocalMapping("Guest Action"),
        options: {
          display: true,
          customBodyRender: value => (
            <i class="material-icons">clear</i>
          )
        }
      },
		//getTextToLocalMapping("Guest ID"),
		 {
        name: getTextToLocalMapping("Guest ID"),
        options: {
          display: false,
          // customBodyRender: value => (
            // <span>
              // {value.eventDetailUuid}
            // </span>
          // )
        }
      }
		
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
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
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Event Id"),
      getTextToLocalMapping("Event Title"),
    {
      name: getTextToLocalMapping("Organizer Department"),
      options: {
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => (
        <div>{value[0]} <br/><br/> {value[1]}</div>
    
      )
      }
    },
      getTextToLocalMapping("Date & Time"),
      getTextToLocalMapping("Schedule Status"),
      getTextToLocalMapping("Event Status"),
     
	  {
        name: getTextToLocalMapping("Event UUID"),
        options: {
          display: false,
          
        }
      },
    ],
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


export const ResendInvitedEmployeesResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Guest Type"),
      getTextToLocalMapping("Guest Name"),
      getTextToLocalMapping("Guest Mobile Number"),
      getTextToLocalMapping("Email ID"),
      {
        name: getTextToLocalMapping("Guest UUID"),
        options: {
          display: false,
          
        }
      },
     
    ],
  
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
      onPressselectAll('cell','','resend',currentRowsSelected , allRowsSelected)
	  },
      onRowClick: (row, index) => {
        onEmployeeselect('rowdata',row,'resend')
      },
	  selectedRows: {
      text: "row(s) selected",
      delete: "Delete",
      deleteAria: "Delete Selected Rows",
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