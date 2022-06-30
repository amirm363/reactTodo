import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  input1: {
    height: 25,
    padding: 0,
  },
  input2: {
    height: 25,
    padding: 0,
  },
}));

const AddPost = (props) => {
  const classes = useStyles();
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  return (
    <div id="addnew-body">
      <div id="addnew-container">
        <div>
          <div>
            <label id="title-label">Title: </label>
            <TextField
              variant="outlined"
              InputProps={{ classes: { input: classes.input1 } }}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
          </div>
          <br />
          <div>
            <label>Body: </label>
            <TextField
              variant="outlined"
              InputProps={{ classes: { input: classes.input2 } }}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
          </div>
          <br />
        </div>
      </div>
      <div className="buttons-container">
        <Button
          variant="contained"
          disableElevation
          onClick={() => props.setNewPost(false)}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            props.addPost(newPost, props.userId);
            props.setNewPost(false);
          }}
        >
          add
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
