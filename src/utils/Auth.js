import { request, baseUrl } from "./Api";

export const register = ({ name, dob, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, dob, email, password }),
  });
};

export const logIn = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const editProfile = ({ name, dob }) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, dob }),
  });
};

export const checkToken = () => {
  const jwt = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
};
