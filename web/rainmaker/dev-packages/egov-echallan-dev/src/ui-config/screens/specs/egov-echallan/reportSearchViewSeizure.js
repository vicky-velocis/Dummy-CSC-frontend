import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchViewSeizureReport } from "./searchReportResource/serachResultGrid";
import { searchTextViewSeizureReport } from "./searchReportResource/searchTextViewSeizureReport"
import { setapplicationType, getTenantId } from "egov-ui-kit/utils/localStorageUtils/";
import { fetchMdmsData, fetchSIName } from "../../../../ui-utils/commons";
import { resetAllFields } from "../utils";
import get from "lodash/get";

const header = getCommonHeader({
  labelName: "Search/View Seizure Report",
  labelKey: "EC_SEARCH_VIEW_SEIZURE_REPORT_HEADER"
});

const getSiNameDetails = async (action, state, dispatch) => {
  //http://192.168.12.114:8096/egov-hrms/employees/_search?roles=challanSM&tenantId=ch.chandigarh
  try {
    const queryStr = [
      { key: "tenantId", value: getTenantId() },
      { key: "roles", value: "challanSI" },
    ];
    await fetchSIName(state, dispatch, queryStr);


  } catch (e) {
    console.log(e);
  }

};

const getMdmsData = async (action, state, dispatch) => {
  try {
    let tenantId = getTenantId().length > 2 ? getTenantId().split('.')[0] : getTenantId();
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "egec",
            masterDetails: [
              {
                name: "EncroachmentType"
              },
              {
                name: "sector"
              }
            ]
          }
        ]
      }
    };

    await fetchMdmsData(state, dispatch, mdmsBody, false);

  } catch (e) {
    console.log(e);
  }
};

const VIEWSIZURESearchAndResult = {
  uiFramework: "material-ui",
  name: "reportSearchViewSeizure",
  beforeInitScreen: (action, state, dispatch) => {
    setapplicationType('searchViewSizure-Report');
    const objectJsonPath = `components.div.children.searchTextViewSeizureReport.children.cardContent.children`;
    const children = get(
      state.screenConfiguration.screenConfig["reportSearchViewSeizure"],
      objectJsonPath,
      {}
    );
    resetAllFields(children, dispatch, state, 'reportSearchViewSeizure');
    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(response => {
      getSiNameDetails(action, state, dispatch);
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "searchViewSeizureReport"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },

          }
        },
        searchTextViewSeizureReport,
        breakAfterSearch: getBreak(),
        searchViewSeizureReport
      }
    },
  }
};

export default VIEWSIZURESearchAndResult;
