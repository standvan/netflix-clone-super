import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../apis/Axios";
const infoUser = JSON.parse(localStorage.getItem("infoUser"));

export const getAllMoviesByQueryAction = createAsyncThunk(
  "movie/all",
  async (query, thunkApi) => {
    try {
      const response = await Axios.get(
        `/movies/?pageNumber=${query.pageNumber}&category=${query.category}&language=${query.language}&time=${query.time}&year=${query.year}&search=${query.search}`,
      );
      //?pageNumber=${query.pageNumber}&category=${query.category}&language=${query.language}&time=${query.time}&year=${query.year}&search=${query.search}}
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getAllLanguageAction = createAsyncThunk(
  "/movies/language",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get("/movies/language");
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getAllYearAction = createAsyncThunk(
  "/movies/year",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get("/movies/year");
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getMovieByIdAction = createAsyncThunk(
  "movie/id",
  async (id, thunkApi) => {
    try {
      const response = await Axios.get(`/movies/find/${id}`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const addMovieAction = createAsyncThunk(
  "movie/add",
  async (datas, thunkApi) => {
    try {
      const response = await Axios.post("/movies/create", datas);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const updateMovieAction = createAsyncThunk(
  "movie/update",
  async (datas, thunkApi) => {
    try {
      const response = await Axios.put(`/movies/${datas.id}`, datas, {
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
export const deleteMovieByIdAction = createAsyncThunk(
  "movie/deleteId",
  async (id, thunkApi) => {
    try {
      const response = await Axios.delete(`/movies/${id}`, {
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
export const createMovieReviewAction = createAsyncThunk(
  "movie/review",
  async (datas, thunkApi) => {
    try {
      const response = await Axios.post(`/movies/${datas.id}/review`, datas, {
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
export const getRandomMoviesAction = createAsyncThunk(
  "movie/random",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get(`/movies/random`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const getMoviesRated = createAsyncThunk(
  "movie/rated",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get(`/movies/rated`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
    isReviewing: false,
    isRandom: false,
    isRated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMoviesByQueryAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMoviesByQueryAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllMoviesByQueryAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMovieByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieByIdAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMovieByIdAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addMovieAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovieAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMovieAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMovieByIdAction.pending, (state) => {
        state.isLoading = true;
        state.isDeleting = true;
      })
      .addCase(deleteMovieByIdAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleting = false;
      })
      .addCase(deleteMovieByIdAction.rejected, (state) => {
        state.isLoading = false;
        state.isDeleting = false;
      })
      .addCase(updateMovieAction.pending, (state) => {
        state.isUpdating = true;
        state.isLoading = true;
      })
      .addCase(updateMovieAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isUpdating = false;
      })
      .addCase(updateMovieAction.rejected, (state) => {
        state.isLoading = false;
        state.isUpdating = false;
      })
      .addCase(createMovieReviewAction.pending, (state) => {
        state.isReviewing = true;
      })
      .addCase(createMovieReviewAction.fulfilled, (state) => {
        state.isReviewing = false;
      })
      .addCase(createMovieReviewAction.rejected, (state) => {
        state.isReviewing = false;
      })
      .addCase(getRandomMoviesAction.pending, (state) => {
        state.isRandom = true;
      })
      .addCase(getRandomMoviesAction.fulfilled, (state) => {
        state.isRandom = false;
      })
      .addCase(getRandomMoviesAction.rejected, (state) => {
        state.isRandom = false;
      })
      .addCase(getMoviesRated.pending, (state) => {
        state.isRated = true;
      })
      .addCase(getMoviesRated.fulfilled, (state) => {
        state.isRated = false;
      })
      .addCase(getMoviesRated.rejected, (state) => {
        state.isRated = false;
      });
  },
});

export default movieSlice.reducer;
