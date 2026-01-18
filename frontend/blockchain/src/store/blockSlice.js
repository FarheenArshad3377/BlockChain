import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all blocks
export const fetchBlocks = createAsyncThunk(
  "blocks/fetchBlocks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5030/api/block");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Fetch failed" });
    }
  }
);

const blockSlice = createSlice({
  name: "blocks",
  initialState: {
    blocks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks = action.payload;
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed";
      });
  },
});

export default blockSlice.reducer;
