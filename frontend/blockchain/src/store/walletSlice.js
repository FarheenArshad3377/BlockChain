import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch wallets
export const fetchWallets = createAsyncThunk(
  "wallet/fetchWallets",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5030/api/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.wallets;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async ({ user_id }, { rejectWithValue }) => {  // ✅ remove balance
    try {
      const res = await axios.post("http://localhost:5030/api/wallet", { user_id });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to create wallet" });
    }
  }
);





const walletSlice = createSlice({
  name: "wallet",
  initialState: { wallets: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch wallets";
      })

      .addCase(createWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets.push(action.payload);
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Wallet creation failed";
      });
  },
});

export default walletSlice.reducer;
