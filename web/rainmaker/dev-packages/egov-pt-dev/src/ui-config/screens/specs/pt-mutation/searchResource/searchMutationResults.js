import React from "react";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";


export const searchMutationResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
      getTextToLocalMapping("Property Tax Unique Id"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Guardian Name"),
      getTextToLocalMapping("Existing Property Id"),
      getTextToLocalMapping("Address"),
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
    title: getTextToLocalMapping(
      "Search Results for Trade License Applications"
    ),
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
    },
    data:[{
      "Property Tax Unique Id": "PT-16191-0789580",
      "Owner Name": "Satinder Singh",
      "Guardian Name": "Gurudwara Mohalla",
      "Existing Property Id": 45678,
      "Address":"Amritsar, Sher Galli",
      "Status":"PENDINGPAYMENT"
     // "Days Elapsed": "2 Days"
    },
    {
      "Property Tax Unique Id": "PT-5033-203580",
      "Owner Name": "Satinder Singh",
      "Guardian Name": "Gurudwara Mohalla",
      "Existing Property Id": 45678,
      "Address":"Amritsar, Sher Galli",
      "Status":"APPROVED"
     // "Days Elapsed": "2 Days"
    },
    {
      "Property Tax Unique Id": "PT-1013-001580",
      "Owner Name": "Satinder Singh",
      "Guardian Name": "Gurudwara Mohalla",
      "Existing Property Id": 45678,
      "Address":"Amritsar, Sher Galli",
      "Status":"DOCUMENTVERIFY"
    //  "Days Elapsed": "2 Days"
    },
    {
      "Property Tax Unique Id": "PT-1213-006280",
      "Owner Name": "Satinder Singh",
      "Guardian Name": "Gurudwara Mohalla",
      "Existing Property Id": 45678,
      "Address":"Amritsar, Sher Galli",
      "Status":"APPROVED"
   //   "Days Elapsed": "2 Days"
    }
  ],
  }
};

const onRowClick = rowData => {
  //console.log("rowData--",rowData);
  switch (rowData[7]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[6]
      }`;
      // }&action=edit`;
      break;
    default:
      window.location.href = `search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[6]}`;
      break;
  }
};
