import React from "react"
import "./index.css"
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMappingPaymentDetail,
  getTextToLocalMappingViewSeizure,
  getTextToLocalMappingInventoryDetail
} from "../../utils";


/*...reportPaymentDetailsreport ...*/
export const serachReportPaymentDetailGrid = {
  uiFramework: "custom-molecules-local",
  moduleName: "egov-echallan",
  componentPath: "CustomizeTable",
  visible: true,
  props: {
    data: [],
    columns: [
      {
        name: getTextToLocalMappingPaymentDetail("challanId"),
        label: getTextToLocalMappingPaymentDetail("challanId"),
        options: {
          filter: true,
        }
      }, {
        name: getTextToLocalMappingPaymentDetail("violatorName"),
        label: getTextToLocalMappingPaymentDetail("violatorName"),
        options: {
          filter: true,
        }
      },{
        name: getTextToLocalMappingPaymentDetail("paymentAmount"),
        label: getTextToLocalMappingPaymentDetail("paymentAmount"),
        options: {
          filter: true,
        }
      },{
        name: getTextToLocalMappingPaymentDetail("violationDate"),
        label: getTextToLocalMappingPaymentDetail("violationDate"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingPaymentDetail("siName"),
        label: getTextToLocalMappingPaymentDetail("siName"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingPaymentDetail("paymentMode"),
        label: getTextToLocalMappingPaymentDetail("paymentMode"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingPaymentDetail("paymentStatus"),
        label: getTextToLocalMappingPaymentDetail("paymentStatus"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingPaymentDetail("sector"),
        label: getTextToLocalMappingPaymentDetail("sector"),
        options: {
          filter: true,
        }
      },
    ],
    title: getTextToLocalMappingPaymentDetail(
      "Search Results for Item - Master"
    ),

    options: {
      filter: false,
      print: true,
      download: true,
      responsive: "scroll",
      selectableRows: false,
      disableToolbarSelect: true,
      resizableColumns: false,
      hover: true,
      filterType: 'dropdown',
      fixedHeaderOptions: {
        xAxis: false,
        yAxis: true
      },
      downloadOptions: {
        filename: "PaymentReport.csv",
        separator: ",",
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: false,
        },
      },
      rowsPerPageOptions: [10, 15, 20],
    },
    customSortColumn: {
      column: "Item Name",
      sortingFn: (data, i, itemName) => {
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

/* ..searchViewSizureReport  ...*/
export const searchViewSeizureReport = {
  uiFramework: "custom-molecules-local",
  moduleName: "egov-echallan",
  componentPath: "CustomizeTable",
  visible: true,
  props: {
    data: [],
    columns: [
      {
        name: getTextToLocalMappingViewSeizure("challanId"),
        label: getTextToLocalMappingViewSeizure("challanId"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("violatorName"),
        label: getTextToLocalMappingViewSeizure("violatorName"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("challanDate"),
        label: getTextToLocalMappingViewSeizure("challanDate"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("enchroachmentType"),
        label: getTextToLocalMappingViewSeizure("enchroachmentType"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("siName"),
        label: getTextToLocalMappingViewSeizure("siName"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("sector"),
        label: getTextToLocalMappingViewSeizure("sector"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("paymentAmount"),
        label: getTextToLocalMappingViewSeizure("paymentAmount"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingViewSeizure("challanStatus"),
        label: getTextToLocalMappingViewSeizure("challanStatus"),
        options: {
          filter: true,
        }
      }
    ],
    title: getTextToLocalMappingViewSeizure(
      "Search Results for Item - Master"
    ),

    options: {
      filter: false,
      download: true,
      print: true,
      // responsive: "scrollMaxHeight",
      responsive: "scroll",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      downloadOptions: {
        filename: "SeizureReport.csv",
        separator: ",",
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: false,
        },
      },
      onRowClick: (row, index) => {
        //onRowClick(row);
      }

    },
    customSortColumn: {
      column: "Item Name",
      sortingFn: (data, i, itemName) => {
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

/*..serachReportInventoryDetailGrid..*/
export const serachReportInventoryDetailGrid = {
  uiFramework: "custom-molecules-local",
  moduleName: "egov-echallan",
  componentPath: "CustomizeTable",
  visible: true,
  props: {
    data: [],
    columns: [
      {
        name: getTextToLocalMappingInventoryDetail("challanId"),
        label: getTextToLocalMappingInventoryDetail("challanId"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingInventoryDetail("itemName"),
        label: getTextToLocalMappingInventoryDetail("itemName"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingInventoryDetail("itemQuantity"),
        label: getTextToLocalMappingInventoryDetail("itemQuantity"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingInventoryDetail("itemStoreDepositDate"),
        label: getTextToLocalMappingInventoryDetail("itemStoreDepositDate"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingInventoryDetail("challanstatus"),
        label: getTextToLocalMappingInventoryDetail("challanstatus"),
        options: {
          filter: true,
        }
      },
      {
        name: getTextToLocalMappingInventoryDetail("age"),
        label: getTextToLocalMappingInventoryDetail("age"),
        options: {
          filter: true,
        }
      },
    ],
    title: getTextToLocalMappingInventoryDetail(
      "Search Results for Inventory_Detail"
    ),

    options: {
      filter: false,
      download: true,
      print: true,
      // responsive: "scrollMaxHeight",
      responsive: "scroll",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      downloadOptions: {
        filename: "ItemAgingReport.csv",
        separator: ",",
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: false,
        },
      },
    },
    customSortColumn: {
      column: "Inventory Detail",
      sortingFn: (data, i, itemName) => {
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
