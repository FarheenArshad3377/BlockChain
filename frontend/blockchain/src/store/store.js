import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import walletSlice from "./walletSlice";
import transaction from "./transactionSlice";
import blockReducer from "./blockSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletSlice,
   transaction:transaction,
  blocks: blockReducer,
  },
});

export default store;
