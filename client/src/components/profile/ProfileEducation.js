import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.length > 0 ? (
        education.map(
          ({
            _id,
            school,
            degree,
            from,
            to,
            current,
            description,
            fieldofstudy,
          }) => (
            <div key={_id}>
              <h3 className="text-dark">{school}</h3>
              <p>{`${format(new Date(from), "MMM yyyy")} - ${
                current ? "Current" : format(new Date(to), "MMM yyyy")
              }`}</p>
              <p>
                <strong>Degree: </strong>
                {degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {fieldofstudy && <span>{fieldofstudy}</span>}
              </p>
              <p>
                <strong>Description: </strong>{" "}
                {description && <span>{description}</span>}
              </p>
            </div>
          )
        )
      ) : (
        <h4>No Education credentials is provided</h4>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
