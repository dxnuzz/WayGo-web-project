const getApiBaseUrl = () => {
  if (import.meta.env && import.meta.env.VITE_API_BASE_URL)
    return import.meta.env.VITE_API_BASE_URL;
  const host = window.location.hostname || "localhost";
  const port = window.location.port;
  if (port && port !== "80" && port !== "8080")
    return `http://${host}/WayGo-web-project/backend/api`;
  return `${window.location.origin}/WayGo-web-project/backend/api`;
};

export const API_BASE_URL = getApiBaseUrl();
export default API_BASE_URL;
