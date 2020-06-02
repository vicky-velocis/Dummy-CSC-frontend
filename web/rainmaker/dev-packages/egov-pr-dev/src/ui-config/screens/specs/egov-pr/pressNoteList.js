import {
  getCommonHeader,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { pendingApprovals } from "./searchResource/pendingApprovals";
import { searchResultsPressList } from "./searchResource/searchResults";
import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import {
  getTenantId,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import find from "lodash/find";
import set from "lodash/set";
import get from "lodash/get";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { getPressGridData } from "./searchResource/citizenSearchFunctions";
import { PressNoteFilter } from "./gridFilter/Filter";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "PR prss note list",
  labelKey: "PR_PRESS_NOTE_LIST"
});

const pageResetAndChange = (state, dispatch) => {
  dispatch(
    prepareFinalObject("PublicRelations", [{ "PublicRelationDetails.PublicRelationType": "NEW" }])
  );
  
};

const NOCSearchAndResult = {
  uiFramework: "material-ui",
  name: "pressNoteList",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("PublicRealation[0].filterEvent", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterInviteEvent", {}));
  //  dispatch(prepareFinalObject("PublicRealation[0].filterpress", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filtertender", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterpressMaster", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterLibraryEvent", {}));
    dispatch(prepareFinalObject("TimeseriesReport", {}));
    dispatch(prepareFinalObject("LocalityReport", {}));
    dispatch(prepareFinalObject("eventReport", {}));

  getPressGridData(action, state, dispatch);


    const tenantId = getTenantId();
    // const BSqueryObject = [
    //   { key: "tenantId", value: tenantId },
    //   { key: "businessServices", value: "PRSCP" }
    // ];
    // setBusinessServiceDataToLocalStorage(BSqueryObject, dispatch);
    // const businessServiceData = JSON.parse(
    //   localStorageGet("businessServiceData")
    // );
    // const data = find(businessServiceData, { businessService: "PRSCP" });
    // const { states } = data || [];
    // if (states && states.length > 0) {
    //   const status = states.map((item, index) => {
    //     return {
    //       code: item.state
    //     };
    //   });
    //   dispatch(
    //     prepareFinalObject(
    //       "applyScreenMdmsData.searchScreen.status",
    //       status.filter(item => item.code != null)
    //     )
    //   );
    // }
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PublicRelation.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        getRequiredDocuments(documents)
      );
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "pressNoteList"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        
        },
        // pendingApprovals,
        PressNoteFilter,
        breakAfterSearch: getBreak(),
        // progressStatus,
        searchResultsPressList
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pr",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "pressNoteList"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default NOCSearchAndResult;
