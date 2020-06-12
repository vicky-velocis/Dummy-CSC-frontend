import {
    getBreak,
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern,
    getLabel,
   
    getDateField
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

  import "./index.css";


  

  export const tenderDetails = getCommonCard({
    subHeader: getCommonTitle({
        labelName: "Publish Tender Notice Details",
        labelKey: "PR_PUBLISH_TENDER_NOTICE_DETAILS"
    }),
    
    appStatusAndToFromDateContainer: getCommonContainer({
        
       	  
          sizeOfPublication: {
            ...getTextField({
              label: {
                labelName: "Size Of Publication",
                labelKey: "PR_TENDER_SIZE_OF_PUBLICATION"
              },
              placeholder: {
                labelName: "Size Of Publication",
                labelKey: "PR_TENDER_SIZE_OF_PUBLICATION_PLACEHOLDER"
              },
              pattern: getPattern("sizeofpublication"),
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              required: true,
              jsonPath: "tender.publicationsize"
            })
          } 
    })
  });


  
  
  
  
export const EmailSmsContent = getCommonCard({
	//  subjectemail: getCommonTitle(
  //   {
  //     labelName: "Subject",
  //     labelKey: "PR_EMAIL_Subject"
  //   },
  //   {
  //    style: {
  //       marginBottom: 20,
	// 	marginTop: 20
  //     }
  //   }
  // ),
  // break: getBreak(),
  //  break: getBreak(),
  // Emailsubject: {
  //    uiFramework: "custom-molecules-local",
  //         moduleName: "egov-pr",
  //         componentPath: "RichTextEditor",
  //         props: { label : "subject"}
  // },
  // break: getBreak(),	

  subjectemail: {
    ...getTextField({
      label: {
        labelName: "Subject",
        labelKey: "PR_EMAIL_Subject"
      },
      placeholder: {
       labelName: "Subject",
        labelKey: "PR_EMAIL_Subject_PLACEHOLDER"
      },
      pattern: getPattern("AlphaNumValidationsms"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: true,
      jsonPath: "tender.subjectemail",
	   gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        }
    })
  } ,
	headeremail: getCommonTitle(
    {
      labelName: "Email Template",
      labelKey: "PR_EMAIL_TEMPLATE"
    },
    {
     style: {
        marginBottom: 20,
		marginTop: 20
      }
    }
  ),
  break: getBreak(),
   break: getBreak(),

  EmailContent: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "RichTextEditor",
          props: { label : "email"}
  },
  break: getBreak(),
  
    break: getBreak(),
   break: getBreak(),
   headersms: getCommonTitle(
    {
      labelName: "SMS Template",
      labelKey: "PR_SMS_TEMPLATE"
    },
    {
      style: {
        marginBottom: 20,
		marginTop: 20
      }
    }
  ),
  break: getBreak(),
   break: getBreak(),
   
  // SMSContent: {
     // uiFramework: "custom-molecules-local",
          // moduleName: "egov-pr",
          // componentPath: "RichTextEditor",
          // props: { label : "sms"}
  // },
  SMSContent: {
    ...getTextField({
      label: {
        labelName: "SMS Template",
        labelKey: "PR_SMS_TEMPLATE"
      },
     
      pattern:getPattern("AlphaNumValidationsms"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: true,
      jsonPath: "tender.SMSContent",
	   gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        }
    })
  }
  });  


//  Resend Tender Invites

const onPressselectAll = async (type, rowData, allrowdata, currentRowsSelected , allRowsSelected) => {
	console.log("SELCT ALL CLICKKKKKKKKKKKKKKKKK Employee");
	console.log(rowData)
	console.log(allrowdata)
	
		if(allRowsSelected.length == localStorageGet("gridobjlength"))
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
		else
		{
			if(currentRowsSelected.length == 0)
			{
				localStorageSet("ResendInvitelist",[]);
			}
			localStorageSet("ResendInvitelistAll", []);
			
		}

}
const onPressselect = async (type, rowData, allrowdata, currentRowsSelected , allRowsSelected) => {

	
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

        let tempAll = JSON.parse(localStorageGet("ResendInvitelistAll"));
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
				selectedrows.push(rowData)
        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
              }
			}
			else
			{
				let temp = JSON.parse(localStorageGet("ResendInvitelist"));
				console.log("temppppppppppppp")
        console.log(temp)
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
			let localinvdata = localStorageGet("ResendInvitelist");
			if(localinvdata === null || localinvdata === "undefined")
			{

        let tempAll = JSON.parse(localStorageGet("ResendInvitelistAll"));
		
        let checked=false;
        tempAll.map((item,index)=>{
          if(item[5] === rowData[5])
          {
            checked=true;
            tempAll.splice(index,1)
            localStorageSet("ResendInvitelist", JSON.stringify(tempAll));	
            
          }
          })
          if(checked===false){


				selectedrows.push(rowData)

        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
          }
			}
			else
			{
				let temp = JSON.parse(localStorageGet("ResendInvitelist"));
				console.log("temppppppppppppp")
        console.log(temp)
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
				selectedrows = temp;
				selectedrows.push(temp)
        localStorageSet("ResendInvitelist", JSON.stringify(selectedrows));
          }	
			}	
		}
	}
	
};

export const ResendTenderInviteGrid = {
  
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
	     selectableRowsHeader : true,
	// disableToolbarSelect : true,
	 selectableRowsOnClick : false,
      rowsPerPageOptions: [5, 10, 15],
	  onRowsSelect:(currentRowsSelected , allRowsSelected,state,dispatch,action) =>{
		
		onPressselectAll('cell','','resend',currentRowsSelected , allRowsSelected)
	  },
	  onRowClick: (row, index) => {
	    
		onPressselect('rowdata',row,"resend")
      }
    },
   


  }
};