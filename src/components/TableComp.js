import React, { useEffect, useState } from "react";
import utils from "../utils/utils";
import CardComp from "./CardComp";
import SearchComp from "./SearchComp";
import "../styles/styles.css";
import TodosComp from "./TodosComp";
import PostsComp from "./PostsComp";
import { Button } from "@material-ui/core";
import AddNewUser from "./AddNewUser";

// function to merge arrays
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

// Function to initialize moreData and set it to false in all the array objects.
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

  // Function that updates user data
  const updateUser = (userData) => {
    let index = usersData.findIndex((user) => user.user.id === userData.id);
    let tempArr = usersData;
    tempArr[index] = userData;
    setUsersData([...tempArr]);
  };

  // Functions that allows to remove a user from the usersData state.
  const deleteUser = (userId) => {
    let index = usersData.findIndex((user) => user.user.id === userId);

    let tempArr = usersData;
    tempArr.splice(index, 1);
    setUsersData([...tempArr]);
  };

  /* useEffect that fetches all the data needed to be shown, puts it inside "usersData" state
  and allow it to be rendered on the screen when the DOM loads up */
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

  /* Function that checks if there been a search by the client, sets the flag to the state it need to be
  and gets the searched results into a new array to render*/
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

  // Function that changes the completed attribute to true if the button attached to it is pressed
  const markCompleted = (userId, todoId) => {
    let userIndex = usersData.findIndex((user) => user.user.id === userId);
    let index = usersData[userIndex].todos.findIndex(
      (todo) => todo.id === todoId
    );
    let usersUpdated = usersData;
    usersUpdated[userIndex].todos[index].completed = true;
    setUsersData([...usersUpdated]);
  };

  /* This function finds a specific user from the usersData array or from the searchedValue array,
  than puts all of its todos, and posts inside a state called popUp, and changes the flag so it will be shown on the screen*/
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

  // Function that adds a new "post" to a specific user posts array
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

  // Function that adds a new "todo" to a specific user todos array
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

  /* This function allows the client to show all the users todos and posts on the screen,
  add new ones and mark as completed uncompleted tasks*/
  const moreData = (userId) => {
    // if there been no search, it will work on the usersData array
    if (!searchedValue.didSearch) {
      let user = usersData.find((user) => user.user.id === userId);
      // if the user moreData flag is true and the user is highlighted
      if (user.moreData) {
        let updatedUsers = initMoreData(usersData);

        getId(userId);
        setUsersData([...updatedUsers]);
      }
      // if its the first time the client wants to view the user's data
      else {
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
      /* else if there been a search, 
    the function will work on the new array created by the client searched values */
      let user = searchedValue.searchedArr.find(
        (user) => user.user.id === userId
      );
      // if the user moreData flag is true and the user is highlighted
      if (user.moreData) {
        let updSearchedArr = initMoreData(searchedValue.searchedArr);

        getId(userId);
        setSearchedValue({
          ...searchedValue,
          searchedArr: [...updSearchedArr],
        });

        let newUsersData = mergeArrs(updSearchedArr, usersData);
        setUsersData([...newUsersData]);
      }
      // if its the first time the client wants to view the user's data
      else {
        /* it will initialize both usersData and the searched array "moreData" flags
        so when the client wants to go back and see all the users, there won't
        be a chance that 2 users are highlighted*/
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

  // Adds a new user to the original array
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
