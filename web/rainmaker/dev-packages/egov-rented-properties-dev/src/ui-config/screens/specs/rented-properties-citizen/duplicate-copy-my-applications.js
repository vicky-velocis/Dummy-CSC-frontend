import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getDuplicateCopySearchResults } from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS_HEADER"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const getData = async (action, state, dispatch) => {
  const response = await getDuplicateCopySearchResults();
  if(!!response && !!response.DuplicateCopyApplications && !!response.DuplicateCopyApplications.length) {
    dispatch(prepareFinalObject("searchResults", response.DuplicateCopyApplications));
  }
}


const screenConfig = {
  uiFramework: "material-ui",
  name: "duplicate-copy-my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("actualResults", []));
    dispatch(prepareFinalObject("searchResults", []));
    getData(action, state, dispatch)
    return action
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            contents: [
              {
                label: "RP_COMMON_TABLE_COL_APPLICAITON_NUMBER",
                jsonPath: "applicationNumber"
              },
              // {
              //   label: "RP_PROPERTY_ID_LABEL",
              //   jsonPath: "property.id"
              // },
              {
                label: "RP_ALLOTMENT_NUMBER",
                jsonPath: "allotmenNumber",
              },
              {
                label: "RP_COMMON_TABLE_COL_OWNER_NAME",
                jsonPath: "applicant[0].name"
              },
              {
                label: "RP_COMMON_TABLE_COL_STATUS",
                jsonPath: "state"
              }
            ],
            moduleName: "DUPLICATECOPYOFALLOTMENTLETTERRP",
            homeURL: "/rented-properties/home"
          }
        }
      }
    }
  }
};

export default screenConfig;
