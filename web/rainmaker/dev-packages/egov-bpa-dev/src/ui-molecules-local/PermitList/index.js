import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import {
  LabelContainer
} from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import Checkbox from "@material-ui/core/Checkbox";
import get from "lodash/get";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadSingleFile } from "../../ui-molecules-local";

const themeStyles = theme => ({
  documentContainer: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentSubCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: "1px"
  },
  documentIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px"
  },
  documentSuccess: {
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39CB74",
    color: "white"
  },
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  },
  iconDiv: {
    display: "flex",
    alignItems: "center"
  },
  descriptionDiv: {
    display: "flex",
    alignItems: "center"
  },
  formControl: {
    minWidth: 250,
    padding: "0px"
  },
  fileUploadDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "5px"
  }
});

const styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
};

const requiredIcon = (
  <sup style={{ color: "#E54D42", paddingLeft: "5px" }}>*</sup>
);

class PermitList extends Component {
  state = {
    uploadedDocIndex: 0   
  };

  componentDidMount = () => {
    const {
      documentsList,
      PermitListUploaRedux = {},
      prepareFinalObject
    } = this.props;
    let index = 0;
    documentsList.forEach(docType => {
      docType.cards &&
        docType.cards.forEach(card => {
          if (card.subCards) {
            card.subCards.forEach(subCard => {
              let oldDocType = get(
                PermitListUploaRedux,
                `[${index}].documentType`
              );
              let oldDocCode = get(
                PermitListUploaRedux,
                `[${index}].documentCode`
              );
              let oldDocSubCode = get(
                PermitListUploaRedux,
                `[${index}].documentSubCode`
              );
              if (
                oldDocType != docType.code ||
                oldDocCode != card.name ||
                oldDocSubCode != subCard.name
              ) {
                PermitListUploaRedux[index] = {
                  question: docType.code,
                  documentCode: card.name,
                  // documentSubCode: subCard.name
                };
              }
              index++;
            });
          } else {
            let oldDocType = get(
              PermitListUploaRedux,
              `[${index}].documentType`
            );
            let oldDocCode = get(
              PermitListUploaRedux,
              `[${index}].documentCode`
            );
            if (oldDocType != docType.code || oldDocCode != card.name) {
              PermitListUploaRedux[index] = {
                question: docType.code,
                documentCode: card.name,
                isDocumentRequired: card.required
                
              };
            }
            index++;
          }
        });
    });
    prepareFinalObject("PermitListUploaRedux", PermitListUploaRedux);
  };

  prepareDocumentsInEmployee = async (PermitListDocuments, bpaDetails) => {
    let documnts = [];
    if (PermitListDocuments) {
      Object.keys(PermitListDocuments).forEach(function (key) {
        if (PermitListDocuments && PermitListDocuments[key]) {
          documnts.push(PermitListDocuments[key]);
        }
      });
    }
    prepareFinalObject("PermitListUploaRedux", {});
    let requiredDocuments = [];
    if (documnts && documnts.length > 0) {
      documnts.forEach(documents => {
        if (documents && documents.question) {
          let prmts, finalDocs = [];
          prmts = documents.question;

          if(bpaDetails.additionalDetails) {
              if(bpaDetails.additionalDetails.pendingapproval) {
                bpaDetails.additionalDetails.pendingapproval.push(prmts);
              } else {
                bpaDetails.additionalDetails.push({"pendingapproval" : []});
              }
          } else {
            bpaDetails.additionalDetails = [];
            let fiDocs = [], details;
            fiDocs.push(prmts);
            details = { "pendingapproval" : fiDocs};
            finalDocs.push(details);
            finalDocs = finalDocs[0];
            bpaDetails.additionalDetails = finalDocs
          }
        }
      });
      if(bpaDetails.additionalDetails && bpaDetails.additionalDetails["pendingapproval"]) {
        prepareFinalObject("BPA",  bpaDetails.additionalDetails.pendingapproval);
      }
    }
  }

  distinct = (value, index, self) => {
    return self.indexOf(value) === index
 };

  handleFieldChange = (key, event) => {
    const { PermitListUploaRedux, prepareFinalObject, bpaDetails } = this.props;
    if(event.target.checked){
      let PermitListDocuments = {
        [key]: {
          question: event.target.value
        }
      };
      prepareFinalObject(`PermitListUploaRedux`, PermitListDocuments);
  
      let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true
  
      if(isEmployee) {
        this.prepareDocumentsInEmployee(PermitListDocuments, bpaDetails);
      }
    } else {     
      let array = bpaDetails.additionalDetails.pendingapproval;
      let remvCndtns = event.target.value;      
      var newArray = array.filter((i)=>i != remvCndtns);
      // let fnlCnds = {"pendingapproval" : newArray}
      bpaDetails.additionalDetails.pendingapproval = newArray;
      prepareFinalObject("BPA.additionalDetails.pendingapproval",  newArray);
    }

       
  };

  getUploadCard = (card, key) => {
    const { classes, PermitListUploaRedux } = this.props;
    let jsonPath = `PermitListUploaRedux[${key}].dropDownValues.value`;
    return (
      <Grid container={true}>
        <Grid item={true} xs={2} sm={1} className={classes.iconDiv}>
          {PermitListUploaRedux[key] && PermitListUploaRedux[key].documents ? (
            <div className={classes.documentSuccess}>
              <Icon>
                <i class="material-icons">done</i>
              </Icon>
            </div>
          ) : (
              <div className={classes.documentIcon}>
                <span>{key + 1}</span>
              </div>
            )}
        </Grid>
        <Grid
          item={true}
          xs={10}
          sm={8}
          md={8}
          align="left"
          className={classes.descriptionDiv}
        >
          <LabelContainer
            labelKey={card.name}
            style={styles.documentName}
          />
          {card.required && requiredIcon}
        </Grid>
        
        <Grid
          item={true}
          xs={2}
          sm={2}
          md={2}
          className={classes.fileUploadDiv}
        >
            <Checkbox              
              onChange={event => this.handleFieldChange(key, event)}
              value={card.name}        
            />
          
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, documentsList } = this.props;
    let index = 0;
    return (
      <div>
        {documentsList &&
          documentsList.map(container => {
            return (
              <div>
                {container.cards.map(card => {
                  return (
                    <div className={classes.documentContainer}>
                      {card.hasSubCards && (
                        <LabelContainer
                          labelKey={card.name}
                          style={styles.documentTitle}
                        />
                      )}
                      {card.hasSubCards &&
                        card.subCards.map(subCard => {
                          return (
                            <div className={classes.documentSubCard}>
                              {this.getUploadCard(subCard, index++)}
                            </div>
                          );
                        })}
                      {!card.hasSubCards && (
                        <div>{this.getUploadCard(card, index++)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

PermitList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { moduleName } = screenConfiguration;
  const PermitListUploaRedux = get(
    screenConfiguration.preparedFinalObject,
    "PermitListUploaRedux",
    {}
  );
  const bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "BPA",
    {}
  )
  return { PermitListUploaRedux, moduleName, bpaDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(themeStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PermitList)
);
