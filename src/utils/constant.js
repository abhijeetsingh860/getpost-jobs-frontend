// Base API URL with fallback to production backend
const API_ROOT = import.meta.env.VITE_API_URL || "https://getpost-jobs-backend.onrender.com";
const BASE_API_URL = `${API_ROOT.replace(/\/$/, "")}/api/v1`;

export const USER_API_END_POINT = `${BASE_API_URL}/user`;
export const JOB_API_END_POINT = `${BASE_API_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_API_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_API_URL}/company`;
