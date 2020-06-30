import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";

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

const screenConfig = {
  uiFramework: "material-ui",
  name: "account-statement-my-applications",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header
      }
    }
  }
};

export default screenConfig;
