import { AuthHeaders } from "./types";

export const getHeaderAuthorization = () => {
  const headers: AuthHeaders = {
    Authorization: "",
  };

  if (localStorage.getItem("access")) {
    headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  return headers;
};
