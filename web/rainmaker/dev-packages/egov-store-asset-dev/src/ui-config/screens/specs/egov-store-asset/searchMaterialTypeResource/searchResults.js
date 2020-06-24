import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
} from "egov-ui-framework/ui-utils/commons";

export const getTextToLocalMapping = (label) => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Material Type Name":
      return getLocaleLabels(
        "Material Type Name",
        "STORE_COMMON_TABLE_COL_MATERIAL_TYPE_NAME",
        localisationLabels
      );
    case "Material Type Description":
      return getLocaleLabels(
        "Material Type Description",
        "STORE_COMMON_TABLE_COL_MATERIAL_DESC",
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
    case "Search Results for Material Type":
      return getLocaleLabels(
        "Search Results for Material Type",
        "STORE_MATERIAL_SEARCH_RESULTS_TABLE_HEADING",
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
      getTextToLocalMapping("Material Type Name"),
      getTextToLocalMapping("Material Type Description"),
      getTextToLocalMapping("Parent Material Type Name"),
      getTextToLocalMapping("Store Name"),
      getTextToLocalMapping("Active"),
    ],
    title: getTextToLocalMapping("Search Results for Material Type"),
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
