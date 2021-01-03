import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import './Notification.css';
import axios from 'axios';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

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
}));

export default function NotificationModal(props) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    var dt, msg = '';

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        var nDate = dt.substring(0, 14) + "00";
        var nd = new Date(nDate);
        var mlTime = nd.getTime();
        var note = {
            time: mlTime,
            message: msg,
            companyName: props.job.companyName,
            jobLink: props.job.jobLink,
            role: props.job.role,
        }
        axios.post(`${process.env.PUBLIC_URL}/api/add_reminder`, note);
        setOpen(false);
    };
    const dateChange = (e) => {
        dt = e.target.value;
    }
    const messageChange = (e) => {
        msg = e.target.value;
    }
    var t = new Date();
    var z = t.getTimezoneOffset() * 60 * 1000 - 60 * 60 * 1000;
    var tLocal = t - z;
    tLocal = new Date(tLocal);
    var date = tLocal.toISOString();
    date = date.substring(0, 14);
    date = date + "00";
    dt = date;
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="container" style={{ color: "black" }}>
                <h4>Set Reminder</h4>
                <p><b>Company Name:</b> {props.job.companyName}</p>
                <p><b>Role:</b> {props.job.role}</p>
                <p>Reminder Time (minute not considered)</p>
                <form onSubmit={handleSubmit}>
                    <input onChange={dateChange} type="datetime-local" id="reminder-time"
                        name="reminder-time"
                        min={date}
                        required>
                    </input>
                    <input onChange={messageChange} placeholder="Write your message" type="text"></input>
                    <button type="submit" value="Set Reminder">Set Reminder</button>
                </form>
            </div>
        </div>
    );

    return (
        <div>
            <IconButton style={{ color: "black" }} className={classes.margin} type="button" onClick={handleOpen} color="primary">
                <AddAlertIcon style={{ color: "black" }} fontSize="small" />
            </IconButton>
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