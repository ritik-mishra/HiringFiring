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
  Grid
} from "@material-ui/core";
import axios from "axios";
import CommentCard from "./CommentCard";


const { v4: uuidv4 } = require('uuid');
const useStyles = makeStyles(theme => ({
  root: {
    
    borderRadius: "20px",
    padding:"10px",
    width: "100%",
    backgroundColor: "hsl(45, 38%, 94%)"
    // backgroundColor: theme.palette.background.paper
  },
  outer_block: {
    padding:"5px",
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
  const auth = useSelector(state => state.auth);

  //Submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempAddedNewComment = [...addedNewComment];
    setAddedNewComment(addedNewComment => [...addedNewComment,{_id: uuidv4(), jobId:props.jobId, createdAt:Date(Date.now),postedBy: auth.name, postedById: "", picURL: auth.picURL, comment: "Uploading..."}]);
    setComment("");
    const res = await axios.post(`${process.env.PUBLIC_URL}/api/add_comment/`,{jobId: props.jobId, comment: comment});
    tempAddedNewComment.push(res.data);
    setAddedNewComment(tempAddedNewComment);
  }
  //Fetch previous section
  const fetchPrevComments = async(event) => {
    event.preventDefault();
    if(!processingPrevComments){
      setProcessingPrevComments(true);
      await props.fetchComments();
      setProcessingPrevComments(false);
    }
  }
  //CommentCard Rendering
  var renderCommentCard = null;
  if(props.comments !== null && props.comments.length !== 0){
    renderCommentCard = props.comments.slice().reverse().map(comment => {
      if(!comment.isDeleted){
        return (
          <CommentCard key={comment._id} comment={comment}/>
        );
      }
      else{
        return null;
      }
    });
  }
  //Render Newly Added Comments
  var renderNewAddedComments = null;
  if(addedNewComment.length !== 0){
    renderNewAddedComments = addedNewComment.map(comment => {
      if(!comment.isDeleted){
        return (
          <CommentCard key = {comment._id} comment={comment}/>
        )
      }
      else{
        return null;
      }
    })
  }
  //Option to load more comments
  var loadPrevComments = null;
  if(props.offSet !== null){
    loadPrevComments = (
        <React.Fragment key={props.offSet}>
          <ListItem key={props.offset} alignItems="flex-start">
              <ListItemText
              secondary={
                  <a href = '#' onClick= {fetchPrevComments}>
                  <b><div style={{fontSize:"15px", color:"#4682B4"}}>{`Load previous comments`}</div></b>
                  </a>
              }
              />
          </ListItem>
        </React.Fragment>
    );
  }
  return (
    <div>
      <List className={classes.root}>
      <div style={{paddingLeft:"5px"}}>
        {loadPrevComments}</div>
        <div style={{padding:"5px"}}>
        {renderCommentCard}
        {/* <div style={{padding:"10px"}}> */}
        {renderNewAddedComments}</div>
        <form className={classes.formed} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ListItem className={classes.outer_block}>
            <ListItemAvatar>
              <Avatar alt="avatar" src={auth.picURL} />
            </ListItemAvatar>
            <ListItemText>
              
                <TextField
                id= {props.jobId}
                label="Comment"
                multiline
                rows={2}
                variant="filled"
                className= {classes.textField}
                value={comment}
                onChange={e => setComment(e.target.value)}
                />
            </ListItemText>
          </ListItem>
          <ListItem>
            <Grid container justify="flex-end">
              <Button 
                type="submit"
                variant="contained"
                color="#90EE90"
              >
                Add
              </Button>
            </Grid>
          </ListItem>
        </form>
      </List>
      <Divider />
    </div>
  );
};
export default CommentBox;