import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './Notification.css';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      },
    cross: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
}));
 
export default function SubscriptionModal(props) {

    const [batch, setBatch] = React.useState("");

    var x = batch;
    let sumbitButton = x ? <input style={{ color: "#33b579", width: "6rem", height: "3rem", fontWeight: "900" }}
            type='submit' /> : <p style={{ color: "red" }}>fill the mandatory * fields first</p>;

    // var job = props.role;
    const classes = useStyles();
    const hover = `More info`;
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [Snack, failureSnack] = React.useState(false);

    // const [role, setRole] = React.useState([]);

    const [role_I, setRole_I] = React.useState(false);
    const [role_F, setRole_F] = React.useState(false);
    const [role_All, setRole_All] = React.useState(false);
    

    const roleChangeHandler = (event) => {
        let val = event.target.value;
        
        // console.log(event.target.value);

        if(val === "Intern") setRole_I(!role_I)
        if(val ==="Full Time") setRole_F(!role_F)
        if((role_I && role_F) || (!role_I && !role_F)) setRole_All(true)
        
        // console.log("role I",role_I);
        // console.log("role F",role_F);
        // console.log("role All",role_All);
    }
    const batchChangeHandler = (event) => {
        let val = event.target.value;
        setBatch(val);

        // console.log(batch);
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const subs = {
            batch: batch,
            role: role_All? ["Intern", "Full Time"]: role_I ? ["Intern"] : role_F ? ["Full Time"] : ["Intern", "Full Time"]
        }
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/add_subscriber`, subs);
            // this.setState({ redirect: true });
            console.log("Subscriber Added")
        }
        catch (error) {
            console.log(error);
            failureSnack(true);
        }
    }
    const handleCloseFailureSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        failureSnack(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // var date = job.jobExpiry;
    // date = date.substring(0, 10);
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="addform">
                <div className="container">
                    <div className="addfo">
                        <div style={{ color: "grey", marginTop: '2rem' }}>
                            <span style={{ color: "grey", fontSize: "2rem", fontWeight: "500" }}>Add a subscription</span>
                        </div>
                        <div style={{ overflow: "scroll" }} className="form">
                            <form onSubmit={submitHandler}>
                                <p style={{ color: "black" }}><b>Role :</b></p>
                                    <p>
                                        <label>
                                            <input type="checkbox" name='role'
                                                onChange={(e)=>roleChangeHandler(e)} value="Intern"           
                                                    />
                                            <span>Intern</span>
                                            </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="checkbox" name='role'
                                                onChange={(e)=>roleChangeHandler(e)} value="Full Time"  
                                            />
                                            <span>Full time</span>
                                        </label>&nbsp;&nbsp;&nbsp;
                                        </p>
                                    <p style={{ color: "black" }}><b>Batch* :</b></p>
                                        <p>
                                                <label>
                                                    <input type="radio" name='batch'
                                                        onChange={(e)=>batchChangeHandler(e)} value="2020"
                                                    />
                                                    <span>2020</span>
                                                </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                                    <input type="radio" name='batch'
                                                        onChange={(e)=>batchChangeHandler(e)} value="2021"
                                                    />
                                                    <span>2021</span>
                                                </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                                    <input type="radio" name='batch'
                                                        onChange={(e)=>batchChangeHandler(e)} value="2022"
                                                    />
                                                    <span>2022</span>
                                                </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                                    <input type="radio" name='batch'
                                                        onChange={(e)=>batchChangeHandler(e)} value="2023"
                                                    />
                                                    <span>2023</span>
                                                </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                                    <input type="radio" name='batch'
                                                        onChange={(e)=>batchChangeHandler(e)} value="2024"
                                                    />
                                                    <span>2024</span>
                                                </label>
                                            </p>
                                            <div>
                                                {sumbitButton}
                                            </div>
                                            <Snackbar open={Snack} autoHideDuration={6000} onClose={handleCloseFailureSnack} >
                                                <Alert onClose={handleCloseFailureSnack} severity="error" elevation={6} variant="filled">
                                                    Failed to update your subscription.
                                                </Alert>
                                            </Snackbar>
                                        </form>
                                    </div>
                                </div>
                            </div> 
                        </div>
            {/* <div className="container" style={{ color: "black" }}>
                <p><b>Company Name</b>{props.role.join(", ")}</p>
            </div> */}
            <IconButton aria-label="cancel" onClick={handleClose} className={classes.cross}>
                <CancelIcon style={{color: "black"}} fontSize="small" />
            </IconButton>
        </div>
    );

    return (
        <div>
            <Tooltip title={hover}>
                <IconButton aria-label="info" onClick={handleOpen} >
                    <MoreHorizIcon style={{color: 'white'}} fontSize="default" />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

