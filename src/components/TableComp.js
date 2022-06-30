import React, { useEffect, useState } from "react";
import utils from "../utils/utils";
import CardComp from "./CardComp";
import SearchComp from "./SearchComp";
import "../styles/styles.css";
import TodosComp from "./TodosComp";
import PostsComp from "./PostsComp";
import { Button } from "@material-ui/core";
import AddNewUser from "./AddNewUser";

const TableComp = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchedValue, setSearchedValue] = useState({
    searchedArr: [],
    didSearch: false,
  });
  const [popUp, setPopUp] = useState({
    data: { todos: [], posts: [] },
    state: false,
    addNewUser: false,
  });

  const updateUser = (userData) => {
    let index = usersData.findIndex((user) => user.user.id === userData.id);
    let tempArr = usersData;
    tempArr[index] = userData;
    console.log(tempArr[index]);
    setUsersData([...tempArr]);
  };

  const deleteUser = (userId) => {
    let index = usersData.findIndex((user) => user.user.id === userId);
    console.log(index);
    let tempArr = usersData;
    tempArr.splice(index, 1);
    setUsersData([...tempArr]);
  };

  useEffect(() => {
    const getUsers = async () => {
      let users = await utils.getUsers();
      let todos = await utils.getTodos();
      let posts = await utils.getPosts();

      let tempArr = users.data.map((user) => {
        return {
          user,
          todos: todos.data.filter((todo) => todo.userId === user.id),
          posts: posts.data.filter((post) => post.userId === user.id),
        };
      });
      setUsersData([...tempArr]);
    };
    getUsers();
  }, []);

  const beenSearched = (searchedVal) => {
    let tempArr = usersData.filter((user) => {
      if (
        user.user.name.includes(searchedVal) ||
        user.user.email.includes(searchedVal)
      ) {
        return user;
      } else return null;
    });
    if (tempArr)
      setSearchedValue({ searchedArr: [...tempArr], didSearch: true });
  };

  const markCompleted = (userId, todoId) => {
    let userIndex = usersData.findIndex((user) => user.user.id === userId);
    let index = usersData[userIndex].todos.findIndex(
      (todo) => todo.id === todoId
    );
    let usersUpdated = usersData;
    usersUpdated[userIndex].todos[index].completed = true;
    setUsersData([...usersUpdated]);
  };

  const getId = (userId) => {
    let user = usersData.find((user) => user.user.id === userId);

    setPopUp({
      data: { todos: user.todos, posts: user.posts },
      state: !popUp.state,
    });
  };

  const addPost = (post, userId) => {
    let newData = usersData;
    let newPost = {
      userId,
      id: newData[userId - 1].posts.at(-1).id + 1,
      ...post,
    };
    newData[userId - 1].posts.push(newPost);
    console.log(newData);
    setUsersData([...newData]);
  };
  const addTodo = (todo, userId) => {
    let newData = usersData;

    let newTodo = {
      userId,
      id: newData[userId - 1].todos.at(-1).id + 1,
      ...todo,
    };
    newData[userId - 1].todos.push(newTodo);
    console.log(newData);
    setUsersData([...newData]);
  };

  const addUser = (user) => {
    console.log(usersData[usersData.length - 1].todos);
    let newUser = {
      user: {
        id: usersData.length + 1,
        ...user,
        address: {
          street: "",
          city: "",
          zipcode: "",
        },
      },
      todos: [
        {
          userId: usersData.length + 1,
          id:
            usersData[usersData.length - 1].todos[
              usersData[usersData.length - 1].todos.length - 1
            ].id + 1,
          title: "",
          completed: false,
        },
      ],
      posts: [
        {
          userId: usersData.length + 1,
          id:
            usersData[usersData.length - 1].posts[
              usersData[usersData.length - 1].posts.length - 1
            ].id + 1,
          title: "",
          body: "",
        },
      ],
    };
    let newUsersData = usersData;
    newUsersData.push(newUser);
    console.log(newUsersData);
    setUsersData([...newUsersData]);
  };
  return (
    <div id="container1">
      <div id="container2">
        <div className="search-bar">
          <SearchComp beenSearched={beenSearched} />
          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              setPopUp({ ...popUp, state: false, addNewUser: true })
            }
          >
            Add
          </Button>
        </div>
        <div>
          {!searchedValue.didSearch
            ? usersData.map((user) => {
                return (
                  <CardComp
                    user={user}
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                    popUp={popUp}
                    setPopUp={setPopUp}
                    getId={getId}
                    key={user.user.id}
                  />
                );
              })
            : searchedValue.searchedArr.map((user) => {
                return (
                  <CardComp
                    user={user}
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                    popUp={popUp}
                    setPopUp={setPopUp}
                    getId={getId}
                    key={user.user.id}
                  />
                );
              })}
        </div>
      </div>
      {popUp.state && (
        <div id="container">
          <TodosComp
            todos={popUp.data.todos}
            markCompleted={markCompleted}
            addTodo={addTodo}
          />
          <PostsComp posts={popUp.data.posts} addPost={addPost} />
        </div>
      )}
      {popUp.addNewUser && (
        <AddNewUser setPopUp={setPopUp} popUp={popUp} addUser={addUser} />
      )}
    </div>
  );
};

export default TableComp;
