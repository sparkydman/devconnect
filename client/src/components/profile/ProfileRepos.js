/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileRepos = ({ repos, getRepos, githubusername }) => {
  useEffect(() => {
    getRepos(githubusername);
  }, [getRepos, githubusername]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : repos !== null && repos.length > 0 ? (
        repos.map((repo) => (
          <div className="repo bg-white p-1 my-1" key={repo.id}>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description && <span> {repo.description} </span>}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}{" "}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}{" "}
                </li>
                <li className="badge badge-light">
                  Forks: {repo.forks_count}{" "}
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4> There is no repos for this profile </h4>
      )}
    </div>
  );
};

ProfileRepos.propTypes = {
  githubusername: PropTypes.string.isRequired,
  repos: PropTypes.array,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getRepos })(ProfileRepos);
