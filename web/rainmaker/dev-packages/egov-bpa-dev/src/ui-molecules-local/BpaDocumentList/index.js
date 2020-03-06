import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { LabelContainer, TextFieldContainer } from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getFileUrlFromAPI, handleFileUpload, getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadMultipleFile } from "../../ui-molecules-local";
import Typography from "@material-ui/core/Typography";
import MultiDownloadCard from "../MultiDownloadCard";
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";

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
    alignItems: "center",
    display: "block",
    marginTop: "20px",
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
<sup style={{
  color: "#E54D42",
  paddingLeft: "5px"
}}>*</sup>
);

class BpaDocumentList extends Component {
  state = {
    uploadedDocIndex: 0,
    createdBy: ''
  };

  componentDidMount = () => {
    const {documentsList, documentDetailsUploadRedux = {}, prepareFinalObject, bpaDetails} = this.props;
    let index = 0;
    documentsList.forEach(docType => {
      docType.cards &&
      docType.cards.forEach(card => {
        if (card.subCards) {
          card.subCards.forEach(subCard => {
            let oldDocType = get(
              documentDetailsUploadRedux,
              `[${index}].documentType`
            );
            let oldDocCode = get(
              documentDetailsUploadRedux,
              `[${index}].documentCode`
            );
            let oldDocSubCode = get(
              documentDetailsUploadRedux,
              `[${index}].documentSubCode`
            );
            if (
              oldDocType != docType.code ||
              oldDocCode != card.name ||
              oldDocSubCode != subCard.name
            ) {
              documentDetailsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          let oldDocType = get(
            documentDetailsUploadRedux,
            `[${index}].documentType`
          );
          let oldDocCode = get(
            documentDetailsUploadRedux,
            `[${index}].documentCode`
          );
          if (oldDocType != docType.code || oldDocCode != card.name) {
            documentDetailsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropDownValues
                ? card.dropDownValues.required
                : false
            };
          }
          index++;
        }
      });
    });
    prepareFinalObject("documentDetailsUploadRedux", documentDetailsUploadRedux);
    if (bpaDetails && bpaDetails.auditDetails && bpaDetails.auditDetails.createdBy) {
      this.getUserDataFromUuid()
    }
  };

  getUserDataFromUuid() {
    const userInfo = JSON.parse(
      localStorageGet("user-info")
    );
    if (userInfo && userInfo.roles && userInfo.roles.length > 1) {
      let roles = [];
      for (let i = 0; i < userInfo.roles.length; i++) {
        roles.push(userInfo.roles[i].name);
      }
      ;
      if (roles.includes("Citizen")) {
        roles.map(role => {
          role && role === "BPA Architect" && (
          this.setState({
            createdBy: role
          })
          )
        })
      } else if (roles.includes("Employee")) {
        roles.map(role => {
          role && role === "BPA Services Approver" || role === "BPA Services verifier" && (
          this.setState({
            createdBy: role
          })
          )
        })
      }
    }
  }

  prepareDocumentsInEmployee = async (appDocumentList, bpaDetails) => {
    let documnts = [];
    if (appDocumentList) {
      Object.keys(appDocumentList).forEach(function(key) {
        if (appDocumentList && appDocumentList[key]) {
          documnts.push(appDocumentList[key]);
        }
      });
    }

    prepareFinalObject("documentDetailsUploadRedux", {});
    let requiredDocuments = [];
    if (documnts && documnts.length > 0) {
      documnts.forEach(documents => {
        if (documents && documents.documents && documents.dropDownValues && documents.dropDownValues.value) {
          let doc = {};
          doc.documentType = documents.dropDownValues.value;
          doc.fileStoreId = documents.documents[0].fileStoreId;
          doc.fileStore = documents.documents[0].fileStoreId;
          doc.fileName = documents.documents[0].fileName;
          doc.fileUrl = documents.documents[0].fileUrl;
          if (doc.id) {
            doc.id = documents.documents[0].id;
          }
          if (bpaDetails.documents) {
            bpaDetails.documents.push(doc);
          } else {
            bpaDetails.documents = [doc];
          }
        }
      });

      if (bpaDetails.documents && bpaDetails.documents.length > 0) {
        var resArr = [];
        bpaDetails.documents.forEach(function(item) {
          var i = resArr.findIndex(x => x.documentType == item.documentType);
          if (i <= -1) {
            resArr.push(item);
          }
        });
        bpaDetails.documents = resArr;
        prepareFinalObject("BPA", bpaDetails.documents);
      }
    }
  }

  onUploadClick = uploadedDocIndex => {
    this.setState({
      uploadedDocIndex
    });
  };

  handleDocument = async (file, fileStoreId) => {
    let {uploadedDocIndex} = this.state;
    const {prepareFinalObject, documentDetailsUploadRedux, bpaDetails} = this.props;
    const fileUrl = await getFileUrlFromAPI(fileStoreId);

    let appDocumentList = {};
    if (documentDetailsUploadRedux[uploadedDocIndex] &&
      documentDetailsUploadRedux[uploadedDocIndex].documents) {

      documentDetailsUploadRedux[uploadedDocIndex].documents.push({
        fileName: file.name,
        fileStoreId,
        fileUrl: Object.values(fileUrl)[0]
      });
      appDocumentList = {
        ...documentDetailsUploadRedux
      };

    } else {
      appDocumentList = {
        ...documentDetailsUploadRedux,
        [uploadedDocIndex]: {
          ...documentDetailsUploadRedux[uploadedDocIndex],
          documents: [
            {
              fileName: file.name,
              fileStoreId,
              fileUrl: Object.values(fileUrl)[0]
            }
          ]
        }
      }
    }

    prepareFinalObject("documentDetailsUploadRedux", appDocumentList);

    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true

    if (isEmployee) {
      this.prepareDocumentsInEmployee(appDocumentList, bpaDetails);
    }
  };

  removeDocument = (remDocIndex, docIndex) => {
    const {documentDetailsUploadRedux, prepareFinalObject, bpaDetails, documentDetailsPreview} = this.props;
    for (let key in documentDetailsUploadRedux) {
      if (key === `${remDocIndex}`) {
        documentDetailsUploadRedux[key].documents.splice(docIndex, 1);
      }
    }
    prepareFinalObject("documentDetailsUploadRedux", documentDetailsUploadRedux);
    this.forceUpdate();
    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true

    if (isEmployee) {
      this.prepareDocumentsInEmployee(documentDetailsUploadRedux, bpaDetails, documentDetailsPreview, prepareFinalObject);
    }
  };

  handleChange = (key, event) => {
    const {documentDetailsUploadRedux, prepareFinalObject, bpaDetails} = this.props;
    let appDocumentList = {
      ...documentDetailsUploadRedux,
      [key]: {
        ...documentDetailsUploadRedux[key],
        dropDownValues: {
          value: event.target.value
        }
      }
    }
    prepareFinalObject(`documentDetailsUploadRedux`, appDocumentList);

    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true

    if (isEmployee) {
      this.prepareDocumentsInEmployee(appDocumentList, bpaDetails);
    }
  };

  getUploadCard = (card, key) => {
    const {classes, documentDetailsUploadRedux, documentDetailsPreview, bpaDetails, verifierDocDetailsUpload, ...rest} = this.props;
    let jsonPath = `documentDetailsUploadRedux[${key}].dropDownValues.value`;
    let documents;
    let data = [];
    let verifierData = [];
    {
      documentDetailsUploadRedux[key] && documentDetailsUploadRedux && documentDetailsUploadRedux[key].previewdocuments && (
      documentDetailsUploadRedux[key].previewdocuments.map((docs, documentIndex) => {
        bpaDetails.documents.map(doc => {
          if (doc && docs && doc.fileStoreId === docs.fileStoreId) {
            docs.wfState = doc.wfState,
            docs.createdBy = this.state.createdBy,
            data.push(docs);
          }
        })
      })
      );
      documentDetailsPreview.map(docItem => {
        bpaDetails.documents.map(doc => {
          if (card.code === "APPL.BUILDING_DIAGRAM") {
            if (docItem.title === "BPD_SECP_SECP" || docItem.title === "BPD_EP_EP" || docItem.title === "BPD_FP_FP") {
              docItem.wfState = doc.wfState,
              docItem.createdBy = this.state.createdBy,
              verifierData.push(docItem);
            }
          } else if (card.code === "NOC.FIRE") {
            if (docItem.title === "NOC_FIRE_CERTIFICATE") {
              docItem.wfState = doc.wfState,
              docItem.createdBy = this.state.createdBy,
              verifierData.push(docItem);
            }
          } else if (card.code === "NOC.AIRPORT") {
            if (docItem.title === "NOC_AIRPORT_CERTIFICATE") {
              docItem.wfState = doc.wfState,
              docItem.createdBy = this.state.createdBy,
              verifierData.push(docItem);
            }
          }
        })
      })
    }
    return (
      <React.Fragment>      
        <Grid>    
          <div>     
          {
      data && data.length > 0 ? (
        <div style = {{
          display: "flex"
        }}>
              <MultiDownloadCard data = {data}  {...rest} />
            </div>
        ) : verifierData && verifierData.length > 0 && (
        <div style = {{
          display: "flex"
        }}>
              <MultiDownloadCard data = {verifierData}  {...rest} />
             </div>)
      }
        </div> 
      </Grid>
      <Grid container={true}>
        <Grid item={true} xs={2} sm={1} className={classes.iconDiv}>
          {documentDetailsUploadRedux[key] && documentDetailsUploadRedux[key].documents ? (
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
      sm={5}
      md={4}
      align="left"
      className={classes.descriptionDiv}
      >
          <LabelContainer
      labelKey={getTransformedLocale(card.name)}
      style={styles.documentName}
      />
          {card.required && requiredIcon}
          <Typography variant="caption">
            <LabelContainer
      labelKey={getTransformedLocale("TL_UPLOAD_RESTRICTIONS")}
      />
          </Typography>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={4}>
          {card.dropDownValues && (
      <TextFieldContainer
      select={true}
      label={{
        labelKey: getTransformedLocale(card.dropDownValues.label)
      }}
      placeholder={{
        labelKey: card.dropDownValues.label
      }}
      data={card.dropDownValues.menu}
      optionValue="code"
      optionLabel="label"
      required={true}
      onChange={event => this.handleChange(key, event)}
      jsonPath={jsonPath}
      />
      )}
        </Grid>
        <Grid
      item={true}
      xs={12}
      sm={12}
      md={3}
      className={classes.fileUploadDiv}
      >
          <UploadMultipleFile
      classes={this.props.classes}
      handleFileUpload={e => handleFileUpload(e, this.handleDocument, this.props)
      }
      uploaded={
      documentDetailsUploadRedux[key] && documentDetailsUploadRedux[key].documents
        ? true
        : false
      }
      removeDocument={() => this.removeDocument(key)}
      documents={
      documentDetailsUploadRedux[key] && documentDetailsUploadRedux[key].documents
      }
      onButtonClick={() => this.onUploadClick(key)}
      inputProps={this.props.inputProps}
      buttonLabel={this.props.buttonLabel}
      id={`doc-${key + 1}`}
      />
        </Grid>
      </Grid>
      </React.Fragment>
      );
  };

  render() {
    const {classes, documentsList} = this.props;
    let index = 0;
    return (
      <div>
        {documentsList &&
      documentsList.map(container => {
        return (
          <div>
                <LabelContainer
          labelKey={getTransformedLocale(container.title)}
          style={styles.documentTitle}
          />
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

BpaDocumentList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {screenConfiguration} = state;
  const {moduleName} = screenConfiguration;
  const documentDetailsUploadRedux = get(
    screenConfiguration.preparedFinalObject,
    "documentDetailsUploadRedux",
    {}
  );
  const documentDetailsPreview = get(
    screenConfiguration.preparedFinalObject,
    "documentDetailsPreview",
    []
  );
  const bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "BPA",
    {}
  )
  return {
    documentDetailsUploadRedux,
    documentDetailsPreview,
    moduleName,
    bpaDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) => dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(themeStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BpaDocumentList)
);