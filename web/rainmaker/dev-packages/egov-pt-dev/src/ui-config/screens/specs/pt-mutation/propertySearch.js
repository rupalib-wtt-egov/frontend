import {
    getCommonHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import captureMutationDetails from "./capture-mutation-details";
  import { searchProperty } from "./searchResource/searchProperty";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { pendingMutationApprovals } from "./searchResource/pendingMutationApprovals";
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  // import { progressStatus } from "./searchResource/progressStatus";
  import { searchMutationResults } from "./searchResource/searchMutationResults";
  import {searchApplications} from "./searchResource/searchApplications";
  import {searchMutationApplicationResults} from "./searchResource/searchMutationApplications"
  import { localStorageGet,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import {Tabs} from "egov-ui-kit/components/Tabs";
  import find from "lodash/find";
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  const tenant= getTenantId();
  const pageResetAndChange = (state, dispatch) => {
    dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    dispatch(prepareFinalObject("LicensesTemp", []));
    dispatch(setRoute(`/tradelicence/apply?tenantId=${tenant}`));
  };

  console.log(captureMutationDetails)
  
  const header = getCommonHeader({
    labelName: "Property Tax",
    labelKey: "PROPERTY_TAX"
  });
  const screenConfig = {
    uiFramework: "material-ui",
    name: "propertySearch",
    
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "search"
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
  
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 6
                },
                ...header
              },
              newApplicationButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 6,
                  align: "right"
                },
                visible: enableButton,
                props: {
                  variant: "contained",
                  color: "primary",
                  style: {
                    color: "white",
                    borderRadius: "2px",
                    width: "250px",
                    height: "48px"
                  }
                },
  
                children: {
                  plusIconInsideButton: {
                    uiFramework: "custom-atoms",
                    componentPath: "Icon",
                    props: {
                      iconName: "add",
                      style: {
                        fontSize: "24px"
                      }
                    }
                  },
  
                  buttonLabel: getLabel({
                    labelName: "Add New Property",
                    labelKey: "PT_ADD_NEW_PROPERTY_BUTTON"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: (state, dispatch) => {
                    pageResetAndChange(state, dispatch);
                  }
                },
                // roleDefination: {
                //   rolePath: "user-info.roles",
                //   path : "tradelicence/apply"
  
                // }
              }
            }
          },
         captureMutationDetails,
          // searchProperty,
          // breakAfterSearch: getBreak(),
          // searchMutationResults,     
          // searchApplications,
          // breakAfterSearch: getBreak(),
          // searchMutationApplicationResults,

        }
      }
    }
  };
  
  export default screenConfig;
  