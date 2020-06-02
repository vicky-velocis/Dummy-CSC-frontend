import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import {
  getLocalization,
  getTenantId,
  localStorageGet,
  getUserInfo
,localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";
import {
  getCommonContainer,
  getCommonHeader,
 
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { getTenderGridData } from "../../../../../ui-utils/commons";
//import store from "redux/store";

import store from "../../../../../ui-redux/store";
const state = store.getState();

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Application No": getLocaleLabels(
    "Application No",
    "NOC_COMMON_TABLE_COL_APP_NO_LABEL",
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
export const searchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Event Id"),
      getTextToLocalMapping("Event Title"),
      //getTextToLocalMapping("Organizer Department"),
	   {
        name: getTextToLocalMapping("Organizer Department"),
        options: {
          display: true,
          customBodyRender: (value, tableMeta, updateValue) => (
          <div>{value[0]} <br/><br/> {value[1]}</div>
		  
        )
        }
      },
    //  getTextToLocalMapping("Organizer Employee"),
      getTextToLocalMapping("Date & Time"),
      getTextToLocalMapping("Schedule Status"),
      getTextToLocalMapping("Event Status"),
     
      {
        name: getTextToLocalMapping("Event UUID"),
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
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
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

export const searchResultsPressList = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Date"),
      getTextToLocalMapping("File Number"),
      getTextToLocalMapping("Subject"),
      {
        name: getTextToLocalMapping("Press Note List UUID"),
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
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClickpressnote(row);
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

const onAllEmployeeselect = async (rowData, allrowdata,state,dispatch,action) => {

	console.log("SELCT ALL CLICKKKKKKKKKKKKKKKKK Employee");
	console.log(rowData)
  console.log(allrowdata)
  console.log("allrowdata")
	console.log(localStorageGet("gridobj"))
		if(rowData.length == localStorageGet("gridobjlength") && allrowdata.length == localStorageGet("gridobjlength"))
		{
			let selectedrows = [];
			let selectedrows1=[];
					
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
					  // obj['Department']= temp.assignments ? temp.assignments[0].EmpName : "-"
					  // obj['Designation']=temp.assignments ? temp.assignments[0].DesignationName : "-"
					  // obj['Employee Name']= temp.user? temp.user.name : "-"
					  // obj['Mobile No']=temp.user ? temp.user.mobileNumber : "-"
					  // obj['Email ID']=temp.user ? temp.user.emailId : "-"
					  // //obj['Department Id']=commiteeMember.departmentUuid
					  // //obj['Employee ID']=commiteeMember.userUuid
          //  obj['DepartmentName']=temp.assignments ? temp.assignments[0].department : "-"
            obj['Publication Name']= temp.publicationName ? temp.publicationName : "-"
					  obj['Type of the Press']= temp.pressType? temp.pressType : "-"
					  obj['Personnel Name']=temp.personnelName ? temp.personnelName : "-"
					  obj['Email Id']=temp.email ? temp.email : "-"
					  obj['Mobile Number']=temp.mobile ? temp.mobile : "-"
					  obj['Press master UUID']=temp.pressMasterUuid ? temp.pressMasterUuid : "-"
          


					selectedrows.push(obj)
					
			})
			localStorageSet("PressNoteListAll", JSON.stringify(selectedrows));	
		}
		else
		{
			if(rowData.length == 0)
			{
				localStorageSet("PressNoteList",[]);
			}
			localStorageSet("PressNoteListAll", []);
			
		}
} 

const onEmployeeselect = async (type, rowData, allrowdata) => {

	
	if(type == "cell")
	{
		console.log(type);
		console.log("Current" + rowData);
		console.log("All "+allrowdata);
		
		
	}
	else
	{	
    console.log(type);
    console.log("Current" + rowData);
		console.log( rowData);
		debugger;
    let selectedrows = [];
    let selectedrows1=[];
		let localinvdata = localStorageGet("PressNoteList");
  	if(localinvdata === null || localinvdata === "undefined" )
 // if(selectedrows1.length===0)
		{
      debugger

      let tempAll = JSON.parse(localStorageGet("PressNoteListAll"));
      
      let checked =false;

if(tempAll!==null)
{
     
      tempAll.map((item,index)=>{
        if(item['Press master UUID'] === rowData[5])
        {
          checked=true;
          tempAll.splice(index,1)
          localStorageSet("PressNoteList", JSON.stringify(tempAll));	
          
        }
        })

      }
if(checked===false){



      selectedrows.push(rowData)
      let obj={}
      obj['Publication Name']=rowData[0]
     obj['Type of the Press']=rowData[1]
     obj['Personnel Name']=rowData[2]
     obj['Email Id']=rowData[3]
     obj['Mobile Number']=rowData[4]
     obj['Press master UUID']=rowData[5]

   selectedrows1.push(obj)
      localStorageSet("PressNoteList", JSON.stringify(selectedrows1));
}
		}
		else
		{
      console.log(JSON.parse(localStorageGet("PressNoteList")))
      let temp = JSON.parse(localStorageGet("PressNoteList"));
      let selectedrows2=selectedrows1
			console.log("temppppppppppppp")
			console.log(temp)
	
      selectedrows.push(rowData)


      let checked =false;
      temp.map((item,index)=>{
        if(item['Press master UUID'] === rowData[5])
        {
          checked=true;
          temp.splice(index,1)
          localStorageSet("PressNoteList", JSON.stringify(temp));	
          
        }
        })



        if(checked===false){





          selectedrows1 = temp;




      let obj={}
       obj['Publication Name']=rowData[0]
      obj['Type of the Press']=rowData[1]
      obj['Personnel Name']=rowData[2]
      obj['Email Id']=rowData[3]
      obj['Mobile Number']=rowData[4]
    obj['Press master UUID']=rowData[5]

    selectedrows1.push(obj)
      localStorageSet("PressNoteList", JSON.stringify(selectedrows1));	
        }
    selectedrows1=selectedrows2
    console.log('selectedrows2')
    console.log(selectedrows2)
    }	
    let data1=JSON.parse( localStorageGet("PressNoteList"))
    // let data =data1.map(item => ({

      
    //   [getTextToLocalMapping("Publication Name")]:
    //   item['Publication Name'] || "-",
    //   [ getTextToLocalMapping("Type of the Press")]:
    //   item['Type of the Press'] || "-",
    //   [ getTextToLocalMapping("Name")]:
    //   item['Pesonnel Name'] || "-",
    //   [ getTextToLocalMapping("Email Id")]:
    //   item['Email Id'] || "-",
    //   [getTextToLocalMapping("Mobile Number")]:
    //   item['Mobile Number'] || "-",
    //   [getTextToLocalMapping("Press master UUID")]:
    //   item['Press master UUID'] || "-",
    
      
    //  }));

     // store.dispatch(
      // handleField(
        // "generatepressNote",
        // "components.div.children.formwizardSecondStep.children.searchGridSecondstep",
        // "props.data",
        // data
      // ));
	// 
	}
  
};

export const searchResultsPressMasterList = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Type of the Press"),
      getTextToLocalMapping("Personnel Name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile Number"),
      {
        name: getTextToLocalMapping("Press master UUID"),
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
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
  options: {
    filter: false,
    download: false,
    responsive: "stacked",
    selectableRows: true,
    rowsSelected: [],
    filterSelected: [],
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
    // alert(JSON.stringify(state))
    onEmployeeselect('rowdata',row,state,dispatch,action)
    },
    // onRowsDelete:(rowsDeleted, data) =>{
    // onRowDelete(rowsDeleted, data)
    // },
    selectedRows: {
    text: "row(s) selected",
    delete: "Delete",
    deleteAria: "Delete Selected Rows",
    }
    // selectableRows: true,
    // onCellClick: (colData)=>{
    // void()
    // },
    },
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
 
 
};


const onAllPressselect = async (rowData, allrowdata,state,dispatch,action) => {

	console.log("SELCT ALL CLICKKKKKKKKKKKKKKKKK Employee");
	console.log(rowData)
	console.log(allrowdata)
	
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
					 let obj={}
					 	obj['Publication Name']=temp.publicationName
						obj['Type of the Press']=temp.pressType
						obj['Personnel Name']=temp.personnelName
						obj['Email Id']=temp.email
						obj['Mobile Number']=temp.mobile
						obj['Press master UUID']=temp.pressMasterUuid

					selectedrows.push(obj)
					
			})
			localStorageSet("PressTenderListAll", JSON.stringify(selectedrows));	
		}
		else
		{
			if(rowData.length == 0)
			{
				localStorageSet("PressTenderList",[]);
			}
			localStorageSet("PressTenderListAll", []);
			
		}
} 

