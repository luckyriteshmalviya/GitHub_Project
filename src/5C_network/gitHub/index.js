import { getAPI } from "../network";

export const getUserData = (name) => {
  const availableData = JSON.parse(localStorage.getItem("user")) || [];

  const hasRecord = availableData.find(
    (item) => name.toLowerCase() === item.loginId.toLowerCase()
  );
  if (!hasRecord) {
    return null;
  }
  return hasRecord;
};

export const getUserDetailsAPI = async (name) => {
  try {
    const userDetails = await getAPI(`https://api.github.com/users/${name}`);
    return userDetails;
  } catch (error) {
    return null;
  }
};

export const getUserReposAPI = async (name) => {
  try {
    const Repos = await getAPI(`https://api.github.com/users/${name}/repos`);
    let userRepos = [];
    for (let i = 0; i < Repos.length; i++) {
      let ReposDetails = {
        name: Repos[i]?.name,
        description: Repos[i]?.description,
        owner: {
          avatar_url: Repos[i]?.owner?.avatar_url,
          login: Repos[i]?.owner?.login,
        },
      };
      userRepos.push(ReposDetails);
    }
    return userRepos;
  } catch (error) {
    return null;
  }
};

export const getUserFollowers = async (name) => {
  try {
    const Followers = await getAPI(
      `https://api.github.com/users/${name}/followers`
    );
    let userFollowers = [];
    for (let i = 0; i < Followers.length; i++) {
      let followerDetails = {
        avatar_url: Followers[i]?.avatar_url,
        url: Followers[i]?.url,
        name: Followers[i]?.name,
        login: Followers[i]?.login,
      };
      userFollowers.push(followerDetails);
    }
    return userFollowers;
  } catch (error) {
    return null;
  }
};

export const saveUserData = (userDetails, userRepos, userFollowers) => {
  const savedRecord = JSON.parse(localStorage.getItem("user")) || [];
  const hasRecord = savedRecord.some(
    (item) => item.loginId.toLowerCase() === userDetails.login.toLowerCase()
  );
  if (hasRecord) return;

  savedRecord.push({
    loginId: userDetails.login,
    details: {
      name: userDetails?.name,
      avatar_url: userDetails?.avatar_url,
      comapny: userDetails?.comapny,
      followers: userDetails?.followers,
      bio: userDetails?.bio,
      login: userDetails?.login,
    },
    repos: userRepos,
    followers: userFollowers,
  });
  localStorage.setItem("user", JSON.stringify(savedRecord));
};
