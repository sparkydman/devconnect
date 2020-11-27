import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, addComment, deleteComment } from "../../actions/post";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { format } from "date-fns";
import Comment from "./Comment";

const Post = ({
  getPost,
  addComment,
  deleteComment,
  post: { post, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getPost(match.params.post_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPost]);

  const [commentText, setText] = useState("");
  const { user, avatar, name, text, date, comments, _id } = post;

  return (
    <>
      {date === undefined ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="" />
                <h4> {name} </h4>
              </Link>
            </div>
            <div>
              <p className="my-1"> {text} </p>
              <p className="post-date">
                Posted on {format(new Date(date), "MM/dd/yyyy")}
              </p>
            </div>
          </div>
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={(e) => {
                e.preventDefault();
                addComment({ text: commentText }, _id);
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                value={commentText}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>
          <div className="comments">
            {!loading &&
              comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  post={post}
                  auth={auth}
                  deleteComment={deleteComment}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

const mapStateToProp = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProp, { getPost, addComment, deleteComment })(
  Post
);
