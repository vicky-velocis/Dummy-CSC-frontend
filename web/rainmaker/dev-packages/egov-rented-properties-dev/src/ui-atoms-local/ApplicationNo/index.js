import React from "react";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import {
  getQueryArg} from "egov-ui-framework/ui-utils/commons";
import "./index.css";

function ApplicationNoContainer(props) {
  const { number } = props;
  return <div className="application-no-container"><LabelContainer labelName="Application No." labelKey ={"TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"}/>
  {number}
  </div>;
}

export default ApplicationNoContainer;
