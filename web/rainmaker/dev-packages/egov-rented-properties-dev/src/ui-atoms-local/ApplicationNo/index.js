import React from "react";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import {
  getQueryArg} from "egov-ui-framework/ui-utils/commons";
import "./index.css";

function ApplicationNoContainer(props) {
  console.log(props)
  const { number } = props;
  const { notice }=props;
  const isEditRenewal = getQueryArg(window.location.href,"action") === "EDITRENEWAL"||getQueryArg(window.location.href,"action") === "DIRECTRENEWAL"
  const isSubmitRenewal = getQueryArg(window.location.href,"purpose") === "EDITRENEWAL"||getQueryArg(window.location.href,"purpose") === "DIRECTRENEWAL"
  if(isEditRenewal ||isSubmitRenewal){
    const licenseNumber=getQueryArg(window.location.href, "licenseNumber") || "";
  return <div className="application-no-container"><LabelContainer labelName="License No." labelKey ={"TL_LICENSE_NO_CODE"}/>
  {licenseNumber}
  </div>;
  } 
else if(props.notice==="Notice"){
  return <div className="application-no-container"><LabelContainer labelName="Notice Id." labelKey ={"RP_NOTICE_ID"}/>
  {number}
  </div>;
}
else
    return <div className="application-no-container"><LabelContainer labelName="Application No." labelKey ={"TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"}/>
  {number}
  </div>;
}
export default ApplicationNoContainer;
