import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{`${name}'s Bio`}</h2>
      <p>{bio && <span> {bio}</span>} </p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.length > 0 &&
          skills.map((skill, i) => (
            <div className="p-1" key={i}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
