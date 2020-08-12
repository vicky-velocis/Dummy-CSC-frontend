import {
  getCommonHeader,
  getLabel,
  getBreak,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { estateApplication } from './citizenSearchResource/estateApplication';
import { searchResults } from './citizenSearchResource/searchResults'

const header = getCommonHeader({
  labelName: "Search Estate",
  labelKey: "EST_SEARCH_ESTATE_HEADER"
});

const citizenEstateSearchAndResult = {
  uiFramework: "material-ui",
  name: "property-search",
  beforeInitScreen: (action, state, dispatch) => {
    state.screenConfiguration.preparedFinalObject.citizenSearchScreen = {}
    return action
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
              ...header
            },
          }
        },
        estateApplication,
        breakAfterSearch: getBreak(),
        searchResults
      }
    }
  }
};

export default citizenEstateSearchAndResult;