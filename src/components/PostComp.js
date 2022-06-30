import "../styles/cardChildStyles.css";
import React from "react";

const PostComp = (props) => {
  return (
    <div>
      <div id="body">
        <div id="data-container2">
          <div id="title-data">
            <label>Title: {props.post.title} </label>
            <br />
          </div>
          <div>
            <label>Body: {props.post.body}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComp;
