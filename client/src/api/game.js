const BASEURL = (path = "") => `https://circles.now.sh/api/games/${path}`;

export const createGame = (data) => {
  return fetch(BASEURL("create"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}