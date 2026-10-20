import { getAccessToken } from "../auth/cognito.js";

const API_URL =
  "https://bghmqh1k5h.execute-api.ap-south-1.amazonaws.com";

export async function apiRequest(path, options = {}) {
  let token;

  try {
    token = await getAccessToken();
  } catch {
    throw new Error("Your session has expired. Log out and log in again.");
  }

  const method = options.method ?? "GET";
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const request = {
    method,
    headers,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(options.body);
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, request);
  } catch {
    throw new Error(
      method === "POST"
        ? "Could not confirm the trade result. Check Orders and your wallet before trying again."
        : "Could not reach the API. Check your internet connection and try again."
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      method === "POST"
        ? "The API returned an unreadable response. Check Orders before repeating the trade."
        : "The API returned an unreadable response."
    );
  }

  if (!response.ok) {
    if (response.status >= 500 && method === "POST") {
      throw new Error(
        "The server reported an error. Check Orders and your wallet before repeating the trade."
      );
    }

    throw new Error(
      data.error ??
        data.message ??
        `Request failed with status ${response.status}`
    );
  }

  return data;
}