const BASEURL = (path = "") => `https://circles.now.sh/api/users/${path}`;

export const createUser = (data) => {
  return fetch(BASEURL("create"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const login = (data) => {
  return fetch(BASEURL("login"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}