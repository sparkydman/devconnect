import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Global data
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setUserAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Routes
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivatRoute from "./components/routing/PrivatRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Developers from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/post/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/profile/:user_id" component={Profile} />
              <PrivatRoute exact path="/dashboard" component={Dashboard} />
              <PrivatRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivatRoute exact path="/edit-profile" component={EditProfile} />
              <PrivatRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivatRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivatRoute exact path="/posts" component={Posts} />
              <PrivatRoute exact path="/post/:post_id" component={Post} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
