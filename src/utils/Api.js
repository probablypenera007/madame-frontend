export const baseUrl =
  // process.env.NODE_ENV === "production"
  // ? "https://api.isitrainingoutside.jumpingcrab.com"
  // :
  "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getUserReadings() {
  return request(`${baseUrl}/readings`, {
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    // body: JSON.stringify(),
  });
}

export function saveReading(reading, token) {
  console.log("Saving reading:", reading); 
  return request(`${baseUrl}/readings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(reading),
  });
}

export function updateReadingTitle(readingId, title, token) {
  return request(`${baseUrl}/readings/${readingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ title }),
  });
}

export function deleteReading(readingId, token) {
  return request(`${baseUrl}/readings/${readingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
}

