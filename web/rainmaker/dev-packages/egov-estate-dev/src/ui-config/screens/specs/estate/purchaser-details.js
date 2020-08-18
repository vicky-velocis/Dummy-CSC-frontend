import {
    getCommonHeader,
    getCommonContainer,
    getLabel,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject,handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getPurchaserDetails } from "./preview-resource/purchaser-details";
import { getUserInfo ,getTenantId} from "egov-ui-kit/utils/localStorageUtils";
import {onTabChange, headerrow, tabs} from './search-preview'


const userInfo = JSON.parse(getUserInfo());
const {roles = []} = userInfo
const findItem = roles.find(item => item.code === "CTL_CLERK");

let fileNumber = getQueryArg(window.location.href, "fileNumber");
let relations = getQueryArg(window.location.href, "relations");


// const purchaserDetails = getPurchaserDetails(false);


// export const propertyReviewDetails = getCommonCard({
//   purchaserDetails,
// });

const purchaserContainer = {
  uiFramework: "custom-atoms",
componentPath: "Container",
props: {
  id: "docs"
},
children: {
}
}

export const searchResults = async (action, state, dispatch, fileNumber,relation=null) => {
  let queryObject = [
    { key: "fileNumber", value: fileNumber }
  ];
  if(relation){ 
    queryObject.push({key: "relations", value: relation})
  }
  let payload = await getSearchResults(queryObject);
  if(payload) {
    let properties = payload.Properties;
    dispatch(prepareFinalObject("Properties", properties));
    
    let containers={}
    if(properties[0].propertyDetails.purchaseDetails){
      properties[0].propertyDetails.purchaseDetails.forEach((element,index) => { 
        let purchaseDetailContainer = getPurchaserDetails(false,index);
        containers[index] = getCommonCard({purchaseDetailContainer})
      });
    }
    
    dispatch(
      handleField(
      "purchaser-details",
      "components.div.children.purchaserContainer",
      "children",
      containers
      )
    );
  }
}

const beforeInitFn = async (action, state, dispatch, fileNumber,relation=null) => {
  dispatch(prepareFinalObject("workflow.ProcessInstances", []))
  if(fileNumber){
    if(relation){
      await searchResults(action, state, dispatch, fileNumber,relation)
    }
    else{
      await searchResults(action, state, dispatch, fileNumber)
    }
  }
}


const EstatePurchaserDetails = {
  uiFramework: "material-ui",
  name: "purchaser-details",
  beforeInitScreen: (action, state, dispatch) => {
    fileNumber = getQueryArg(window.location.href, "filenumber");
    relations = getQueryArg(window.location.href, "relations");
    beforeInitFn(action, state, dispatch, fileNumber,relations);
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
              activeIndex: 2,
              onTabChange
            },
            type: "array",
          },
          purchaserContainer
      }
    }
  }
};

export default EstatePurchaserDetails;