import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import axios from "axios";
import { setAlert } from "../actions/alert";
import setUserAuthToken from "../utils/setUserAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setUserAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const { data } = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors
        .slice(0, 1)
        .forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ email, password });

  try {
    const { data } = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout/clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
