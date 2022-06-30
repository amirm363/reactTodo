import axios from "axios";

const getUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

const getTodos = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos");
};

const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export default { getUsers, getTodos, getPosts };
