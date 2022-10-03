import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import { getAPI } from "./network";
import RepoList from "./RepoList/RepoList";
import UserDetails from "./UserDetails";

function MainPage() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);

  const search = useLocation().search;
  const name = new URLSearchParams(search).get("q");

  useEffect(() => {
    (async () => {
      if (name === null) {
        return;
      }
      document.getElementById("user-content").style.display = "block";

      const userDetails = await getAPI(`https://api.github.com/users/${name}`);
      const userRepos = await getAPI(
        `https://api.github.com/users/${name}/repos`
      );
      console.log({ name }, { userDetails }, { userRepos });
      setData(userDetails || {});
      setRepos(userRepos || []);
    })();
  }, []);

  async function handleSearch() {
    document.getElementById("user-content").style.display = "block";

    const userDetails = await getAPI(
      `https://api.github.com/users/${inputText}`
    );
    const userRepos = await getAPI(
      `https://api.github.com/users/${inputText}/repos`
    );
    setData(userDetails || {});
    setRepos(userRepos || []);
  }

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
        <button onClick={handleSearch}>Search</button>
      </div>

      <div id="user-content" style={{ display: "none" }}>
        <div>
          <UserDetails data={data} />
        </div>
        <hr />
        <h4 style={{ paddingLeft: "50px" }}>Repositories</h4>
        <div className="parent-repo">
          <RepoList repos={repos} />
        </div>
      </div>
    </>
  );
}
export default MainPage;
