import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const PostItem = ({
  post: { _id, avatar, name, text, date, likes, unlikes, comments, user },
  auth,
  deletePost,
  likePost,
  unLikePost,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on {format(new Date(date), "MM/dd/yyyy")}
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => likePost(_id, auth.user._id)}
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length > 0 && likes.length} </span>
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => unLikePost(_id, auth.user._id)}
        >
          <i className="fas fa-thumbs-down"></i>
          <span>{unlikes.length > 0 && unlikes.length} </span>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          <span className="comment-count">
            {comments.length > 0 && comments.length}
          </span>
        </Link>
        {!auth.loading && auth.user !== null && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletePost(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func,
  likePost: PropTypes.func,
  unLikePost: PropTypes.func,
};

export default PostItem;
