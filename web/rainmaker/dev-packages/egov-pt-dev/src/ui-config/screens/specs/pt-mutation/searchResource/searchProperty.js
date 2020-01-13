import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getCommonParagraph,
    getPattern,
    getDateField,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { searchApiCall } from "./functions";
  
  export const searchProperty = getCommonCard({
    subHeader: getCommonTitle({
      labelName: "Search Property",
      labelKey: "SEARCH_PROPERTY"
    }),
    subParagraph: getCommonParagraph({
      labelName: "Provide at least one non-mandatory parameter to search for an application",
      labelKey: "PT_HOME_SEARCH_RESULTS_DESC"
    }),
    appTradeAndMobNumContainer: getCommonContainer({
      ownerMobNo: getTextField({
        label: {
          labelName: "Owner Mobile No.",
          labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
        },
        placeholder: {
          labelName: "Enter your mobile No.",
          labelKey: "PT_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        iconObj: {
          label: "+91 |",
          position: "start"
        },
        required: false,
        pattern: getPattern("MobileNo"),
        jsonPath: "searchScreen.mobileNumber",
        errorMessage: "ERR_INVALID_MOBILE_NUMBER"
      }),
      propertyTaxUniqueId: getTextField({
        label: {
          labelName: "Property Tax Unique Id",
          labelKey: "PT_PROPERTY_UNIQUE_ID"
        },
        placeholder: {
          labelName: "Enter Property Tax Unique Id",
          labelKey: "PT_PROPERTY_UNIQUE_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: false,
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "ERR_INVALID_APPLICATION_NO",
        jsonPath: "searchScreen.applicationNumber"
      }),
      existingPropertyId: getTextField({
        label: {
          labelName: "Existing Property ID",
          labelKey: "PT_EXISTING_PROPERTY_ID"
        },
        placeholder: {
          labelName: "Enter Existing Property ID",
          labelKey: "PT_EXISTING_PROPERTY_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: false,
        pattern: /^[a-zA-Z0-9-]*$/i,
        errorMessage: "ERR_INVALID_APPLICATION_NO",
        jsonPath: "searchScreen.applicationNumber"
      })
    }),
    button: getCommonContainer({
      // firstCont: {
  
      buttonContainer: getCommonContainer({
        firstCont: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        },
        searchButton: {
          componentPath: "Button",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          props: {
            variant: "contained",
            style: {
              color: "white",
  
              backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
              borderRadius: "2px",
              width: "80%",
              height: "48px"
            }
          },
          children: {
            buttonLabel: getLabel({
              labelName: "Search",
              labelKey: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: searchApiCall
          }
        },
        lastCont: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }
      })
    })
  });
  