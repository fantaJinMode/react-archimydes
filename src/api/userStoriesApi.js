import axios from "axios";
import { BASE_URL } from "../common/constants";
import { getToken } from "../utils/common";

export async function saveUserStoriesAPI(data) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}getStories`;
  const response = await axios.post(url, data, config);
  return response.data;
}

export async function getUserStoriesAPI() {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}getStories`;
  const response = await axios.get(url, config);
  return response.data;
}
