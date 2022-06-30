import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "../styles/addCompStyles.css";

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

const AddNewUser = (props) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({ name: "", email: "" });
  return (
    <div id="add-new-user">
      <div id="addnew-container">
        <div>
          <div>
            <label id="title-label">Name: </label>
            <TextField
              variant="outlined"
              InputProps={{ classes: { input: classes.input1 } }}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <br />
          <div>
            <label id="email-label">Email: </label>
            <TextField
              variant="outlined"
              InputProps={{ classes: { input: classes.input2 } }}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <br />
        </div>
      </div>
      <div className="buttons-container">
        <Button
          variant="contained"
          disableElevation
          onClick={() => props.setPopUp({ ...props.popUp, addNewUser: false })}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => props.addUser(userData)}
        >
          add
        </Button>
      </div>
    </div>
  );
};

export default AddNewUser;
