import React, { Component } from "react";
import { MultiDownloadCard } from "egov-ui-framework/ui-molecules";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.css";

class DownloadFileContainer extends Component {
  render() {
    const { data, documentData, ...rest } = this.props;
    return (
      <MultiDownloadCard data={data} documentData={documentData} {...rest} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  let { data } = ownProps;
  if (data && data.length > 0) {
    return { data };
  } else {
    data = get(
      screenConfiguration.preparedFinalObject,
      ownProps.sourceJsonPath
    );
    return { data };
  }
};

export default connect(
  mapStateToProps,
  null
)(DownloadFileContainer);
