import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileIitem = ({
  profile: {
    status,
    company,
    location,
    skills,
    user: { name, _id, avatar },
  },
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, i) => (
          <li className="text-primary" key={i}>
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileIitem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileIitem;
