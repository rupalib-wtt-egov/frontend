import {
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { gotoApplyWithStep } from "../../utils/index";
  import { documentDetails } from "../applyResource/documentDetails";
  import { changeStep } from "../applyResource/footer";
  
  const getHeader = label => {
    return {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-bpa",
      componentPath: "DividerWithLabel",
      props: {
        className: "hr-generic-divider-label",
        labelProps: {},
        dividerProps: {},
        label
      },
      type: "array"
    };
  };
  
  export const permitConditionsSummary = getCommonGrayCard({
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 8
          },
          ...getCommonSubHeader({
            labelName: "Permit Conditions",
            // labelKey: "BPA_DOCUMENT_AND_NOC_DETAILS_HEADER"
          })
        }
      }
    },
    permitListDetailsContainer: getHeader({
      labelName: "Permit Conditions List",
    //   labelKey: "BPA_CHECK_LIST_DETAILS"
    }),
    // break: getBreak(),
    permitListConditionsCard: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        className: "applicant-summary",
        scheama: getCommonGrayCard({
          body: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-bpa",
            componentPath: "FieldInspectionContainer",
            props: {
              sourceJsonPath: "permitConditionsListDetailsPreview",
              className: "noc-review-documents"
            }
          },
        }),
        items: [],
        hasAddItem: false,
        isReviewPage: true,
        prefixSourceJsonPath:
          "children.cardContent.children.totalBuildUpAreaDetailsContainer.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    },    
  });
  