import axios from "axios";

export const getAPI = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return false;
  }
};
