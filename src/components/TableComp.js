import React, { useEffect, useState } from "react";
import utils from "../utils/utils";
import CardComp from "./CardComp";
import SearchComp from "./SearchComp";
import "../styles/styles.css";
import TodosComp from "./TodosComp";
import PostsComp from "./PostsComp";
import { Button } from "@material-ui/core";
import AddNewUser from "./AddNewUser";

const mergeArrs = (arr1, arr2) => {
  let arr2Updated = [...arr2];
  arr1.forEach((user) => {
    arr2Updated.forEach((user2, index) => {
      if (user2.user.id === user.user.id) {
        arr2Updated[index] = user;
      }
    });
  });

  return arr2Updated;
};
const mergeData = (arr1, arr2) => {
  let arr2Updated = [...arr2];
  arr1.forEach((user) => {
    arr2Updated.forEach((user2, index) => {
      if (user2.user.id === user.user.id) {
        arr2Updated[index].moreData = user.moreData;
      } else {
        arr2Updated[index].moreData = false;
      }
    });
  });

  return arr2Updated;
};

const initMoreData = (arr) => {
  let updatedUsers = arr.map((user) => {
    return { ...user, moreData: false };
  });
  return updatedUsers;
};

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

    setUsersData([...tempArr]);
  };

  const deleteUser = (userId) => {
    let index = usersData.findIndex((user) => user.user.id === userId);

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
          moreData: false,
        };
      });
      setUsersData([...tempArr]);
    };
    getUsers();
  }, []);

  const beenSearched = (searchedVal) => {
    if (searchedVal === "") {
      setSearchedValue({ ...searchedValue, didSearch: false });
    } else {
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
    }
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
    let user = {};
    searchedValue.didSearch
      ? (user = searchedValue.searchedArr.find(
          (user) => user.user.id === userId
        ))
      : (user = usersData.find((user) => user.user.id === userId));

    setPopUp({
      ...popUp,
      data: { todos: user.todos, posts: user.posts },
      state: !user.moreData,
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

    setUsersData([...newData]);
  };

  const moreData = (userId) => {
    if (!searchedValue.didSearch) {
      let user = usersData.find((user) => user.user.id === userId);
      if (user.moreData) {
        let updatedUsers = initMoreData(usersData);

        getId(userId);
        setUsersData([...updatedUsers]);
      } else {
        let updatedUsers = initMoreData(usersData);
        updatedUsers.forEach((user, index) => {
          if (user.user.id === userId) {
            updatedUsers[index].moreData = !user.moreData;
          }
        });

        getId(userId);
        setUsersData([...updatedUsers]);
      }
    } else {
      let user = searchedValue.searchedArr.find(
        (user) => user.user.id === userId
      );
      if (user.moreData) {
        let updSearchedArr = initMoreData(searchedValue.searchedArr);

        getId(userId);
        setSearchedValue({
          ...searchedValue,
          searchedArr: [...updSearchedArr],
        });

        let newUsersData = mergeArrs(updSearchedArr, usersData);
        setUsersData([...newUsersData]);
      } else {
        let updSearchedArr = initMoreData(searchedValue.searchedArr);
        let originalArr = initMoreData(usersData);
        updSearchedArr.forEach((user, index) => {
          if (user.user.id === userId) {
            updSearchedArr[index].moreData = !user.moreData;
          }
        });

        getId(userId);
        setSearchedValue({
          ...searchedValue,
          searchedArr: [...updSearchedArr],
        });
        let newUsersData = mergeArrs(updSearchedArr, originalArr);
        setUsersData([...newUsersData]);
      }
    }
  };

  const addUser = (user) => {
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
                    moreData={moreData}
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
                    moreData={moreData}
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
