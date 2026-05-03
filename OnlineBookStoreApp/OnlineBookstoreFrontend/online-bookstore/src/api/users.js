import api from "./axiosInstance";

export const registerUser = (data) => api.post("/api/users/register", data);
export const getMyProfile = () => api.get("/api/users/me");
export const updateProfile = (data) => api.put("/api/users/profile", data);
export const getMyOrders = () => api.get("/api/users/orders");