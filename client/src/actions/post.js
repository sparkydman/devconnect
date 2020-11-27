import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_COMMENT,
  ADD_PPOST,
  REMOVE_POST,
  UPDATE_LIKES,
  REMOVE_COMMENT,
  UPDATE_UNLIKES,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${postId}`);
    dispatch({
      type: REMOVE_POST,
      payload: postId,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const likePost = (postId, user) => async (dispatch) => {
  console.log("postId: ", postId, "user: ", user);
  try {
    const { data } = await axios.put(`/api/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: data, userId: user },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const unLikePost = (postId, user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/post/unlike/${postId}`);
    dispatch({
      type: UPDATE_UNLIKES,
      payload: { id: postId, unlikes: data, userId: user },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const addPost = (value) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/post", value, {
      headers: { "Content-type": "application/json" },
    });
    dispatch({
      type: ADD_PPOST,
      payload: data,
    });
    dispatch(setAlert("Post created"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .map((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
        type: POST_ERROR,
        payload: "Network error",
      });
    }
  }
};

export const addComment = (text, postId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/post/comment/${postId}`, text);

    dispatch({
      type: ADD_COMMENT,
      payload: data,
    });
    dispatch(setAlert("Comment Added"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .map((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};

export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: "Network error",
    });
  }
};
