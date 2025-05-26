import { AuthHeaders } from "./types";

// Get the authorization header for API requests
export const getHeaderAuthorization = () => {
  const headers: AuthHeaders = {
    Authorization: "",
  };

  if (localStorage.getItem("access")) {
    headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  return headers;
};
