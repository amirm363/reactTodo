import { Button } from "@material-ui/core";
import "../styles/cardChildStyles.css";
import React, { useState } from "react";
import TodoComp from "./TodoComp";
import AddTodo from "./AddTodo";

const TodosComp = (props) => {
  const [newTodo, setNewTodo] = useState(false);

  return (
    <div>
      <div id="header">
        <label id="header-label">
          {!newTodo ? "Todos" : "New todo"} - User {props.todos[0].userId}
        </label>
        {!newTodo && (
          <Button
            className="buttons"
            size="small"
            variant="contained"
            disableElevation
            onClick={() => setNewTodo(true)}
          >
            Add
          </Button>
        )}
      </div>
      <div id="dataBody">
        {!newTodo ? (
          props.todos.map((todo) => {
            return (
              <TodoComp
                todo={todo}
                key={todo.id}
                markCompleted={props.markCompleted}
              />
            );
          })
        ) : (
          <AddTodo
            setNewTodo={setNewTodo}
            addTodo={props.addTodo}
            userId={props.todos[0].userId}
          />
        )}
      </div>
    </div>
  );
};

export default TodosComp;
