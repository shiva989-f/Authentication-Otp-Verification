import { create } from "zustand";
import axios from "axios";
import { errorMessage, successMessage } from "../Utils/HandleToast";

const API_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true; // Include cookies automatically with every request

// Zustand faster and more lightweight alternative to Redux for state management.
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  clearError: () => set({ error: null }), // For clearing error

  // Calling signup api here
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        name,
      });
      successMessage(response.data.message);
      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },

  // Calling verify email api here
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, {
        code,
      });
      successMessage(response.data.message);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying your OTP",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },

  // Calling login api here
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      successMessage(response.data.message);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging up",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },

  // Calling logout api here
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/logout`);
      successMessage(response.data.message);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error while reset your password",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // Calling forgot password api here
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      successMessage(response.data.message);
      set({ isLoading: false });
    } catch (error) {
      set({
        error:
          error.response.data.message || "Error sending reset password email",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },

  // Calling reset password api here
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password }
      );
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error while reset your password",
        isLoading: false,
      });
      errorMessage(error.response.data.message);
      throw error;
    }
  },
}));
