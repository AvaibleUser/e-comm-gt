import axios from "axios";
import { User, UserType } from "e-comm-gt-api";

const baseUrl = "/api/";

export function getPathToRedirect() {
  try {
    const user = getUser();

    if (user && "userType" in user && user.userType in UserType) {
      return `/${user.userType.toLocaleLowerCase()}`;
    }
  } catch (e: unknown) {}
  return "/login";
}

export function logout() {
  localStorage.removeItem("user");
}

export async function login(username: string, password: string) {
  const { data } = await axios.post<User>(`${baseUrl}/login`, {
    username,
    password,
  });

  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

export async function signUp(user: User) {
  const { data } = await axios.post<User>(`${baseUrl}/seller`, user);

  return data;
}

export async function register(user: User) {
  const { data } = await axios.post<User>(`${baseUrl}/employee`, {
    user,
    admin: getUser(),
  });

  return data;
}

export function getUser(): User {
  return JSON.parse(localStorage.getItem("user") || "{}");
}
