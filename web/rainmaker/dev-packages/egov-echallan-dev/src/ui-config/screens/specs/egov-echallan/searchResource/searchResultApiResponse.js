//import { getSearchResults } from "../../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
//import { getGridData1,getCategory1,getYear1,getMonth1,getrepotforproccessingTime1,getSectordata1,getSubCategory1,getUpdatePriceBook1,getMasterGridData1,getGridDataSellMeat1,getGridDataRoadcut1,getGridDataAdvertisement1} from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch, fetchRoleCode, truncData } from "../../utils/index";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { validateFields, getMdmsEncroachmentSectorData } from "../../utils";
import get from "lodash/get";
import set from "lodash/set";
import { fetchMasterChallanData, fetchViewSeizureData, fetchPaymentDetailsData, fetchStoreItemHODMasterChallanData } from "../../../../../ui-utils/commons";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";


export const searchResultApiResponse = async (action, state, dispatch) => {

  let roles = JSON.parse(getUserInfo()).roles
  let si_Name = ''; //role_name === 'challanSI' ? JSON.parse(getUserInfo()).name : ''
  let actionNmae = fetchRoleCode(false, '');  // !== 'challanSI' ? 'challanSM' : '';
  let requestBody = {
    "tenantId": getTenantId(),
    "action": actionNmae,
    "offset": 1,
    "limit": -1,
    "orderDir": "DESC",
    "orderColumn": "",
    "searchText": si_Name
  }
  try {
    let response;
    await getMdmsEncroachmentSectorData(action,state,dispatch);

    response = await fetchMasterChallanData(requestBody);
    if (response) {
      let dataarray = [];
      let sectorValue = get(state, 'screenConfiguration.preparedFinalObject.applyScreenMdmsData.egec.sector', []);
      let encroachValue = get(state, 'screenConfiguration.preparedFinalObject.applyScreenMdmsData.egec.EncroachmentType', []);
    
      let data = response.ResponseBody.map(function (item, index) {
        // alert(item)
        let temp = [];

        let __FOUND = sectorValue.find(function (sectorRecord, index) {
          if (sectorRecord.code == item['sector'])
            return true;
        });
        let __FOUNDENCROACH = encroachValue.find(function (encroachRecord, index) {
          if (encroachRecord.code == item['encroachmentType'])
            return true;
        });    
  
        let paymentStatus = item.paymentDetails.paymentStatus === 'PENDING' ? 'UNPAID' : 'PAID';
        temp[0] = item['challanId'];
        temp[1] = __FOUNDENCROACH.name;
        temp[2] = convertEpochToDate(item['violationDate']);
        temp[3] = truncData(item['violatorName'],25);
        temp[4] = __FOUND.name;
        temp[5] = item['contactNumber'];
        temp[6] = item['siName'];
        temp[7] = item['status'];
        temp[8] = item['tenantId'];
        temp[9] = item['challanUuid'];
        temp[10] = paymentStatus
        dataarray.push(temp);
      });


      dispatch(prepareFinalObject('eChallanMasterGrid', dataarray));
      localStorage.setItem('eChallanMasterGrid', JSON.stringify(dataarray));

      dispatch(
        handleField(
          "echallan-landing",
          "components.div.children.serachResultGrid",
          "props.data",
          dataarray
        )
      );
      showHideTable(true, dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchResultCitizenApiResponse = async (action, state, dispatch) => {
  let userInfo = JSON.parse(getUserInfo());
  let requestBody = {
    "tenantId": getTenantId(),
    "action": "",
    "offset": -1,
    "limit": -1,
    "orderDir": "DESC",
    "orderColumn": "violationDate",
    "searchText": get(userInfo, "mobileNumber")
  }
  const response = await fetchMasterChallanData(requestBody)

  console.log("res", response)
  try {

    if (response) {
      dispatch(prepareFinalObject("searchResults", response.ResponseBody));
      dispatch(
        prepareFinalObject("myApplicationsCount", response.ResponseBody.length)
      );
      showHideTable(true, dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};


const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.serachResultGrid",
      "visible",
      booleanHideOrShow
    )
  );
};

