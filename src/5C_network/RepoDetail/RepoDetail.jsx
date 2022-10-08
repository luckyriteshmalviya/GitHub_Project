import { useEffect, useState } from "react";
import "./RepoDetail.css";
import { Link, useParams } from "react-router-dom";
import { getUserData } from "../gitHub";

function RepoDetail() {
  const { userId, repoId } = useParams();
  const [repo, setRepo] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const userDetails = getUserData(userId);
    if (!userDetails) return;

    setUserName(userDetails?.details?.name);

    const repoDetails = userDetails.repos.find(
      (item) => item.name.toLowerCase() === repoId.toLowerCase()
    );
    setRepo(repoDetails);
  }, [userId, repoId]);

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
            {username}
          </p>
          <p>
            <b>Description : </b>
            {repo.description}
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
