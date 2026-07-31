// Central place for all backend API calls.
// Base URL comes from .env (VITE_API_URL). Falls back to local backend.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function authHeaders(token) {
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

export const api = {
  // ---- AUTH ----
  signup: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(res);
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  // ---- POSTS ----
  getPosts: async () => {
    const res = await fetch(`${API_URL}/posts`);
    return handleResponse(res);
  },

  createPost: async (token, post) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(post),
    });
    return handleResponse(res);
  },

  toggleLike: async (token, postId) => {
    const res = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: "POST",
      headers: authHeaders(token),
    });
    return handleResponse(res);
  },

  addComment: async (token, postId, text) => {
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ text }),
    });
    return handleResponse(res);
  },
};
