import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  CREATE_PROFILE_FAIL,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: "Network error",
    });
  }
};

// Get all users profile
export const getProfiles = () => async (dispatch) => {
  // Clear the previous profile state so that the content might not flash the previous profile
  dispatch({ type: CLEAR_PROFILE });

  try {
    const { data } = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: "Network error",
    });
  }
};

// Get user's profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: "Network error",
    });
  }
};

// Get user's repos
export const getRepos = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: "Network error",
    });
  }
};

// Create/Edit profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(formData);
    const { data } = await axios.post("/api/profile", body, config);

    dispatch({
      type: CREATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .map((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: "Network error",
    });
  }
};

// Add Exprience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(formData);
    const { data } = await axios.put("/api/profile/experience", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Experience added"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .map((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: "Network error",
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(formData);
    const { data } = await axios.put("/api/profile/education", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Education added"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .map((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: "Network error",
    });
  }
};

// delete Exprience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/experience/${exp_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Experience deleted"));
  } catch (err) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: "Network error",
    });
  }
};

// delete Exprience
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Education deleted"));
  } catch (err) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: "Network error",
    });
  }
};

// delete Exprience
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete your account")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("You account has been deleted permanently"));
    } catch (err) {
      dispatch({
        type: CREATE_PROFILE_FAIL,
        payload: "Network error",
      });
    }
  }
};
