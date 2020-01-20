import {
    getCommonGrayCard,
    getCommonSubHeader
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { searchProperty, searchApplication, searchPropertyDetails, searchApplicationDetails } from "./mutation-methods";
  
  const captureMutationDetails = getCommonGrayCard({
    // header: getCommonSubHeader(
    //   { labelName: "Capture Payment", labelKey: "NOC_PAYMENT_CAP_PMT" },
    //   {
    //     style: {
    //       marginBottom: "8px"
    //     }
    //   }
    // ),
    tabSection: {
      uiFramework: "custom-containers",
      moduleName: "egov-pt",
      componentPath: "CustomTabContainer",
      props: {
        // horizontal: {
        //   tabsGrid: { xs: 4, sm: 2, md: 2 },
        //   contentGrid: { xs: 8, sm: 10, md: 10 }
        // },
        tabs: [
          {
            tabButton: {labelName:"Search Property", labelKey:"PT_SEARCH_PROPERTY"},
            tabIcon: "Dashboard",
            tabContent: { searchProperty }
          },
          {
            tabButton: {labelName: "Search application", labelKey:"PT_SEARCH_APPLICATION"},
            tabIcon: "Schedule",
            tabContent: { searchApplication }
          }
        ]
      },
      type: "array"
    }
  });
  
  export default captureMutationDetails;
  