const onEmployeeselect1 = async (type, rowData, allrowdata) => {

	
	if(type == "cell")
	{
		//console.log(type);
		//console.log("Current" + rowData);
		//console.log("All "+allrowdata);
	}
	else
	{	
    console.log(type);
    console.log("Current" + rowData);
		console.log( rowData);
		debugger;
    let selectedrows = [];
    let selectedrows1=[];
		let localinvdata = localStorageGet("PressTenderList");
  	if(localinvdata === null || localinvdata === "undefined" )
 // if(selectedrows1.length===0)
		{
      

      let tempAll = JSON.parse(localStorageGet("PressTenderListAll"));
      
      let checked =false;

if(tempAll!==null)
{
     
      tempAll.map((item,index)=>{
        if(item['Press master UUID'] === rowData[5])
        {
          checked=true;
          tempAll.splice(index,1)
          localStorageSet("PressTenderList", JSON.stringify(tempAll));	
          
        }
        })

      }
if(checked===false){
      selectedrows.push(rowData)
      let obj={}
      obj['Publication Name']=rowData[0]
     obj['Type of the Press']=rowData[1]
     obj['Personnel Name']=rowData[2]
     obj['Email Id']=rowData[3]
     obj['Mobile Number']=rowData[4]
     obj['Press master UUID']=rowData[5]

   selectedrows1.push(obj)
      localStorageSet("PressTenderList", JSON.stringify(selectedrows1));
}
		}
		else
		{
      console.log(JSON.parse(localStorageGet("PressTenderList")))
      let temp = JSON.parse(localStorageGet("PressTenderList"));
      let selectedrows2=selectedrows1
			console.log("temppppppppppppp")
      console.log(temp)
      
      let checked =false;
      temp.map((item,index)=>{
        if(item['Press master UUID'] === rowData[5])
        {
          checked=true;
          temp.splice(index,1)
          localStorageSet("PressTenderList", JSON.stringify(temp));	
          
        }
        })
  if(checked===false){

			selectedrows1 = temp;
      selectedrows.push(rowData)
      let obj={}
       obj['Publication Name']=rowData[0]
      obj['Type of the Press']=rowData[1]
      obj['Personnel Name']=rowData[2]
      obj['Email Id']=rowData[3]
      obj['Mobile Number']=rowData[4]
    obj['Press master UUID']=rowData[5]

    selectedrows1.push(obj)
      localStorageSet("PressTenderList", JSON.stringify(selectedrows1));	
  }
    selectedrows1=selectedrows2
    console.log('selectedrows2')
    console.log(selectedrows2)
    }	
    let data1=JSON.parse( localStorageGet("PressTenderList"))



    let data =data1.map(item => ({

      
      [getTextToLocalMapping("Publication Name")]:
      item['Publication Name'] || "-",
      [ getTextToLocalMapping("Type of the Press")]:
      item['Type of the Press'] || "-",
      [ getTextToLocalMapping("Personnel Name")]:
      item['Personnel Name'] || "-",
      [ getTextToLocalMapping("Email Id")]:
      item['Email Id'] || "-",
      [getTextToLocalMapping("Mobile Number")]:
      item['Mobile Number'] || "-",
      [getTextToLocalMapping("Press master UUID")]:
      item['Press master UUID'] || "-",
    
      
     }));

     // store.dispatch(
      // handleField(
        // "generatepressNote",
        // "components.div.children.formwizardSecondStep.children.searchGridSecondstep",
        // "props.data",
        // data
      // ));
	// 
	}
  
};

