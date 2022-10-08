import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserData,
  getUserDetailsAPI,
  getUserFollowers,
  getUserReposAPI,
  saveUserData,
} from "./gitHub";

function Followers() {
  const { userName } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    const userDetails = getUserData(userName);
    if (userDetails) {
      setList(userDetails?.followers || []);
      return;
    }

    handleSearch(userName);
  }, [userName]);

  const handleSearch = useCallback(async (search) => {
    const userFollowers = await getUserFollowers(search);
    setList(userFollowers);

    const userDetails = await getUserDetailsAPI(search);
    const userRepos = await getUserReposAPI(search);
    saveUserData(userDetails, userRepos, userFollowers);
  }, []);

  return (
    <>
      <Link to={`/?q=${userName}`}>
        <button>Go Back to Home</button>
      </Link>
      <br />
      <br />
      <h3>List of Followers</h3>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
        }}
      >
        {list.map((item, index) => {
          return (
            <Link
              to={`/?q=${item.login}`}
              key={index}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div
                style={{
                  margin: "10px",
                  backgroundColor: "#ebebeb",
                  borderRadius: "6px",
                  padding: "14px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <div>
                  <img width="90px" src={item.avatar_url} alt="image" />
                </div>
                <div>
                  <h6>{item.login}</h6>
                  <br />
                  <p style={{ color: "blue", textDecoration: "underline" }}>
                    {item.url}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Followers;
