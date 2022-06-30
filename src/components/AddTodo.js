import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "../styles/addCompStyles.css";

const useStyles = makeStyles(() => ({
  input1: {
    height: 25,
    padding: 0,
  },
}));

const AddTodo = (props) => {
  const classes = useStyles();
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  return (
    <div id="addnew-body">
      <div id="addnew-container">
        <div>
          <label>Title: </label>
          <TextField
            variant="outlined"
            InputProps={{ classes: { input: classes.input1 } }}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <br />
        </div>
      </div>
      <div className="buttons-container">
        <Button
          variant="contained"
          disableElevation
          onClick={() => props.setNewTodo(false)}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            props.addTodo(newTodo, props.userId);
            props.setNewTodo(false);
          }}
        >
          add
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
