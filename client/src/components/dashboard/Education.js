import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Field</th>
            <th className="hide-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.length > 0 &&
            education.map(
              ({
                school,
                _id,
                from,
                to,
                current,
                description,
                fieldofstudy,
                degree,
              }) => (
                <tr key={_id}>
                  <td>{school}</td>
                  <td>{degree}</td>
                  <td className="hide-sm">{`${format(
                    new Date(from),
                    "dd-MM-yyy"
                  )} - ${
                    current ? "Current" : format(new Date(to), "dd-MM-yyy")
                  }`}</td>
                  <td className="hide-sm">{fieldofstudy}</td>
                  <td className="hide-sm">{description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEducation(_id)}
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

Education.propTypes = {
  education: PropTypes.array,
  deleteEducation: PropTypes.func,
};

export default connect(null, { deleteEducation })(Education);
