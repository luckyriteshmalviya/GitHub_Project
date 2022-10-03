import { Link } from "react-router-dom";
import "./MainPage.css";

function UserDetails({ data }) {
  return (
    <div className="user-detail" style={{ margin: "4rem" }}>
      <div>
        <div>
          <img width="130px" src={data.avatar_url} alt="user-image" />
        </div>

        <div style={{ marginTop: "5px" }}>
          <h4>{data.name}</h4>
        </div>
      </div>
      <div>
        <div style={{ width: "500px" }}>{data.bio}</div>
        <div>
          <b>{data.company}</b>
        </div>
        <br />
        <Link to={`/followers/${data.login}`}>
          <button> {data.followers} Followers</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;
