import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experience.length > 0 ? (
        experience.map(
          ({
            _id,
            title,
            company,
            from,
            to,
            current,
            description,
            location,
          }) => (
            <div key={_id}>
              <h3 className="text-dark">{company}</h3>
              <p>{`${format(new Date(from), "MMM yyyy")} - ${
                current ? "Current" : format(new Date(to), "MMM yyyy")
              }`}</p>
              <p>
                <strong>Position: </strong>
                {title}
              </p>
              <p>
                <strong>Location: </strong>
                {location && <span>{location}</span>}
              </p>
              <p>
                <strong>Description: </strong>{" "}
                {description && <span>{description}</span>}
              </p>
            </div>
          )
        )
      ) : (
        <h4>No Experience credential is provided</h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
