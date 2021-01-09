import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Notification.css';
import giphy1 from '../media/giphy.gif';
import applied from '../media/applied.gif';
import giphy3 from '../media/giphy3.gif';
import giphy7 from '../media/giphy7.gif';
import giphy5 from '../media/giphy5.gif';
import './Giphy.css';

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

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    const handleClose = () => {
        console.log("run close");
        props.changeGiphyInJobstack();
        setOpen(false);
    };
    useEffect(async () => {
        const op = open;
        setOpen(props.isOpen);
        await sleep(3000);
        handleClose();
    });
    function gif() {
        if (props.status === 'Fod diya re!')
            return giphy1;
        else if (props.status === 'Applied')
            return applied;
        if (props.status === 'Hiring test done!')
            return giphy3;
        if (props.status === 'Better luck next time!')
            return giphy7;
        if (props.status === 'Interview Scheduled')
            return giphy5;
    }
    var body = (
        <div className="image-wraper" >
            <img id="image" className={classes.paper} src={gif()} alt="description of gif" />
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
