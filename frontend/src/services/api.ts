import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Attach JWT Token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const sendOtp = (email: string) => API.post("/auth/send-otp", { email });
export const verifyOtp = (name: string, email: string, otp: string) =>
  API.post("/auth/verify-otp", { name, email, otp });

export const getNotes = () => API.get("/notes");
export const createNote = (title: string, content: string) => API.post("/notes", { title, content });
export const deleteNote = (id: string) => API.delete(`/notes/${id}`);