export const PressMasterListForTender = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Type of the Press"),
      getTextToLocalMapping("Personnel Name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile Number"),
      {
        name: getTextToLocalMapping("Press master UUID"),
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
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
  options: {
    filter: false,
    download: false,
    responsive: "stacked",
    selectableRows: true,
    rowsSelected: [],
    filterSelected: [],
    filterType: 'checkbox',
     selectableRowsHeader : true,
	// disableToolbarSelect : true,
	 selectableRowsOnClick : false,
    rowsPerPageOptions: [5, 10, 15, 20],
    onRowsSelect:(currentRowsSelected , allRowsSelected,state,dispatch,action) =>{
		onAllPressselect(currentRowsSelected , allRowsSelected,state,dispatch,action)
		//onEmployeeselect('cell','')
   },
    onRowClick: (row, index,state,dispatch,action) => {
    // alert(JSON.stringify(state))
    onEmployeeselect1('rowdata',row,state,dispatch,action)
    },
    // onRowsDelete:(rowsDeleted, data) =>{
    // onRowDelete(rowsDeleted, data)
    // },
    selectedRows: {
    text: "row(s) selected",
    delete: "Delete",
    deleteAria: "Delete Selected Rows",
    }
    // selectableRows: true,
    // onCellClick: (colData)=>{
    // void()
    // },
    },
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
 
 
};
export const searchGridSecondstep = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    
   data: [],
    columns: [
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Type of the Press"),
      getTextToLocalMapping("Personnel Name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile Number"),
      {
        name: getTextToLocalMapping("Press master UUID"),
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
     // onRowClickpressnote(row);
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
const onRowClick = rowData => {
  const page="search"

  if(rowData[5]==="CANCELLED")
  {
  
  }
  else{
    const reviewUrl = `summary?eventId=${rowData[0]}&eventuuId=${rowData[6]}&page=${page}&status=${rowData[4]}&tenantId=`+getTenantId();
    
    
        window.location.href =reviewUrl;
  }
     
  


  
};
export const searchResultsLibrary = {
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
      //getTextToLocalMapping("Event UUID"),
	   {
        name: getTextToLocalMapping("Event UUID"),
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
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClicklibrary(row);
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
const onRowClicklibrary = rowData => {
  const reviewUrl = `library-summary?eventId=${rowData[0]}&eventuuId=${rowData[6]}&tenantId=`+getTenantId();
window.location.href =reviewUrl;
 
};

const onRowClickpressnote = rowData => {
  const reviewUrl = `pressnote-summary?pressnoteuuId=${rowData[3]}&tenantId=`+getTenantId();
 
 window.location.href =reviewUrl;
 
};

export const searchInviteGuest = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Event Id"),
      getTextToLocalMapping("Date & Time"),
      getTextToLocalMapping("Commitiee"),
      getTextToLocalMapping("Budjet"),
      getTextToLocalMapping("Status"),
     
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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



// Invite Summary List 
export const searchResultsinvitesummary = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Guest Name"),
      getTextToLocalMapping("Email"),
      getTextToLocalMapping("Contact No.")
     
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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

export const tenderSearchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Tender Notice ID"),
      getTextToLocalMapping("Date"),
      getTextToLocalMapping("File Number"),
      getTextToLocalMapping("Subject")
      // getTextToLocalMapping("File Number"),
      // getTextToLocalMapping("File Number")
    

    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
       onRowClick: (row, index) => {
         onTenderRowClick(row);
       }
    },
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map(item => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   }
    // }
  }
};

const onTenderRowClick = rowData => {
      window.location.href = `/egov-pr/tender-Summary?applicationNumber=${rowData[0]}&tenantId=${getTenantId()}`;
};

export const billingSearchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Tender Notice ID"),
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Date"),
      getTextToLocalMapping("File Number"),
      getTextToLocalMapping("Subject"),
      getTextToLocalMapping("Size of Publication")
  

    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
    },
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map(item => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   }
    // }
  }
};

