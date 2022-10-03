import { useEffect, useState } from "react";
import "./RepoDetail.css";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../network";

function RepoDetail() {
  const { userId, repoId } = useParams();
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    (async () => {
      const userDetails = await getAPI(
        `https://api.github.com/repos/${userId}/${repoId}`
      );

      setRepo(userDetails || {});
    })();
  }, []);
  return (
    <>
      <div className="repoDetail">
        <div style={{ width: "280px" }}>
          <div className="userImage">
            <img width="100px" src={repo?.owner?.avatar_url} />
          </div>
          <h5>Verified by GitHub</h5>
          <p>
            Github confirms that this apps meets the requirement for minimum
            verification
          </p>
        </div>
        <div>
          <h3>Name - {repo.name}</h3>
          <button style={{ backgroundColor: "green", color: "white" }}>
            Set up a Plan
          </button>
          <p
            style={{
              textalign: "left",
            }}
          >
            <b>Full Name : </b>
            {repo.full_name}
          </p>
          <p>
            <b>Description : </b>
            {repo.description}
          </p>
          <p>
            <b>Visibility : </b>
            {repo.visibility}
          </p>
          <p>
            <b>Language : </b>
            {repo.language}
          </p>
        </div>
      </div>
      <Link to={`/?q=${userId}`}>
        <button>Go Back to Home</button>
      </Link>
    </>
  );
}

export default RepoDetail;
