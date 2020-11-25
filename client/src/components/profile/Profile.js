/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileRepos from "./ProfileRepos";

const Profile = ({
  getProfileById,
  profile: { profile },
  auth,
  match: {
    params: { user_id },
  },
}) => {
  useEffect(() => {
    getProfileById(user_id);
  }, [getProfileById, user_id]);

  return (
    <>
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/developers" className="btn btn-light">
            Back To Developers
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <ProfileExperience profile={profile} />
          <ProfileEducation profile={profile} />
          {profile.githubusername !== null && (
            <ProfileRepos githubusername={profile.githubusername} />
          )}
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
