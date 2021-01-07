import React, { Component } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import giphy1 from '../media/giphy.gif';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        width:'96rem',
        height:'64rem',
        position: 'relative',
    },
    
}));
export default function Giphy(props) {
   
        const classes = useStyles();
        var status = props.status;
        console.log(status);
        if(status === "Applied")
        return (
            <div>
                <img className={classes.paper} src={giphy1} alt="description of gif" /> 
                
            </div>
        );
        else 
            return(
            <p>Hello</p>
        );
    
};
