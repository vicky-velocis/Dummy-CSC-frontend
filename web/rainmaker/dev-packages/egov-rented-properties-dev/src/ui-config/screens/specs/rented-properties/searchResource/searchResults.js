import React from "react";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import { searchApiCall } from "./functions";

export const _searchResults = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-tradelicence",
  componentPath: "TableContainer",
  visible: true,
  props: {
    columnData: [
      {label: getTextToLocalMapping("Transit No")},
      {label: getTextToLocalMapping("Colony")},
      {label: getTextToLocalMapping("Owner")},
      {label: getTextToLocalMapping("Status")},
    ],
    onRowClick: (row) => onRowClick(row),
    onPageChanged: (state, dispatch, offset = 0, limit = 10, hideTable) => searchApiCall(state, dispatch, true, offset, limit, hideTable)
  }
}



export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
      getTextToLocalMapping("Transit No"),
      getTextToLocalMapping("Colony"),
      getTextToLocalMapping("Owner"),
      getTextToLocalMapping("Status"),
    ],
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

const onRowClick = rowData => {
      window.location.href = `search-preview?transitNumber=${rowData[0]}`;
};
