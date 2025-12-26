// src/services/api.js
const BASE_URL = "https://your-api.com";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return response.json();
}
