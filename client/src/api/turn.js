const BASEURL = (path = "") => `https://circles.now.sh/api/games/turns/${path}`;

export const createTurn = (data) => {
  return fetch(BASEURL("create"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getGameStats = (data) => {
  console.log(data)
  return fetch(BASEURL("stats"), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}