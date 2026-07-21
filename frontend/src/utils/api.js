import axios from "axios";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const PROFILE_IMAGE_KEY = "profileImage";
let accessToken = localStorage.getItem(TOKEN_KEY);
let refreshRequest = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setTokens = (token, refreshToken) => {
  accessToken = token;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PROFILE_IMAGE_KEY);
  window.dispatchEvent(new Event("auth:logout"));
};

export const setUserData = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth:updated"));
};

export const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const setProfileImage = (image) => {
  localStorage.setItem(PROFILE_IMAGE_KEY, image);
};

export const getStoredProfileImage = () => {
  return localStorage.getItem(PROFILE_IMAGE_KEY);
};

const refreshAccessToken = async () => {
  if (!refreshRequest) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    refreshRequest = api
      .post("/user/refresh", { refreshToken })
      .then(({ data }) => {
        accessToken = data.token;
        localStorage.setItem(TOKEN_KEY, data.token);
        return data.token;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const isAuthRequest =
      request?.url === "/user/refresh" || request?.url === "/user/login";

    if (error.response?.status !== 401 || !request || request._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      const token = await refreshAccessToken();
      request.headers.Authorization = `Bearer ${token}`;
      return api(request);
    } catch (refreshError) {
      clearTokens();
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(refreshError);
    }
  },
);

export default api;
