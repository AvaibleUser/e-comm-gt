import axios from "axios";
import { Card, User } from "e-comm-gt-api";

const baseUrl = "/api/user";

export function getPathToRedirect() {
  try {
    const user = getUser();
    const type = user?.userType;
    if (type) {
      return `/${type.toLocaleLowerCase()}`;
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

  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

export async function addCardToUser(user: User, card: Card) {
  const { data } = await axios.post<User>(`${baseUrl}/${user.username}/card`, {
    ...card,
  });

  return data;
}

export async function register(user: User) {
  const { data } = await axios.post<User>(`${baseUrl}/employee`, {
    user,
    admin: getUser(),
  });

  return data;
}

export async function update(user: User) {
  const { data } = await axios.put<User>(`${baseUrl}/employee`, {
    user,
    admin: getUser(),
  });

  return data;
}

export async function findUser(username: string) {
  const { data } = await axios.get<User>(`${baseUrl}/${username}`);

  return data;
}

export async function findUsers() {
  const { data } = await axios.get<User[]>(`${baseUrl}/`);

  return data;
}

export function getUser(): User {
  return JSON.parse(localStorage.getItem("user") || "{}");
}
