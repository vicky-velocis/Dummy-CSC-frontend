import {
    getCommonHeader,
    getCommonContainer,
    getLabel,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject,handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getOwnerDetails,getAllotmentDetails } from "./preview-resource/owner-properties";
import { getUserInfo ,getTenantId} from "egov-ui-kit/utils/localStorageUtils";

const userInfo = JSON.parse(getUserInfo());
const {roles = []} = userInfo
const findItem = roles.find(item => item.code === "CTL_CLERK");

let fileNumber = getQueryArg(window.location.href, "fileNumber");

export const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelName: "Estate",
    labelKey: "ESTATE_COMMON_ESTATE"
  })
});
// const OwnerDetails = getOwnerDetails(false);
// const AllotmentDetails = getAllotmentDetails(false);


// export const propertyReviewDetails = getCommonCard({
//   OwnerDetails,
//   AllotmentDetails
// });

const ownerContainer = {
  uiFramework: "custom-atoms",
componentPath: "Container",
props: {
  id: "docs"
},
children: {
}
}

export const searchResults = async (action, state, dispatch, fileNumber) => {
  let queryObject = [
    { key: "fileNumber", value: fileNumber }
  ];
  let payload = await getSearchResults(queryObject);
  if(payload) {
    let properties = payload.Properties;
    dispatch(prepareFinalObject("Properties", properties));
    
    let containers={}
    properties[0].propertyDetails.owners.forEach((element,index) => { 
      let ownerdetailsComponent = getOwnerDetails(false,index);
      let allotmentDetailsComponent = getAllotmentDetails(false,index);
      containers[index] = getCommonCard({
        ownerdetailsComponent,
        allotmentDetailsComponent
      });  
    });
    dispatch(
      handleField(
      "owner-details",
      "components.div.children.ownerContainer",
      "children",
      containers
      )
    );
  }
}

const beforeInitFn = async (action, state, dispatch, fileNumber) => {
  dispatch(prepareFinalObject("workflow.ProcessInstances", []))
  if(fileNumber){
    await searchResults(action, state, dispatch, fileNumber)
  }
}

export const onTabChange = async(tabIndex, dispatch, state) => {
  fileNumber = getQueryArg(window.location.href, "filenumber");
  let path = ""
  switch(tabIndex){
    case 0:
      path = `/estate/search-preview?filenumber=${fileNumber}`
      break
    case 1:
      path = `/estate/owner-details?filenumber=${fileNumber}`
      break
    case 2:
      path = `/estate/purchaser-details?filenumber=${fileNumber}`
      break
    case 3:
      path = `/estate/payment-details?filenumber=${fileNumber}`
      break
    case 4:
      path = `/estate/document-details?filenumber=${fileNumber}`
      break
    case 5:
      path = `/estate/notices?filenumber=${fileNumber}`
      break
    case 6:
      path = `/estate/court-case?filenumber=${fileNumber}`
      break

}
  dispatch(setRoute(path))
}

export const tabs = [
  {
    tabButton: { labelName: "Property Details", labelKey: "ESTATE_PROPERTY_DETAILS" },
  },
  {
    tabButton: { labelName: "Owner Details", labelKey: "ESTATE_OWNER_DETAILS" },
  },
  {
    tabButton: { labelName: "Purchaser Details", labelKey: "ESTATE_PURCHASER_DETAILS" },
  },
  {
    tabButton: { labelName: "Payment Details", labelKey: "ESTATE_PAYMENT_DETAILS" },
  },
  {
    tabButton: { labelName: "Documents", labelKey: "ESTATE_DOCUMENTS" },
  },
  {
    tabButton: { labelName: "Notices", labelKey: "ESTATE_NOTICES" },
  },
  {
    tabButton: { labelName: "Court Case", labelKey: "ESTATE_COURT_CASE" },
  }
]

const EstateOwnerDetails = {
  uiFramework: "material-ui",
  name: "owner-details",
  beforeInitScreen: (action, state, dispatch) => {
    fileNumber = getQueryArg(window.location.href, "filenumber");
    beforeInitFn(action, state, dispatch, fileNumber);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
             ...headerrow
            },
            }
          },
          tabSection: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-estate",
            componentPath: "CustomTabContainer",
            props: {
              tabs,
              activeIndex: 1,
              onTabChange
            },
            type: "array",
          },
          taskStatus: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-estate",
            componentPath: "WorkFlowContainer",
            props: {
              dataPath: "Properties",
              moduleName: "MasterRP",
              updateUrl: "/csp/property/_update"
            }
          },
          ownerContainer
      }
    }
  }
};

export default EstateOwnerDetails;