const API_URL = "http://localhost:3000";

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return true;
  return response.json();
}

export const getData = (resource) =>
  request(`${API_URL}/${resource}`);

export const getById = (resource, id) =>
  request(`${API_URL}/${resource}/${id}`);

export const addData = (resource, data) =>
  request(`${API_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const updateData = (resource, id, data) =>
  request(`${API_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const deleteData = (resource, id) =>
  request(`${API_URL}/${resource}/${id}`, {
    method: "DELETE"
  });