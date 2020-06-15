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
      {label: getTextToLocalMapping("Application No"),
        options: {
          customBodyRender: value => (
            <span style={{color: "#2196F3"}}>
              {value}
            </span>
          )
        }
      },
      {label: getTextToLocalMapping("License No")},
      {label: getTextToLocalMapping("License Type")},
      {label: getTextToLocalMapping("Service Type")},
      {label: getTextToLocalMapping("Owner Name")},
      {label: getTextToLocalMapping("Application Date")},
      {label: getTextToLocalMapping("Financial Year")},
      {
        label: getTextToLocalMapping("Application Type"),
        options: {
          filter: false,
          customBodyRender: value => (
            <span>
              {getTextToLocalMapping(value)}
            </span>
          )
        }
      },
      {
        label: getTextToLocalMapping("Status"),
        options: {
          filter: false,
          customBodyRender: value => (
            <span
              style={
                value === "APPROVED" ? { color: "green" } : { color: "red" }
              }
            >
              {getTextToLocalMapping(value)}
            </span>
          )
        }
      }
    ],
    onRowClick: (row) => onRowClick(row),
    onPageChanged: (state, dispatch, offset = 0, limit = 10, hideTable) => searchApiCall(state, dispatch, true, offset, limit, hideTable)
  }
}

const _onRowClick = rowData => {
  window.location.href = `search-preview?applicationNumber=${
    rowData["Application No"]
  }&tenantId=${rowData.tenantId}`;
};


export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
      getTextToLocalMapping("Application No"),
      getTextToLocalMapping("License No"),
      getTextToLocalMapping("License Type"), 
      getTextToLocalMapping("Service Type"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Application Date"),
      getTextToLocalMapping("Financial Year"),
      {
        name: getTextToLocalMapping("Application Type"),
        options: {
          filter: false,
          customBodyRender: value => (
            <span>
              {getTextToLocalMapping(value)}
            </span>
          )
        }
      },
      {
        name: getTextToLocalMapping("Status"),
        options: {
          filter: false,
          customBodyRender: value => (
            <span
              style={
                value === "APPROVED" ? { color: "green" } : { color: "red" }
              }
            >
              {getTextToLocalMapping(value)}
            </span>
          )
        }
      },
      {
        name: "tenantId",
        options: {
          display: false
        }
      },
      {
        name:"status1",
        options: {
          display: false
        }
      },

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
  switch (rowData[7]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[8]
      }`;
      break;
    default:
      window.location.href = `search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[8]}`;
      break;
  }
};
