import { baseURL } from "@/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loggedInUsers: [],
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      `${baseURL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(`${baseURL}/api/auth/login`, formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      `${baseURL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(`${baseURL}/api/auth/check-auth`, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    return response.data;
  }
);

export const getLoggedInUsers = createAsyncThunk(
  "/admin/logged-in-users",
  async () => {
    const response = await axios.get(`${baseURL}/api/admin/logged-in-users`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getLoggedInUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUsers = action.payload.success
          ? action.payload.users
          : [];
      })
      .addCase(getLoggedInUsers.rejected, (state) => {
        state.isLoading = false;
        state.loggedInUsers = [];
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
