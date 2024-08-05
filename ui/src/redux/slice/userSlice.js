import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../apis/Axios";
const infoUser = JSON.parse(localStorage.getItem("infoUser"));
export const loginAction = createAsyncThunk(
  "user/login",
  async (datas, thunkApi) => {
    try {
      const response = await Axios.post("/users/login", datas);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const registerAction = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const response = await Axios.post("/users/register", data);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const updateAction = createAsyncThunk(
  "user/update",
  async (data, thunkApi) => {
    try {
      const response = await Axios.put("/users", data, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const deleteAction = createAsyncThunk(
  "user/delete",
  async (_, thunkApi) => {
    try {
      const response = await Axios.delete("/users", {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const changePassAction = createAsyncThunk(
  "user/changePass",
  async (datas, thunkApi) => {
    try {
      const response = await Axios.put("/users/password", datas, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const deleteAllFavoriteMoviesAction = createAsyncThunk(
  "user/deleteFavorites",
  async (_, thunkApi) => {
    try {
      const response = await Axios.delete("/users/favorites", {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const deleteUserByIdAction = createAsyncThunk(
  "user/deleteById",
  async (id, thunkApi) => {
    try {
      const response = await Axios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.message);
    }
  },
);
export const deleteFavoriteMovieByIdAction = createAsyncThunk(
  "user/deleteFaById",
  async (movieId, thunkApi) => {
    try {
      const response = await Axios.delete(`/users/favorite/${movieId}`, {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getAllUsersAction = createAsyncThunk(
  "user/users",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get("/users/", {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getFavoriteMoviesAction = createAsyncThunk(
  "user/favorites",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get("/users/favorites", {
        headers: {
          Authorization: `Bearer ${infoUser.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const addFavoriteMovieAction = createAsyncThunk(
  "user/addFavorite",
  async (movieId, thunkApi) => {
    try {
      const response = await Axios.post(
        `/users/favorites`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${infoUser.token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    isDeleting: false,
    isAddFavoriting: false,
    favoritedMovies: JSON.parse(localStorage.getItem("favoritedMovies")) || [],
  },
  reducers: {
    logoutAction: (state) => {
      localStorage.removeItem("infoUser");
      localStorage.removeItem("favoritedMovies");
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteAction.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteAction.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(getFavoriteMoviesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoriteMoviesAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getFavoriteMoviesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUsersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUsersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserByIdAction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteUserByIdAction.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteUserByIdAction.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteFavoriteMovieByIdAction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteFavoriteMovieByIdAction.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteFavoriteMovieByIdAction.rejected, (state) => {
        state.isDeleting = false;
      })
      .addCase(addFavoriteMovieAction.pending, (state) => {
        state.isAddFavoriting = true;
        state.isLoading = true;
      })
      .addCase(addFavoriteMovieAction.fulfilled, (state) => {
        state.isAddFavoriting = false;
        state.isLoading = false;
      })
      .addCase(addFavoriteMovieAction.rejected, (state) => {
        state.isAddFavoriting = false;
        state.isLoading = false;
      });
  },
});

export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;
