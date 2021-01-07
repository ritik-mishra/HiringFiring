import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Notification.css';
import giphy1 from '../media/giphy.gif';
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
    cross: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
}));

export default function NotificationModal(props) {
    console.log(props);

    const classes = useStyles();
    const hover = `Set reminder`;
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(props.isOpen);
    useEffect(async () => {
        // Your code here
        await setOpen(props.isOpen);
    }, [props.isOpen]);
    console.log(open);
    const handleClose = () => {
        props.changeGiphyInJobstack();
        setOpen(false);
    };
    const body = (
        <div style={{ marginTop: "6rem", marginLeft: "24rem" }} >
            <img style={{ height: "30rem", width: "40rem", padding: "2px" }} className={classes.paper} src={giphy1} alt="description of gif" />
        </div>
    );

    return (
        <div >
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
