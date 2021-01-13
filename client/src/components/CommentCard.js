import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  check_outer: {
    backgroundColor: "#F2FFE6",
    border: "2px solid black",
    borderRadius: "20px",
    padding: "15px"
  },
  root: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#F2FFE6",
    borderRadius: "10px"
    // backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  },
  textField: {
    width: "100%"
  },
  iconButton: {
    color: "grey",
    fill: "grey"
  }
})
);

const CommentCard = (props) => {
  const classes = useStyles();
  const [showComment, setshowComment] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState(props.comment.comment);
  const [prevComment, setPrevComment] = useState(props.comment.comment);
  const [deleteDailog, setDeleteDialog] = useState(false);
  const auth = useSelector(state => state.auth);

  //Handling Delete Dialog
  const getPostedbyName = (name) => {
    var r1 = name.split(" ");
    // console.log(r1);
    var res = '';
    if (r1.length > 0) {
      res = r1[0];
    }
    if (r1.length > 1) {
      res = res + ' ' + r1[1];
    }
    if (r1.length > 2) {
      res = res + ' ' + r1[2];
    }
    return res;
  }
  const handleDeleteDialogOpen = (event) => {
    event.preventDefault();
    setDeleteDialog(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
  }
  //Delete function
  const deleteHandler = async (event) => {
    event.preventDefault();
    setshowComment(false);
    await axios.patch(`${process.env.PUBLIC_URL}/api/delete_comment/${props.comment._id}`);
    setDeleteDialog(false);
  }

  //Edit function
  const editHandler = async (event) => {
    event.preventDefault();
    setEditMode(true);
  }
  //Update function
  const updateHandler = async (event) => {
    event.preventDefault();
    setEditMode(false);
    await axios.patch(`${process.env.PUBLIC_URL}/api/update_comment/${props.comment._id}`, { comment: comment });
    setPrevComment(comment);
  }
  //go back without keeping edits
  const discardChangesHandler = async (event) => {
    event.preventDefault();
    setEditMode(false);
    setComment(prevComment);
  }
  if (editMode) {
    return (
      <ListItem>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={updateHandler}>
          <TextField style={{ padding: "10px" }}
            id="standard-multiline-flexible"
            label="update"
            multiline
            rows={2}
            variant="filled"
            className={classes.textField}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="#FFF0F5"
          >
            update
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
            variant="contained"
            color="#FFF0F5"
            onClick={discardChangesHandler}
          >
            Discard
            </Button>
<<<<<<< HEAD
          </form>
        </ListItem>
        )
    }
    
    if(!props.comment.isDeleted && showComment){
        //Delete Button
        var delButton = null;
        var delDialogBox = null; 
        if(auth._id && (auth._id === props.comment.postedById)){
            delButton = (
              <IconButton style={{float:"right", ariaLabel:"delete", color:"primary"}} onClick={handleDeleteDialogOpen }>
              <DeleteIcon className={classes.iconButton}/>
              </IconButton>
            );
          //Delete Dialog box
            delDialogBox = (
                <Dialog
                open={deleteDailog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                  <DialogTitle style={{ color: "black" }} id="alert-dialog-title">{"Are you sure you want to delete the comment?"}</DialogTitle>
                    <DialogActions>
                      <Button style={{ backgroundColor: "#dfe6e3" }} onClick={handleDeleteDialogClose} >
                        No
                      </Button>
                      <Button style={{ backgroundColor: "#92C7BE" }} onClick={deleteHandler} color="primary" autoFocus>
                        Yes
=======
        </form>
      </ListItem>
    )
  }

  if (!props.comment.isDeleted && showComment) {
    //Delete Button
    var delButton = null;
    var delDialogBox = null;
    if (auth._id && (auth._id === props.comment.postedById)) {
      delButton = (
        <IconButton style={{ float: "right", ariaLabel: "delete", color: "primary" }} onClick={handleDeleteDialogOpen}>
          <DeleteIcon className={classes.iconButton} />
        </IconButton>
      );
      //Delete Dialog box
      delDialogBox = (
        <Dialog
          open={deleteDailog}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "black" }} id="alert-dialog-title">{"Are you sure you want to delete the comment?"}</DialogTitle>
          <DialogActions>
            <Button style={{ backgroundColor: "#33b579" }} onClick={handleDeleteDialogClose} >
              No
                      </Button>
            <Button style={{ backgroundColor: "#e6e6e6" }} onClick={deleteHandler} color="primary" autoFocus>
              Yes
>>>>>>> main
                      </Button>
          </DialogActions>
        </Dialog>
      );
    }
    var editButton = null;
    if (auth._id && (auth._id === props.comment.postedById)) {
      editButton = (
        <IconButton style={{ float: "right" }} aria-label="edit" color="primary" onClick={editHandler}>
          <EditIcon className={classes.iconButton} />
        </IconButton>
      );
    }
    var date = props.comment.createdAt;
    date = new Date(date).toLocaleString();
    date = date.substring(0, 17);
    return (
      <React.Fragment key={props.comment._id}>
        <div>
          <ListItem key={props.comment.id} alignItems="flex-start" style={{ paddingTop: "2px", paddingBottom: "2px", width: "57rem", maxWidth: "100%" }}>
            <ListItemAvatar>
              <Avatar alt="avatar" src={props.comment.picURL} />
            </ListItemAvatar>
            <ListItemText
              style={{ backgroundColor: "rgb(245 245 245)", borderRadius: "5px", padding: "4px", width: "70rem" }}
              primary={
                <div>
                  <Typography
                    className={classes.fonts}
                    color="textPrimary"
                  >
                    {getPostedbyName(props.comment.postedBy)}
                    <p style={{ color: "grey", display: "inline", float: "right", fontSize: "0.8rem", fontWeight: "normal" }}>{date}</p>
                  </Typography>
                </div>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment}
                  </Typography >
                    &nbsp;&nbsp;

                    {/* {` - ${moment(props.comment.createdAt).calendar()}`} */}
                  {delButton}
                  {editButton}
                  {delDialogBox}
                </>
              }
            />
          </ListItem>
        </div>
      </React.Fragment >
    );
  }
  else {
    return null;
  }
};
export default CommentCard;