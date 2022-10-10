import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  getUserData,
  getUserDetailsAPI,
  getUserFollowers,
  getUserReposAPI,
  saveUserData,
} from "./gitHub";
import "./MainPage.css";
import RepoList from "./RepoList/RepoList";
import UserDetails from "./UserDetails";

function MainPage() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [flag, setFlag] = useState(false);

  const search = useLocation().search;
  const name = new URLSearchParams(search).get("q");

  const handleSearch = useCallback(async (search) => {
    // Search saved records
    const hasUserDetails = getUserData(search);
    if (hasUserDetails) {
      setFlag(true);

      setData(hasUserDetails.details);
      setRepos(hasUserDetails.repos);
      return;
    }

    // Loading user details
    const userDetails = await getUserDetailsAPI(search);

    if (!userDetails.login) {
      setFlag(false);
      return alert("No User found");
    }

    setData(userDetails || {});
    setFlag(true);

    // Loading user repos
    const userRepos = await getUserReposAPI(search);
    setRepos(userRepos || []);

    // Loading user followers
    const userFollowers = await getUserFollowers(search);
    saveUserData(userDetails, userRepos, userFollowers);
  }, []);

  useEffect(() => {
    if (!name) return;
    handleSearch(name);
  }, [name, handleSearch]);

  return (
    <>
      <div className="firstPageDiv">
        <input
          id="input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ border: "1px solid #b7b6b6", paddingLeft: "10px" }}
          placeholder="Enter GitHub Id . . . "
        />
        <button onClick={() => handleSearch(inputText)}>Search</button>
      </div>

      {flag == true ? (
        <div id="user-content">
          <div>
            <UserDetails data={data} />
          </div>
          <hr />
          <h4 style={{ paddingLeft: "50px" }}>Repositories</h4>
          <div className="parent-repo">
            <RepoList repos={repos} />
          </div>
        </div>
      ) : null}
    </>
  );
}
export default MainPage;
