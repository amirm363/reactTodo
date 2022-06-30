import { Button } from "@material-ui/core";
import "../styles/cardChildStyles.css";
import React from "react";

const TodoComp = (props) => {
  return (
    <div>
      <div id="body">
        <div id="data-container">
          <div>
            <label>Title: {props.todo.title} </label>

            <br />
          </div>
          <div id="completed-container">
            <label id="completed">
              Completed: {props.todo.completed.toString()}{" "}
            </label>
            {!props.todo.completed && (
              <Button
                id="buttons"
                variant="contained"
                disableElevation
                size="small"
                onClick={() =>
                  props.markCompleted(props.todo.userId, props.todo.id)
                }
              >
                Mark Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComp;
