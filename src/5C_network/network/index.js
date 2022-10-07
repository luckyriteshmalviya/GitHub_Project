import axios from "axios";
export const getAPI = async (url) => {
  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  } catch (error) {
    return false;
  }
};
