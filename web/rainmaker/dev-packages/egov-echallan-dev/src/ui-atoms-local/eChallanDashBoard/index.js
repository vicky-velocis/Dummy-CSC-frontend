import React from "react";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import {
  getQueryArg
} from "egov-ui-framework/ui-utils/commons";
import "./index.css";
import Icon from "egov-ui-framework/ui-atoms/Icon";

function eChallanDashBoard(props) {

  const { number } = props;
  return (
    <div className="">
      <LabelContainer labelName="E - Challan" 
      labelKey={"EC_CHALLAN_DASHBOARD_CARD"} 
      />
      <Icon 
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon"
      id="searchIcon"
      >
        wysiwyg
      </Icon>
      

    </div>
  );
}
export default eChallanDashBoard;
