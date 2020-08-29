import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog } from "@material-ui/core";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import set from 'lodash/set'
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";

class DialogContainer extends React.Component {
  handleClose = () => {
    const { screenKey } = this.props;
    this.props.handleField(
      screenKey,
      `components.div.children.adhocDialog`,
      "props.open",
      false
    );
  };



  render() {
    const { open, maxWidth, children,state } = this.props;
    return (
      <Dialog open={open} maxWidth={maxWidth} onClose={this.handleClose}>
        <DialogContent children={children} />
      </Dialog>
      // <Dialog open={open}  maxWidth="xs" aria-labelledby="form-dialog-title">
      // <DialogContent>
      // {/* <DialogContentText>
      //       To subscribe to this website, please enter your email address here. We will send updates
      //       occasionally.
      //     </DialogContentText> */}
      //     {/* <TextFieldContainer
      //       label="Email Address"
      //       type="email"
      //       fullWidth
      //     /> */}
        
      //        <TextFieldContainer
      //                 InputLabelProps={{ shrink: true }}
      //                 label= "Phone"
      //                 onChange={e =>
      //                   handleFieldChange( `Properties[0].owners[0].phone` , e.target.value,state)
      //                 }
      //                 jsonPath={`Properties[0].owners[0].phone`}
      //                 placeholder="enter address"
      //               />
      //                  <TextFieldContainer
      //                 InputLabelProps={{ shrink: true }}
      //                 required={true}  
      //                 label= "Address"
      //                 // onChange={e =>
      //                 //   handleFieldChange( `${dataPath}.mortgageApprovedGrantDetails[0].bankName` , e.target.value)
      //                 // }
      //                 // jsonPath={`${dataPath}.mortgageApprovedGrantDetails[0].bankName`}
      //                 placeholder="enter address"
      //               />
      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={this.handleClose} color="primary">
      //       Cancel
      //     </Button>
      //     <Button onClick={this.handleClose} color="primary">
      //       Update
      //     </Button>
      //   </DialogActions>
      // </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig } = screenConfiguration;
  const open = get(
    screenConfig,
    `${screenKey}.components.div.children.adhocDialog.props.open`
  );

  return {
    state,
    open,
    screenKey,
    screenConfig
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
