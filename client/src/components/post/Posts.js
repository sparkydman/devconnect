import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPosts,
  addPost,
  deletePost,
  likePost,
  unLikePost,
} from "../../actions/post";
import PostItem from "./PostItem";

const Posts = ({
  getPosts,
  deletePost,
  addPost,
  auth,
  likePost,
  unLikePost,
  post: { posts, loading },
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {!loading &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              auth={auth}
              deletePost={deletePost}
              likePost={likePost}
              unLikePost={unLikePost}
            />
          ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object,
  addPost: PropTypes.func,
  deletePost: PropTypes.func,
  likePost: PropTypes.func,
  unLikePost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  addPost,
  deletePost,
  likePost,
  unLikePost,
})(Posts);
