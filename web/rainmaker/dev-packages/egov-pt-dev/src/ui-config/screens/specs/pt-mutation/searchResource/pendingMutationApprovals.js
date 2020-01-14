import { getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import React from "react";

export const pendingMutationApprovals = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  visible: false,
  children: {
    breakPending: getBreak(),
    pendingApprovals: {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-tradelicence",
      componentPath: "Table",
      props: {
        data: [
          {
            "Property Tax Unique Id": 1234,
            "Owner Name": "Satinder Singh",
            "Guardian Name": "Gurudwara Mohalla",
            "Existing Property Id": 45678,
            "Address":"Amritsar, Sher Galli"
           // "Days Elapsed": "2 Days"
          },
          {
            "Property Tax Unique Id": 1234,
            "Owner Name": "Satinder Singh",
            "Guardian Name": "Gurudwara Mohalla",
            "Existing Property Id": 45678,
            "Address":"Amritsar, Sher Galli"
           // "Days Elapsed": "2 Days"
          },
          {
            "Property Tax Unique Id": 1234,
            "Owner Name": "Satinder Singh",
            "Guardian Name": "Gurudwara Mohalla",
            "Existing Property Id": 45678,
            "Address":"Amritsar, Sher Galli"
          //  "Days Elapsed": "2 Days"
          },
          {
            "Property Tax Unique Id": 1234,
            "Owner Name": "Satinder Singh",
            "Guardian Name": "Gurudwara Mohalla",
            "Existing Property Id": 45678,
            "Address":"Amritsar, Sher Galli"
         //   "Days Elapsed": "2 Days"
          }
        ],
        columns: {
          "Property Tax Unique Id": {},
          "Owner Name": {},
          "Guardian Name": {},
          "Existing Property Id": {},
          "Address": {},
          // "Days Elapsed": {
          //   format: value => {
          //     let color = "";
          //     if (value.toLowerCase().indexOf("10") !== -1) {
          //       color = "green";
          //     } else if (value.toLowerCase().indexOf("2") !== -1) {
          //       color = "red";
          //     }
          //     return (
          //       <span
          //         style={{
          //           color: color,
          //           fontSize: "14px",
          //           fontWeight: 400
          //         }}
          //       >
          //         {value}
          //       </span>
          //     );
          //   }
          // }
        },
        title: "Pending for your Approval (4)",
        options: {
          filterType: "dropdown",
          responsive: "stacked",
          selectableRows: false
        }
      }
    }
  }
};