export const publishTenderSearchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Tender Notice ID"),
      getTextToLocalMapping("Date"),
      getTextToLocalMapping("File Number"),
      getTextToLocalMapping("Subject"),
      {
      
      name: getTextToLocalMapping("Department User"),
      options: {
        display: false,
      
      }
      },
      {
        name: getTextToLocalMapping("tenderNoticeUuid"),
        options: {
          display: false,
        
        }
      },
      getTextToLocalMapping("tenderNoticeStatus"),
      
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onPubTenderRowClick(row);
      }
    },
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map(item => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   }
    // }
  }
};

const onPubTenderRowClick = rowData => {
  // if(JSON.parse(getUserInfo()).roles[0].code=="DEPARTMENTUSER")
  // {
  // window.location.href = `/egov-pr/tender-Summary?tenderId=${rowData[0]}&tenderuuId=${rowData[5]}&tenantId=${getTenantId()}`;
  // }
  // else{
    window.location.href = `/egov-pr/tender-Summary-Publish?tenderId=${rowData[0]}&tenderuuId=${rowData[5]}&Status=${rowData[6]}&tenantId=${getTenantId()}`;
    
 ////ss }
};


export const pressGrid = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Name"),
      getTextToLocalMapping("Type of the press"),
      getTextToLocalMapping("Publication name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile No"),
      // getTextToLocalMapping("Event Id"),
      // getTextToLocalMapping("Date & Time"),
      // getTextToLocalMapping("Commitiee"),
      // getTextToLocalMapping("Budjet"),
      // getTextToLocalMapping("Mobile No"),
     
    ],
  //  title: getTextToLocalMapping("Search Results for PUBLIC-RELATIONS Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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

