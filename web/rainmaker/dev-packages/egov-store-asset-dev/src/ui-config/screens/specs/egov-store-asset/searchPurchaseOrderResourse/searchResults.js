import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils"; 
export const getTextToLocalMapping = (label) => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Indent No":
      return getLocaleLabels(
        "Indent No",
        "STORE_PURCHASE_ORDER_INDENT_NO",
        localisationLabels
      );
    case "Indent Date":
      return getLocaleLabels(
        "Indent Date",
        "STORE_PURCHASE_ORDER_INDENT_DATE",
        localisationLabels
      );
    case "Store Name":
      return getLocaleLabels(
        "Store Name",
        "STORE_DETAILS_STORE_NAME",
        localisationLabels
      );
      case "Indent Purpose":
        return getLocaleLabels(
          "Indent Purpose",
          "STORE_PURCHASE_ORDER_INDENT_PRPS",
          localisationLabels
        );
        case "Inventory Type":
      return getLocaleLabels(
        "Inventory Type",
        "STORE_INVENTRY_TYPE",
        localisationLabels
      );
    case "Raised By":
      return getLocaleLabels(
        "Raised By",
        "STORE_PURCHASE_ORDER_INDENT_RAISED",
        localisationLabels
      );
      case "Indent Status":
        return getLocaleLabels(
          "Indent Status",
          "STORE_PURCHASE_ORDER_INDENT_STATUS",
          localisationLabels
        );
    case "Search Results for Purchase Order":
      return getLocaleLabels(
        "Search Results for Purchase Order",
        "STORE_PURCHASE_ORDR_SEARCH_RESULTS_TABLE_HEADING",
        localisationLabels
      );
  }
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
      getTextToLocalMapping("Indent No"),
      getTextToLocalMapping("Indent Date"),
      getTextToLocalMapping("Store Name"),
      getTextToLocalMapping("Indent Purpose"),
      getTextToLocalMapping("Inventory Type"),
      getTextToLocalMapping("Raised By"),
      getTextToLocalMapping("Indent Status"),
    ],
    title: getTextToLocalMapping("Search Results for Purchase Order"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      },
    },
  },
};

const onRowClick = (rowData) => {
  window.location.href = `view-material-type?tenantId=${getTenantId()}&code=${rowData[3]}`;
};


