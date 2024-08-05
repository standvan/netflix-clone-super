import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../apis/Axios";

const infoUser = JSON.parse(localStorage.getItem("infoUser"));

export const getAllCategoryAction = createAsyncThunk(
  "category/all",
  async (_, thunkApi) => {
    try {
      const response = await Axios.get("/category");
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
export const createCategoryAction = createAsyncThunk(
  "/category/create",
  async (data, thunkApi) => {
    try {
      const response = await Axios.post("/category", data, {
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
export const editCategoryAction = createAsyncThunk(
  "category/edit",
  async (data, thunkApi) => {
    try {
      const response = await Axios.put(
        `/category/${data.id}`,
        {
          title: data.title,
        },
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
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, thunkApi) => {
    try {
      const response = await Axios.delete(`category/${id}`, {
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
const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    isCreating: false,
    isEditing: false,
    isDeleting: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCategoryAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.isCreating = true;
      })
      .addCase(createCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isCreating = false;
      })
      .addCase(createCategoryAction.rejected, (state) => {
        state.isLoading = false;
        state.isCreating = false;
      })
      .addCase(editCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.isEditing = true;
      })
      .addCase(editCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isEditing = false;
      })
      .addCase(editCategoryAction.rejected, (state) => {
        state.isLoading = false;
        state.isEditing = false;
      })
      .addCase(deleteCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.isDeleting = true;
      })
      .addCase(deleteCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleting = false;
      })
      .addCase(deleteCategoryAction.rejected, (state) => {
        state.isLoading = false;
        state.isDeleting = false;
      });
  },
});

export default categorySlice.reducer;