export const masterGrid = {
  
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Type of the Press"),
      getTextToLocalMapping("Personnel Name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile Number"),
	  {
        name: getTextToLocalMapping("Event UUID"),
        options: {
          display: false,
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
      rowsPerPageOptions: [5, 10, 15],
    onRowClick: (row, index) => {
   //     onRowClickpressnote(row);
      }
    },
   
  }
};







export const TimeSeriessearchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Aggregate By Department"),
      getTextToLocalMapping("Year"),
      getTextToLocalMapping("Month"),
      getTextToLocalMapping("Number Events"),
      getTextToLocalMapping("New Events"),
      getTextToLocalMapping("Ongoing Events"),
      getTextToLocalMapping("Closed Events"),
      getTextToLocalMapping("Archived Events"),
    
   
     
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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

export const TimeSeriessearchEventResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Aggregate By Event Type"),
      
      getTextToLocalMapping("Year"),
      getTextToLocalMapping("Month"),
      
      getTextToLocalMapping("Number Events"),
      getTextToLocalMapping("New Events"),
      getTextToLocalMapping("Ongoing Events"),
      getTextToLocalMapping("Closed Events"),
      getTextToLocalMapping("Archived Events"),
      
   
     
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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


export const LocalityReportSearchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Locality Name"),
      getTextToLocalMapping("Number Events"),
      
      getTextToLocalMapping("New Events"),
      getTextToLocalMapping("Ongoing Events"),
      getTextToLocalMapping("Closed Events"),
      getTextToLocalMapping("Archived Events"),
    

     
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
}}}




export const EventReportSearchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Department Name"),
      getTextToLocalMapping("New Events"), 
      getTextToLocalMapping("Ongoing Events"),
      
      getTextToLocalMapping("Closed Events"),
      getTextToLocalMapping("Archived Events"),
      getTextToLocalMapping("Number Uploads"),
      // getTextToLocalMapping("Event Id"),
      // getTextToLocalMapping("Date & Time"),
      // getTextToLocalMapping("Commitiee"),
      // getTextToLocalMapping("Budjet"),
      // getTextToLocalMapping("Mobile No"),
     
    ],
  //  title: getTextToLocalMapping("Search Results for Fire-NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      // onRowClick: (row, index) => {
      //   onRowClick(row);
      // }
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



//  Resend Press Invites

