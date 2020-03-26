import axios from "axios";
import { BASE_URL } from "../common/constants";
import { getToken } from "../utils/common";

export async function getProjectListAPI() {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/bids/detail?projectStatus=IN_PROGRESS`;
  console.log("this is config, header with Auth()", config);
  const response = await axios.get(url, config);
  return response.data;
}

export async function getStoryAPI(projectId, sprintId, storyId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprint/${sprintId}/story/${storyId}/details`;
  const response = await axios.get(url, config);
  return response.data;
}


export async function updateExistingBidApi(projectId, sprintId, bidId, payload) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprints/${sprintId}/bids/${bidId}`;
  const response = await axios.put(url, payload, config);
  return response.data;
}

export async function getMyBidSprintListAPI(projectId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}projects/${projectId}/sprint/bid`;
  const response = await axios.get(url, config);
  return response.data;
}

export async function getMyBidUserStoriesAPI(projectId, sprintId) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken()
    }
  };
  let url = `${BASE_URL}/projects/${projectId}/sprint/${sprintId}/bid`;
  console.log("this is config, header with Auth()", config);
  const response = await axios.get(url, config);
  return response.data;
}
