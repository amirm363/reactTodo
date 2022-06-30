import { Button } from "@material-ui/core";
import React, { useState } from "react";
import AddPost from "./AddPost";
import PostComp from "./PostComp";

const PostsComp = (props) => {
  const [newPost, setNewPost] = useState(false);
  return (
    <div>
      <div id="header">
        <label id="header-label">
          {!newPost ? "Posts" : "New Post"} - User {props?.posts[0]?.userId}
        </label>
        {!newPost && (
          <Button
            className="buttons"
            size="small"
            variant="contained"
            disableElevation
            onClick={() => setNewPost(true)}
          >
            Add
          </Button>
        )}
      </div>
      <div id="dataBody">
        {!newPost ? (
          props.posts.map((post) => {
            return <PostComp post={post} key={post?.id} />;
          })
        ) : (
          <AddPost
            setNewPost={setNewPost}
            addPost={props.addPost}
            userId={props.posts[0].userId}
          />
        )}
      </div>
    </div>
  );
};

export default PostsComp;
