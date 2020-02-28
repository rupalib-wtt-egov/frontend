import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  getBreak,
  getTextField,
  getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { gotoApplyWithStep, setAdditionalConditions } from "../../utils/index";
import { getTransformedLocale, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";


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

const prepareConditionsInEmployee = (action, state, dispatch) => {
   let datalist = get(
    action.screenConfiguration.preparedFinalObject,
     "BPA.conditions",
     []
   );
   let bpaDetails = get(
    action.screenConfiguration.preparedFinalObject,
     "BPA",
     []
   );
   let fCndtns = datalist.filter((i)=> i!= undefined && i!="");
   const uniqueCndtns = Array.from(new Set(fCndtns));   
   if(bpaDetails.additionalDetails){
     if(bpaDetails.additionalDetails.pendingapproval){
       const prvCndtns = bpaDetails.additionalDetails.pendingapproval;
       Array.prototype.push.apply(prvCndtns, uniqueCndtns);
       const fnlCndtns = Array.from(new Set(prvCndtns));
       set(
        action,
        "screenConfiguration.preparedFinalObject.BPA.additionalDetails.pendingapproval",
        fnlCndtns
      );
     }
   } else {
    set(
      action,
      "screenConfiguration.preparedFinalObject.BPA.additionalDetails.pendingapproval",
      uniqueCndtns
    );
   }
   
 }

const additionalConditions = () => {
  return getCommonGrayCard({
    conditionCard: getCommonContainer({
      iconObj: {
            iconName: "add",
            position: "end",
            color: "#FE7A51",
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 1
            },
          },
      permitCondition: {
        ...getTextField({
          placeholder: {
            labelName: "Enter Condition"            
          },
          jsonPath: "BPA.conditions[0]",          
          required: false,
          iconObj: {
            iconName: "done",
            position: "end",
            color: "#FE7A51",
            onClickDefination: {
              callBack: (action, state, dispatch) => {
                prepareConditionsInEmployee(action, state, dispatch)
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 10
          },
        })
      }
    })
  });
};


export const permitConditions = getCommonCard({
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
          labelName: "Permit Condition",
          // labelKey: "BPA_FIELD_INSPECTION_DETAILS_TITLE"
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
        }
      }
    }
  },
  bpaPermitListContainer: getHeader({
    labelName: "Permit Conditions",
    //   labelKey: "BPA_CHECK_LIST_DETAILS"
  }),
  break: getBreak(),
  questions: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "PermitListContainer",
    props: {
      documents: [],
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
  additionalConditionsContainer: getCommonContainer({
    multipleApplicantContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          display: "block",
          width: "100%"
        }
      },
      children: {
        additionalInfo: {
          uiFramework: "custom-containers",
          componentPath: "MultiItem",
          props: {
            scheama: additionalConditions(),
            items: [],
            addItemLabel: {
              labelName: "Add More",
              // labelKey: "BPA_ADD_OWNER"
            },
            sourceJsonPath: "BPA.conditions",
            prefixSourceJsonPath:
              "children.cardContent.children.conditionCard.children"
          },
          type: "array"
        }
      }
    }
  })
});
