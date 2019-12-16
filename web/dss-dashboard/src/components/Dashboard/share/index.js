import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import share from '../../../images/share.svg';
import DraftsIcon from '@material-ui/icons/Drafts';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import { handlePdfShareEmail, handleImageShareEmail, handleWhatsAppImageShare, handleWhatsAppPdfShare } from '../../../utils/Share';
import { printDocumentShare } from '../../../utils/block';
import { renderToString, } from 'react-dom/server'
import FilterTable from '../download/filterTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIStatus } from '../../../actions/apiStatus'
import domtoimage from 'dom-to-image';
import Variables from '../../../styles/variables'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: '#fff',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#5b5b5b',
            },
        },
    },
}))(MenuItem);

export function CustomizedShare(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [anchorEl_email, setAnchorEl_email] = React.useState(null);
    // const [anchorEl_pdf, setAnchorEl_pdf] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderTable = () => {
        return renderToString(<FilterTable data={props.GFilterData} name= {props.fileHeader || "Dashboard"} />)
    }
    const filterFunc = function(node) {
        if (node.id == 'divNotToPrint') return false;
        return true;
    };
    const shareWhatsAppPDF = () => {
        props.APITrans(true);
        // const pdf1 = new jsPDF("p", "mm", "a1");
        // pdf1.scaleFactor = 3;

        printDocumentShare(renderTable()).then(function (pdfO) {
            // let element = document.getElementById("printFtable")
            // element.parentNode.removeChild(element);
            setAnchorEl(null);
            try {
                props.APITrans(false);
                handleWhatsAppPdfShare(pdfO)
            } catch{ }
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })
    }

    const shareEmailPDF = () => {
        props.APITrans(true);
        // const pdf1 = new jsPDF("p", "mm", "a1");
        // pdf1.scaleFactor = 3;

        printDocumentShare(renderTable()).then(function (pdfO) {
            // let element = document.getElementById("printFtable")
            // element.parentNode.removeChild(element);
            setAnchorEl(null);
            try {
                props.APITrans(false);
                handlePdfShareEmail(pdfO)
            } catch{ }
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })
    }

    const dataURItoBlob = (dataURI) => {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }

    const shareEmailImage = () => {
        props.APITrans(true);

        var ts = Math.round((new Date()).getTime() / 1000);

        let div = document.getElementById('divToPrint');
        domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white', filter: filterFunc  })
            .then(function (dataUrl) {
                var blobData = dataURItoBlob(dataUrl);
                blobData.name = "dss" + ts + ".jpeg"

                try {
                    props.APITrans(false);
                    handleImageShareEmail(blobData)
                } catch{ }
            }.bind(this))
    }

    const shareWhatsAppImage = () => {
        props.APITrans(true);

        var ts = Math.round((new Date()).getTime() / 1000);

        let div = document.getElementById('divToPrint');
        domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white', filter: filterFunc  })
            .then(function (dataUrl) {
                var blobData = dataURItoBlob(dataUrl);
                blobData.name = "dss" + ts + ".jpeg"

                try {
                    props.APITrans(false);
                    handleWhatsAppImageShare(blobData)
                } catch{ }
            }.bind(this))
    }

    const renderSharePDFMenue = (menue) => {
        return (
            <div >
                <Button style={{ borderRadius: '2px', border: 'solid 1px #5b5b5b', backgroundColor: "rgba(255, 255, 255, 0)" }}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    // color="primary"
                    onClick={handleClick}
                >
                    <SVG style={{ marginRight: '10px' }}>
                        {/* className={StyledMenuItem.CloseButton} */}
                    </SVG>
                    Share
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={shareEmailPDF}>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" style={{color:Variables.email}}/>
                        </ListItemIcon>
                        <ListItemText primary="PDF" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={shareEmailImage}>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" style={{color:Variables.email}}/>
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={shareWhatsAppPDF}>
                        <ListItemIcon>
                            <WhatsappIcon fontSize="small" style={{color: Variables.whatsApp}}/>
                        </ListItemIcon>
                        <ListItemText primary="PDF" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={shareWhatsAppImage}>
                        <ListItemIcon>
                            <WhatsappIcon fontSize="small" style={{color:Variables.whatsApp}}/>
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        )
    }

    return (
        <div>
            <Button
                style={{ marginLeft: '20px', borderRadius: '2px', border: 'solid 1px #5b5b5b', backgroundColor: "rgba(255, 255, 255, 0)", height: '32px' }}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                <SVG src={share} style={{ marginRight: '10px' }} >
                    {/* className={StyledMenuItem.CloseButton} */}
                </SVG>
                <div style={{ fontFamily: 'Roboto', fontSize: '12px', fontWeight: '500', fontStretch: 'normal', fontStyle: 'normal', linHeight: 'normal', letterSpacing: 'normal', color: '#5b5b5b' }}>Share</div>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>

                    {renderSharePDFMenue()}

                </StyledMenuItem>

            </StyledMenu>
        </div >
    );
}

const mapStateToProps = state => ({
    GFilterData: state.GFilterData,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITrans: APIStatus,
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomizedShare);