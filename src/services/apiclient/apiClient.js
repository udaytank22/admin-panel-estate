import axios from "axios";
import axiosRetry from "axios-retry";
import { API_ENDPOINTS } from "./apiEndpoints";


const API_BASEURL = "https://api.estatefacility.com/api/v1";

const PUBLIC_API_ROUTES = [
  API_ENDPOINTS.AUTH.EMAIL_LOGIN,
  API_ENDPOINTS.AUTH.MOBILE_OTP,
  API_ENDPOINTS.AUTH.OTP_VERIFY,
  API_ENDPOINTS.AUTH.REFRESH_TOKEN,
];

// Axios Instance
const apiClient = axios.create({
  baseURL: API_BASEURL,
  timeout: 1200000 * 10,
  headers: {
    Accept: "application/json",
  },
});

// Retry failed network calls
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: retryCount => axiosRetry.exponentialDelay(retryCount),
  retryCondition: error => axiosRetry.isNetworkError(error),
  shouldResetTimeout: true,
});

// Refresh Queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// Refresh token function
const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(
      `${API_BASEURL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const { access } = response.data;

    sessionStorage.setItem("userToken", access);

    return access;
  } catch (error) {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userInfo");
    throw error;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    console.log('config', config)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (config.url && !PUBLIC_API_ROUTES.includes(config.url)) {
      const token = sessionStorage.getItem('userToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    console.log('config', config)
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log('response', originalRequest)

    // Handle 401 Auth Error
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (PUBLIC_API_ROUTES.includes(originalRequest.url)) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();

        isRefreshing = false;
        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        console.error("Token refresh failed. Redirecting to login...");
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // Other status code errors
    return Promise.reject(error);
  }
);

// === API Helper Methods ===
export const apiGet = async (url, params = {}) =>
  (await apiClient.get(url, { params })).data;

export const apiPost = async (url, data) => {
  console.log('url', url)
  console.log('data', data)
  const isFormData = data instanceof FormData;

  return apiClient.post(url, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
    transformRequest: isFormData ? [(d) => d] : undefined
  });
};

export const apiPut = async (url, data) => {
  const isFormData = data instanceof FormData;

  return apiClient.put(url, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
    transformRequest: isFormData ? [(d) => d] : undefined
  });
};

export const apiDelete = async url =>
  await apiClient.delete(url);

export const apiPatch = async (url, data = {}) =>
  await apiClient.patch(url, data);

// Manual refresh
export const manualRefreshToken = async () => {
  try {
    await refreshAccessToken();
    return true;
  } catch {
    return false;
  }
};

// Token helpers
export const saveAuthToken = token => {
  console.log('usertoken save', token)
  sessionStorage.setItem("userToken", token)
}

export const saveRefreshToken = token =>
  sessionStorage.setItem("refreshToken", token);

export const clearAuthToken = () => {
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("userInfo");
};

export const getToken = () => {
  return sessionStorage.getItem("userToken");
};

export const logout = () => {
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("userInfo");

  window.location.href = "/login";
};


export default apiClient;
