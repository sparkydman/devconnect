import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { avatar, name },
    status,
    company,
    location,
    website,
    social: { twitter, facebook, linkedin, instagram, youtube },
  },
}) => {
  return (
    // <div className="profile-grid my-1">
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p className="my-1">{location && <span>{location}</span>} </p>
      <div className="icons my-1">
        <a
          href={website ? website : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-globe fa-2x"></i>
        </a>
        <a
          href={twitter ? twitter : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a
          href={facebook ? facebook : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a
          href={linkedin ? linkedin : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a
          href={youtube ? youtube : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube fa-2x"></i>
        </a>
        <a
          href={instagram ? instagram : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </div>
    // </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
