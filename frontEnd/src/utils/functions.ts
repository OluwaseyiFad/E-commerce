export const getHeaderAuthorization = () => {
  const headers: any = {};

  if (localStorage.getItem("access")) {
    headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  console.log("headers: ", headers);
  return headers;
};
