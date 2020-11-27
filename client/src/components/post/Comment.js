import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
// import { connect } from "react-redux";
// import { deleteComment } from "../../actions/post";

const Comment = ({
  comment: { user, text, name, avatar, date, _id },
  auth,
  post,
  deleteComment,
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
        <p className="my-1"> {text} </p>
        <p className="post-date">
          Posted on {format(new Date(date), "MM/dd/yyyy")}
        </p>
        {!auth.loading && auth.user !== null && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(_id, post._id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deleteComment: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

export default Comment;
