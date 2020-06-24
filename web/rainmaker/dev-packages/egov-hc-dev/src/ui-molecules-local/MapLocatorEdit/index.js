import React, { Component } from "react";
import { connect } from "react-redux";
import { MapLocation } from "../../ui-atoms-local";

import { defaultLocation } from "../../ui-config/hc-app-config";
import { Button, Icon } from "egov-ui-framework/ui-atoms";
import isEmpty from "lodash/isEmpty";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.scss";

const pickBtn = {
  display: "block"
};

var add = {};

class MapLocator extends Component {
 
  constructor(props) {
    
    
    super(props);
    this.state = {
      showMyAddress: true,
      currLoc: {},
      pickedLoc: {}
    };
  }

  componentDidMount() {
   
    
    let myLocation = {};
    
    if (this.state.showMyAddress === true && myLocation) {
      this.setState({
        currLoc: myLocation
      });
    }
  }

  
  getMyLocation = () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            currLoc: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address:position.formatted_address
            }
          });
        },
        function (error) {
          console.log(error.code);
        }
      );
    }
  };

  setPickedLocation = (lati, long,address) => {
    add.lat = lati;
    add.lng = long;
    add.address=address;
  };

  closeMapPopup = () => {
    this.props.handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.mapsDialog",
      "props.open",
      false
    );
  };

  onClickPick = () => {
    
    this.props.handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.SILocationDetailsConatiner.children.propertyGisCoordinates.children.gisTextField",
      "props.value",
      `${add.lat}, ${add.lng} ,${add.address}`
    );
    this.props.prepareFinalObject(
      "SERVICEREQUEST.latitude",
      add.lat
    );
    this.props.prepareFinalObject(
      "SERVICEREQUEST.longitude",
      add.lng
    );

    this.closeMapPopup();
    
    
    
  };

  convertToAddress = add => {
    const { lat, lng, address } = add;
    this.setState({
      currLoc: {}
    });
    lat &&
      this.props.handleFieldChange(
        this.props.formKey,
        "latitude",
        parseFloat(lat).toFixed(6)
      );
    lng &&
      this.props.handleFieldChange(
        this.props.formKey,
        "longitude",
        parseFloat(lng).toFixed(6)
      );
      
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: lat, lng: lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            
            this.props.handleFieldChange(
              this.props.formKey,
              "address",
              results[0].formatted_address
            );
          }
        }
      }
    );
  };

  onCLickMapBackBtn = () => {
    this.setPrevPageFlag();
    this.props.history.goBack();
  };

  setPrevPageFlag = () => {
    if (this.props.formKey === "propertyTax") {
      sessionStorage.setItem("backFromPTMap", true);
    }
  };

  render() {
    let { currLoc } = this.state;
    const { location } = this.props;
    var _currloc = !isEmpty(currLoc)
      ? currLoc
      : isEmpty(location)
        ? defaultLocation
        : location;
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div className="back-btn">
          <Icon
            id="map-back-btn"
            style={{
              width: "200px",
              height: "48px",
              marginRight: "16px"
            }}
            variant={"outlined"}
            color={"primary"}
            action="navigation"
            name={"arrow-back"}
            onClick={this.onCLickMapBackBtn}
          />
        </div>
        <MapLocation
          currLoc={_currloc}
          setLocation={this.setPickedLocation}
          getMyLoc={this.getMyLocation}
          
          hideTerrainBtn={true}
          dragInfoBox={false}
          viewLocation={false}
        />
        <div className="responsive-action-button-cont">
          <Button
            id="map-close-button"
            className="pick responsive-action-button"
            children={"Close"}
            style={{
              ...pickBtn,
              width: "200px",
              height: "48px",
              marginRight: "16px"
            }}
            variant={"outlined"}
            color={"primary"}
            onClick={this.closeMapPopup}
          />
          <Button
            id="map-pick-button"
            className="pick responsive-action-button"
            children={"Pick"}
            style={{
              ...pickBtn,
              width: "200px",
              height: "48px",
              marginRight: "16px"
            }}
            variant={"contained"}
            color={"primary"}
            onClick={this.onClickPick}
          />
        </div>
      </div>
    );
  }
}















const mapDispatchToProps = dispatch => {
  return {
    handleField: (formKey, path, props, value) =>
      dispatch(handleField(formKey, path, props, value)),
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MapLocator);
