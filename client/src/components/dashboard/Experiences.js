import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experiences = ({ experience, deleteExperience }) => {
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.length > 0 &&
            experience.map(
              ({
                company,
                _id,
                from,
                to,
                current,
                description,
                location,
                title,
              }) => (
                <tr key={_id}>
                  <td>{company}</td>
                  <td>{title}</td>
                  <td className="hide-sm">{`${format(
                    new Date(from),
                    "dd-MM-yyy"
                  )} - ${
                    current ? "Current" : format(new Date(to), "dd-MM-yyy")
                  }`}</td>
                  <td className="hide-sm">{location}</td>
                  <td className="hide-sm">{description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteExperience(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
};

Experiences.propTypes = {
  experience: PropTypes.array,
  deleteExperience: PropTypes.func,
};

export default connect(null, { deleteExperience })(Experiences);
