import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import "../styles/styles.css";
import React, { useEffect, useState } from "react";
import OtherDataComp from "./OtherDataComp";

const useStyles = makeStyles(() => ({
  input1: {
    height: 25,
    padding: 0,
  },
}));

const CardComp = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(props.user);
  const [booleans, setBooleans] = useState({
    completed: true,
    otherData: false,
    // idClick: props.user.moreData,
  });

  useEffect(() => {
    const ifCompleted = () => {
      var flag = true;
      props.user.todos.forEach((todo) => {
        if (!todo.completed) {
          flag = false;
        }
      });

      return setBooleans({ ...booleans, completed: flag });
    };
    ifCompleted();
  }, [props]);

  return (
    <Card
      id="card"
      style={{
        borderColor: booleans.completed ? "green" : "red",
        backgroundColor: props.user.moreData ? "orange" : "white",
      }}
    >
      <div>
        <label
          className="Labels"
          htmlFor="id"
          onClick={() => {
            props.moreData(user.user.id);
            props.getId(user.user.id);
          }}
        >
          ID:
        </label>
        {user.user.id}
        <br />
        <label className="Labels" htmlFor="name">
          Name:
        </label>
        <TextField
          variant="outlined"
          className="textField"
          InputProps={{ classes: { input: classes.input1 } }}
          value={user.user.name}
          onChange={(e) =>
            setUser({ ...user, user: { ...user.user, name: e.target.value } })
          }
        />
        <br />
        <label className="Labels email" htmlFor="email">
          Email:
        </label>
        <TextField
          variant="outlined"
          className="textField"
          InputProps={{ classes: { input: classes.input1 } }}
          value={user.user.email}
          onChange={(e) =>
            setUser({ ...user, user: { ...user.user, email: e.target.value } })
          }
        />
        <br />
      </div>
      <div>
        <div id="buttons-container1">
          <Button
            variant="contained"
            disableElevation
            id="data-button"
            onMouseEnter={() => setBooleans({ ...booleans, otherData: true })}
            onClick={() => setBooleans({ ...booleans, otherData: false })}
          >
            Other Data
          </Button>
        </div>
        <div id="other-data">
          {booleans.otherData && (
            <OtherDataComp data={user.user} setUser={setUser} />
          )}
        </div>
        <div id="buttons-container2">
          <Button
            variant="contained"
            disableElevation
            onClick={() => props.updateUser(user)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => props.deleteUser(user.user.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardComp;
