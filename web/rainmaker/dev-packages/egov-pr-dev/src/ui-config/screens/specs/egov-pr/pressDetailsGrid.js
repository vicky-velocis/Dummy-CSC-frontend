import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";

//alert("grid")
//debugger

// export const textToLocalMapping = {
//   "Application No": getLocaleLabels(
//     "Application No",
//     "NOC_COMMON_TABLE_COL_APP_NO_LABEL",
//     getTransformedLocalStorgaeLabels()
//   ),
//   "NOC No": getLocaleLabels(
//     "NOC No",
//     "NOC_COMMON_TABLE_COL_NOC_NO_LABEL",
//     getTransformedLocalStorgaeLabels()
//   ),
//   "NOC Type": getLocaleLabels(
//     "NOC Type",
//     "NOC_TYPE_LABEL",
//     getTransformedLocalStorgaeLabels()
//   ),
//   "Owner Name": getLocaleLabels(
//     "Owner Name",
//     "NOC_COMMON_TABLE_COL_OWN_NAME_LABEL",
//     getTransformedLocalStorgaeLabels()
//   ),
//   "Application Date": getLocaleLabels(
//     "Application Date",
//     "APPLICATION_DATE_LABEL",
//     getTransformedLocalStorgaeLabels()
//   )
// };

export const searchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
    // data: [],
    columns: [
      // getTextToLocalMapping("Application No"),
      // getTextToLocalMapping("NOC No"),
      // getTextToLocalMapping("NOC Type"),
      // getTextToLocalMapping("Owner Name"),
      // getTextToLocalMapping("Application Date"),
      {headerName: 'Make', field: 'make'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
    
    ],
  
  }
};



