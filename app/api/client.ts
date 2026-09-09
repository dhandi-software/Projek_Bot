import axios from "axios";

const getEnvUrl = () => {
    if (typeof window === "undefined" && typeof process !== "undefined" && process?.env?.INTERNAL_API_URL) {
        return process.env.INTERNAL_API_URL;
    }
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl && !envUrl.includes("141.11.190.106")) {
        return envUrl;
    }
    if (typeof window !== "undefined") {
        return `http://${window.location.hostname}:8000`;
    }
    return "http://localhost:8000";
};

const envUrl = getEnvUrl();
const baseUrl = envUrl.replace(/\/$/, "");

// Use '/api' prefix
export const API_URL = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

export const UPLOADS_URL = baseUrl || "http://localhost:5002";

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized request - JWT might be expired");
        }
        return Promise.reject(error);
    }
);
