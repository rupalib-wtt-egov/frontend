import {
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getLabelWithValue,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { gotoApplyWithStep } from "../../utils/index";
  import { getTransformedLocale, getQueryArg } from "egov-ui-framework/ui-utils/commons";
  
  
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
  
  export const fieldinspectionSummary = getCommonGrayCard({
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
            labelName: "Field Inspection",
            // labelKey: "BPA_BASIC_DETAILS_TITLE"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary",
            style: {
              marginTop: "-10px",
              marginRight: "-18px"
            }
          },
          gridDefination: {
            xs: 4,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "BPA_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              gotoApplyWithStep(state, dispatch, 0);
            }
          }
        }
      }
    },
    bpaBasicDetailsContainer: getHeader({
      labelName: "Check List",
    //   labelKey: "BPA_BASIC_DETAILS_TITLE"
    }),
    break1: getBreak(),
    questions: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "CheckListContainer",
        props: {
          documents: [
            {
              name: "Identity ",
              required: true,
              jsonPath: "bpa.documents.identityProof",
              selector: {
                inputLabel: "Select Document",
                menuItems: [
                  { value: "AADHAAR", label: "Aadhaar Card" },
                  { value: "VOTERID", label: "Voter ID Card" },
                  { value: "DRIVING", label: "Driving License" }
                ]
              }
            },
            {
              name: "Address Proof ",
              required: true,
              jsonPath: "bpa.documents.addressProof",
              selector: {
                inputLabel: "Select Document",
                menuItems: [
                  { value: "ELECTRICITYBILL", label: "Electricity Bill" },
                  { value: "DL", label: "Driving License" },
                  { value: "VOTERID", label: "Voter ID Card" }
                ]
              }
            }
          ],
          buttonLabel: {
            labelName: "UPLOAD FILE",
            labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
          },
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg"
          },
          maxFileSize: 6000
        },
        type: "array"
      },
    BlockWiseOccupancyAndUsageDetails: getHeader({
      labelName: "Documents",
    //   labelKey: "BPA_NEW_TRADE_DETAILS_HEADER_DETAILS"
    }),
    break1: getBreak(),
    documentList: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "FieldDocumentListContainer",
        props: {
          documents: [
            {
              name: "Identity ",
              required: true,
              jsonPath: "bpa.documents.identityProof",
              selector: {
                inputLabel: "Select Document",
                menuItems: [
                  { value: "AADHAAR", label: "Aadhaar Card" },
                  { value: "VOTERID", label: "Voter ID Card" },
                  { value: "DRIVING", label: "Driving License" }
                ]
              }
            },
            {
              name: "Address Proof ",
              required: true,
              jsonPath: "bpa.documents.addressProof",
              selector: {
                inputLabel: "Select Document",
                menuItems: [
                  { value: "ELECTRICITYBILL", label: "Electricity Bill" },
                  { value: "DL", label: "Driving License" },
                  { value: "VOTERID", label: "Voter ID Card" }
                ]
              }
            }
          ],
          buttonLabel: {
            labelName: "UPLOAD FILE",
            labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
          },
          // description: "Only .jpg and .pdf files. 6MB max file size.",
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg"
          },
          maxFileSize: 6000
        },
        type: "array"
      },
  });
  