const onPressselectAll = async (type, rowData, allrowdata, currentRowsSelected , allRowsSelected) => {
    
  

  let selectedrows = [];
  let selectedrows1=[];
      
   let tempdata = localStorageGet("gridobj");
   console.log('Presssssssstempdata');
   console.log(tempdata);
  // let tempdata1 = tempdata.split('},{').join('}|');
   let tempdata1 = tempdata.split('},{').join('}|{');
   let tempdata2 = tempdata1.split('|')
       
    tempdata2.map( item => {
      //console.log("------");
      console.log((item));
      let temp = JSON.parse(item) 
       let obj=[]
        obj[0]= temp.publicationName ? temp.publicationName : "-"
        obj[1]= temp.pressType? temp.pressType : "-"
        obj[2]=temp.personnelName ? temp.personnelName : "-"
        obj[3]=temp.email ? temp.email : "-"
        obj[4]=temp.mobile ? temp.mobile : "-"
        obj[5]=temp.pressMasterUuid ? temp.pressMasterUuid : "-"
       
      selectedrows.push(obj)

  })
  localStorageSet("ResendInvitelistAll", JSON.stringify(selectedrows));	




}
const onPressselect = async (type, rowData, allrowdata, currentRowsSelected , allRowsSelected) => {

			// //localStorageSet("Sendtoall", 0)
			// //console.log(type);
			// //console.log(type);
			// console.log( rowData);
			
			// let selectedrows = [];
			// let localinvdata = localStorageGet("ResendInvitelist");
			// if(localinvdata === null || localinvdata === "undefined")
			// {
				// selectedrows.push(rowData)

				// localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
			// }
			// else
			// {
				// let temp = JSON.parse(localStorageGet("ResendInvitelist"));
				// console.log("temppppppppppppp")
				// console.log(temp)
				// selectedrows = temp;
				// selectedrows.push(rowData)
				// localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));	
			// }	
			
			//localStorageSet("Sendtoall", 0)
			//console.log(type);
			console.log("ROwdata");
			console.log( rowData);
			
			let selectedrows = [];
			let localinvdata = localStorageGet("ResendInvitelist");
			if(localinvdata === null || localinvdata === "undefined")
			{


        let tempAll = JSON.parse(localStorageGet("ResendInvitelistAll"));
			
		//		let temp2 = rowData
        //temp2.splice(0, 2,"PRESS");
        let checked=false;
		if(tempAll!=null)
        {
        tempAll.map((item,index)=>{
          if(item[5] === rowData[5])
          {
            checked=true;
            tempAll.splice(index,1)
            localStorageSet("ResendInvitelist", JSON.stringify(tempAll));	
            
          }
          })
		}
    if(checked===false){
				let temp = rowData
				//temp.splice(0, 2,"PRESS");
				selectedrows.push(temp)
				console.log("ROwdata 1");
				console.log( selectedrows);
        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
    }
			}
			else
			{
				let temp = JSON.parse(localStorageGet("ResendInvitelist"));
				console.log(temp)
				let temp2 = rowData
        //temp2.splice(0, 2,"PRESS");
        let checked=false;
        temp.map((item,index)=>{
          if(item[5] === rowData[5])
          {
            checked=true;
            temp.splice(index,1)
            localStorageSet("ResendInvitelist", JSON.stringify(temp));	
            
          }
          })
    if(checked===false){
        temp.push(temp2)
        
				selectedrows = (temp)
				
				localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));	
			}	
    }
		
	
};


export const ResendPressInviteGrid = {
  
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      getTextToLocalMapping("Publication Name"),
      getTextToLocalMapping("Type of the Press"),
      getTextToLocalMapping("Personnel Name"),
      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile Number"),
	  {
        name: getTextToLocalMapping("Event UUID"),
        options: {
          display: false,
       }
      }
    ],
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: true,
      hover: true,
      rowsPerPageOptions: [5, 10, 15],
	  onRowsSelect:(currentRowsSelected , allRowsSelected) =>{
		//alert("Clicked");
		onPressselectAll('cell','','resend',currentRowsSelected , allRowsSelected)
	  },
	  onRowClick: (row, index) => {
		onPressselect('row',row);
      }
    },
   
  }
};