import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  ListItemAvatar,
  Avatar,
  Grid,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import CommentCard from "./CommentCard";
import './CommentBox.css';

const { v4: uuidv4 } = require('uuid');
const useStyles = makeStyles(theme => ({
  root: {

    borderRadius: "20px",
    padding: "10px",
    width: "100%",
    backgroundColor: "rgb(245 245 245)"
    // backgroundColor: theme.palette.background.paper
  },
  outer_block: {
    padding: "5px",
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  },
  textField: {
    width: "100%"
  }
}));

const CommentBox = (props) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [addedNewComment, setAddedNewComment] = useState([]);
  const [processingPrevComments, setProcessingPrevComments] = useState(false);
  const [sucessSnack, setSucessSnack] = useState(false);
  const [failureSnack, setFailureSnack] = useState(false);
  const auth = useSelector(state => state.auth);

  //Snackbar closing functions
  const handleCloseSucessSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSucessSnack(false);
  };
  const handleCloseFailureSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailureSnack(false);
  };
  //Handling Alert
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  //Submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempAddedNewComment = addedNewComment;
    setComment("");
    try {
      setAddedNewComment(addedNewComment => [...addedNewComment, { _id: uuidv4(), jobId: props.jobId, createdAt: (Date.now), postedBy: auth.name, postedById: "", picURL: auth.picURL, comment: "Uploading..." }]);
      const res = await axios.post(`${process.env.PUBLIC_URL}/api/add_comment/`, { jobId: props.jobId, comment: comment });
      setSucessSnack(true);
      tempAddedNewComment.push(res.data);
      setAddedNewComment(tempAddedNewComment);
    }
    catch (error) {
      setAddedNewComment(tempAddedNewComment);
      setFailureSnack(true);
    }
  }
  //Fetch previous section
  const fetchPrevComments = async (event) => {
    event.preventDefault();
    if (!processingPrevComments) {
      setProcessingPrevComments(true);
      await props.fetchComments();
      setProcessingPrevComments(false);
    }
  }
  //CommentCard Rendering
  var renderCommentCard = null;
  if (props.comments !== null && props.comments.length !== 0) {
    renderCommentCard = props.comments.slice().reverse().map(comment => {
      if (!comment.isDeleted) {
        return (
          <CommentCard key={comment._id} comment={comment} />
        );
      }
      else {
        return null;
      }
    });
  }
  //Render Newly Added Comments
  var renderNewAddedComments = null;
  if (addedNewComment.length !== 0) {
    renderNewAddedComments = addedNewComment.map(comment => {
      if (!comment.isDeleted) {
        return (
          <CommentCard key={comment._id} comment={comment} />
        )
      }
      else {
        return null;
      }
    })
  }
  //Option to load more comments
  var loadPrevComments = null;
  if (props.offSet !== null) {
    loadPrevComments = (
      <React.Fragment key={props.offSet}>
        <ListItem key={props.offset} alignItems="flex-start">
          <ListItemText
            secondary={
              <a href='#' onClick={fetchPrevComments}>
                <i><b><div style={{ fontSize: "15px", color: "#a6a6a6" }}>{`Load previous comments`}</div></b></i>
              </a>
            }
          />
        </ListItem>
      </React.Fragment>
    );
  }

  return (
    <div>
      <List style={{ padding: "0px", borderRadius: "0", backgroundColor: "white" }} className={classes.root}>
        <div>
          {loadPrevComments}
        </div>
        <div>
          {renderCommentCard}
          {/* <div style={{padding:"10px"}}> */}
          {renderNewAddedComments}
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ display: "flex", marginBottom: "0.5rem" }}>
            <Avatar style={{ marginLeft: "1rem", marginTop: "1rem" }} alt="avatar" src={auth.picURL} />
            <TextField
              id={props.jobId}
              label="Comment"
              multiline
              rows={2}
              variant="filled"
              className={classes.textField}
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{ backgroundColor: "rgb(245 245 245)", height: "4rem", margin: "0.5rem", marginLeft: "1.2rem", width: "45rem", maxWidth: "80%" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="#90EE90"
              style={{ marginLeft: "1rem", height: "2.5rem", marginTop: "1.2rem" }}
            >
              Add
               </Button>
          </div>
        </form>
        <Snackbar open={sucessSnack} autoHideDuration={6000} onClose={handleCloseSucessSnack} >
          <Alert onClose={handleCloseSucessSnack} severity="success">
            Your comment has been added
          </Alert>
        </Snackbar>
        <Snackbar open={failureSnack} autoHideDuration={6000} onClose={handleCloseFailureSnack} >
          <Alert onClose={handleCloseFailureSnack} severity="error">
            Failed to add your comment
          </Alert>
        </Snackbar>
      </List>
    </div>
  );
};
export default CommentBox;