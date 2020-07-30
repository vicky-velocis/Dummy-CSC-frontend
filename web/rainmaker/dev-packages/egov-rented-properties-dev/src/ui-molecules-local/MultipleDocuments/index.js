// import React, { Component } from "react";
// import Label from "egov-ui-framework/ui-containers/LabelContainer";
// import Card from "@material-ui/core/Card";
// import Typography from "@material-ui/core/Typography"
// import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
// import { withStyles } from "@material-ui/core/styles";
// import { checkValueForNA } from "egov-ui-framework/ui-config/screens/specs/utils";
// import get from "lodash/get";

// const styles = {
//     card: {
//       paddingTop: 8,
//       borderRadius: "inherit"
//     }
//   };

// class MultipleDocuments extends Component {

//   render() {
//       const {data = [], contents, classes} = this.props
//       console.log("documentsdata",data)
//       return (
//           <div>
//             {data[0].applicationDocuments[0].id}
//           </div>
//       )
//   }
// }

// export default withStyles(styles)(MultipleDocuments)

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import {LabelContainer}  from "egov-ui-framework/ui-containers"
// import "./index.css";

const styles = {
    card: {
      paddingTop: 8,
      borderRadius: "inherit"
    },
    whiteCard: {
      maxWidth: 250,
      backgroundColor: "#FFFFFF",
      paddingLeft: 8,
      paddingRight: 0,
      paddingTop: 11,
      paddingBottom: 0,
      marginRight: 16,
      marginTop: 16
    },
    subtext: {
      paddingTop: 7
    },
    body2: {
      wordWrap: "break-word"
    }
  };
  
  const documentTitle = {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  };

//  class MultipleDocuments extends Component {

//     render() {
//         const {data = [], contents, classes} = this.props
//         return (
//             <div>
//                 {!!data.length && data.map((datum, index) => (
//                     <Card className={classes.card}>
//                     <CardContent>
//                     <Grid container>
//                         {datum.applicationDocuments.map((content) => (
//                             <Grid xs={6} sm={3} 
//                             style={{
//                                 marginBottom: "8px",
//                                 marginTop: "8px",
//                                 wordBreak : "break-word"
//                               }}>
//                             {/* <Grid xs={12} sm={12}>
//                             <Typography variant="caption">
//                             <Label
//                               labelKey={content.fileStoreId}
//                             //   fontSize={14}
//                             />
//                             </Typography>
//                             </Grid> */}
//                             <Grid xs={12} sm={12}>
//                             <Typography variant="body2">
//                             {/* <Label
//                               labelKey={this.generateLabelKey(content, datum)}
//                             //   fontSize={14}
//                               checkValueForNA={checkValueForNA}
//                             /> */}
//                             </Typography>
//                             </Grid>
//                             </Grid>)
//                         )}
//                     </Grid>
//                     </CardContent>
//                     </Card>)
//                     )}
//             </div>
//         )
//     }
// }

class MultipleDocuments extends Component {

  render() {
      const {data = [], contents, classes} = this.props
      return (
          <div>
              {!!data.length && data.map((datum, index) => (
                  <Card className={classes.card}>
                  <CardContent>
                  <Grid container>
                      {datum.applicationDocuments.map((content) => (
                          <Grid xs={6} sm={3} 
                          style={{
                              marginBottom: "8px",
                              marginTop: "8px",
                              wordBreak : "break-word"
                            }}>
                           <Grid
                            item
                            container
                            xs={6}
                            sm={4}
                            className={
                               classNames(classes.whiteCard, "background-grey")
                              
                            }
                            >
                          <Grid xs={12}>
                            <LabelContainer
                              labelName= {content.documentType}
                              labelKey="imagekey"
                              style={documentTitle}
                            />
                          </Grid>
                          <Grid container>
                            <Grid xs={6} className={classes.subtext}>
                              <Typography className={classes.body2}>{content.documentType}</Typography>
                            </Grid>
                            <Grid xs={6} align="right">
                              <Button href={content.url} color="primary">
                                Download
                              </Button>
                            </Grid>
                          </Grid>
                          </Grid>
                      
                          </Grid>)
                      )}
                  </Grid>
                  </CardContent>
                  </Card>)
                  )}
          </div>
      )
  }
}



export default withStyles(styles)(MultipleDocuments)