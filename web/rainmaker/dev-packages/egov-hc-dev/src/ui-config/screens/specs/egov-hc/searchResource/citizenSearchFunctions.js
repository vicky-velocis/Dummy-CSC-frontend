import { prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { getSearchResults, getSearchResultsForFilters } from "../../../../../ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

//useful
export const fetchData = async (action, state, dispatch) => {
  const response = await getSearchResults();
  try {
    if (response.services.length > 0) {
      dispatch(prepareFinalObject("searchResults", response.services));
      dispatch(prepareFinalObject("myServiceRequestsCount", response.services.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
//useful
export const fetchDataForFilterFields = async (state, dispatch) => {
  let flag_api_call = true;
  let fromdate= get(state.screenConfiguration.preparedFinalObject,"myServiceRequests[0].FromDate")
  let Todate= get(state.screenConfiguration.preparedFinalObject,"myServiceRequests[0].ToDate")
  let serviceRequestType = get(state.screenConfiguration.preparedFinalObject, "myServiceRequests[0].servicetype") 
  let serviceRequestId = get(state.screenConfiguration.preparedFinalObject, "myServiceRequests[0].servicerequestid")
        
  var date1 = new Date(fromdate);
  var date2 = new Date(Todate);

  if(fromdate === undefined &&
    Todate === undefined) 
    {
      flag_api_call = true;
    }
  else if(fromdate === undefined ||
  fromdate.length === 0 &&
  Todate !== undefined &&
  Todate.length !== 0) 
  {
    flag_api_call = false;
    {
      dispatch(
        toggleSnackbar(
          true,
          { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" },
          "warning"
        )
      );
    }
  }
  else if(Todate === undefined ||
    Todate.length === 0 &&
    fromdate !== undefined &&
    fromdate.length !== 0) 
    {
      flag_api_call = false;
      {
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Please fill To Date", labelKey: "ERR_FILL_TO_DATE" },
            "warning"
          )
        );
      }
    }
    
    let fromDateInTime = parseInt(date1.getTime());
    let toDateInTime = parseInt(date2.getTime());
    if(parseInt(fromDateInTime) > parseInt(toDateInTime))
    {
      flag_api_call = false;
      {
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "From date should be less than to date", labelKey: "ERR_FROM_DATE_SHOULD_BE_LESS_THAN_TO_DATE" },
            "warning"
          )
        );
      }
    }
    

  var oneDayDifference = 60 * 60 * 24 * 1000;
  // var fromDateInTime = date1.getTime();
  // var toDateInTime = date2.getTime();
  if(parseInt(fromDateInTime) === parseInt(toDateInTime))
    {
      toDateInTime = toDateInTime + oneDayDifference
    }

  let filterdata = 
  {
      "fromDate":fromDateInTime,
      "toDate":toDateInTime,
      "serviceType": serviceRequestType,
      "service_request_id":serviceRequestId

  };
  if (flag_api_call === true)
  {
    
  const response = await getSearchResultsForFilters(filterdata);
  console.log("^^^^^^^",response.services.length)
  // alert(JSON.stringify(response.services[0].createdtime));
  
  // let servicerequestDate = get(state, "screenConfiguration.preparedFinalObject.SERVICEREQUEST", []);
  // alert("EPOCH Date :: " + servicerequestDate);
  // var myDate = new Date( your epoch date *1000);
  // document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
  
  try {
    if (response.services.length >= 0) {
      dispatch(prepareFinalObject("searchResults", response.services));
      dispatch(prepareFinalObject("myServiceRequestsCount", response.services.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
  
  }
  
};

export const resetFields = (state, dispatch) => {
  // screenConfiguration.screenConfig.myServiceRequests.components.div.children.form.children.cardContent.children.masterContainer.children.ServiceRequestId
  dispatch(
    handleField(
      "myServiceRequests",
      "components.div.children.form.children.cardContent.children.masterContainer.children.FromDate",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "myServiceRequests",
      "components.div.children.form.children.cardContent.children.masterContainer.children.ServiceRequestId",
      "props.value",
      ""
    )
  );


  dispatch(
    handleField(
      "myServiceRequests",
      "components.div.children.form.children.cardContent.children.masterContainer.children.ServiceRequestType",
      "props.value",
      ""
    )
  );

  
  dispatch(
    handleField(
      "myServiceRequests",
      "components.div.children.form.children.cardContent.children.masterContainer.children.ToDate",
      "props.value",
      ""
    )
  );
};

export const resetFieldsForEmployeeFilter = (state, dispatch) => {
  // "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.StatusLocalityAndFromToDateContainer.children.locality"
  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.StatusLocalityAndFromToDateContainer.children.locality",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.StatusLocalityAndFromToDateContainer.children.fromDate",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.StatusLocalityAndFromToDateContainer.children.toDate",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.StatusLocalityAndFromToDateContainer.children.ServiceRequestStatus",
      "props.value",
      ""
    )
  );


  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.serviceRequestidContactNoAndRequestTypeContainer.children.ServiceRequestId",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.serviceRequestidContactNoAndRequestTypeContainer.children.ServiceRequestType",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "employeeServiceRequestsFilter",
      "components.div.children.ServiceRequestFilterFormForEmployee.children.cardContent.children.serviceRequestidContactNoAndRequestTypeContainer.children.contactno",
      "props.value",
      ""
    )
  );
};