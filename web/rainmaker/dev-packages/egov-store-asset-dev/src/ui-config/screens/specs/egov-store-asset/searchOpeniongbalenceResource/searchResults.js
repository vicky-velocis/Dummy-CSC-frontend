import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId} from "egov-ui-kit/utils/localStorageUtils";
export const getTextToLocalMapping = (label) => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "MRN Number":
      return getLocaleLabels(
        "MRN Number",
        "STORE_MATERIAL_NUMBER",
        localisationLabels
      );

      case "Store Name":
        return getLocaleLabels(
          "Store Name",
          "STORE_DETAILS_STORE_NAME",
          localisationLabels
        );
    case "Financial Year":
      return getLocaleLabels(
        "Financial Year",
        "STORE_MATERIAL_OPENNING_BALANCE_FINANCIAL_YEAR",
        localisationLabels
      );
      case "Parent Material Type Name":
        return getLocaleLabels(
          "Parent Material Type Name",
          "HR_COMMON_TABLE_COL_PRNT_MATERIAL_NAME",
          localisationLabels
        );
        case "Store Name":
          return getLocaleLabels(
            "Store Name",
            "STORE_COMMON_TABLE_COL_STORE_NAME",
            localisationLabels
          );
    case "Active":
      return getLocaleLabels(
        "Active",
        "STORE_COMMON_TABLE_COL_ACTIVE",
        localisationLabels
      );
    case "Search Results for Opening Balence":
      return getLocaleLabels(
        "Search Results for Opening Balence",
        "STORE_MATERIAL_OPENING_BALANCE_SEARCH_RESULTS_TABLE_HEADING",
        localisationLabels
      );
  }
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      getTextToLocalMapping("MRN Number"),
      //getTextToLocalMapping("Material Type Name"),
      getTextToLocalMapping("Store Name"),     
      getTextToLocalMapping("Financial Year"),
      {
        name: "id",
        options: {
          display: false
        }
      },
    ],
    title: getTextToLocalMapping("Search Results for Opening Balence"),
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
  let tenantId = getTenantId();
  window.location.href = `createopeningbalence?id=${rowData[3]}&tenantId=${tenantId}`;
};

