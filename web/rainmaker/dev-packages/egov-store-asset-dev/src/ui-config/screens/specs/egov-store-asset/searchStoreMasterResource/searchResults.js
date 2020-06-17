import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
} from "egov-ui-framework/ui-utils/commons";

export const getTextToLocalMapping = (label) => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Store Name":
      return getLocaleLabels(
        "Store Name",
        "STORE_COMMON_TABLE_COL_STORE_NAME",
        localisationLabels
      );
    case "Department":
      return getLocaleLabels(
        "Department",
        "STORE_COMMON_TABLE_COL_DEPARTMENT",
        localisationLabels
      );
    case "Active":
      return getLocaleLabels(
        "Active",
        "STORE_COMMON_TABLE_COL_ACTIVE",
        localisationLabels
      );
    case "Central Store":
      return getLocaleLabels(
        "Central Store",
        "HR_COMMON_TABLE_COL_CENTRAL_STORE",
        localisationLabels
      );
    case "Search Results for Store Master":
      return getLocaleLabels(
        "Search Results for Store Master",
        "STORE_MASTER_SEARCH_RESULTS_TABLE_HEADING",
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
      getTextToLocalMapping("Store Name"),
      getTextToLocalMapping("Department"),
      getTextToLocalMapping("Central Store"),
      getTextToLocalMapping("Active"),
    ],
    title: getTextToLocalMapping("Search Results for Store Master"),
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
  window.location.href = `view?employeeID=${rowData[0]}&tenantId=${rowData[5]}`;
};

// const onRowClick = rowData => {
//   let viewEmployeeUrl =
//     process.env.REACT_APP_SELF_RUNNING === "true"
//       ? "/egov-ui-framework/hrms/view"
//       : "/hrms/view";
//   return `${viewEmployeeUrl}?employeeID=${
//     rowData[get(textToLocalMapping, "Employee ID")]
//   }&tenantId=${rowData[get(textToLocalMapping, "Tenant ID")]}`;
// };
