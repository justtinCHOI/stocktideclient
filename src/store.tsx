import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import companyIdSlice from "./slices/companyIdSlice";
import loginSlice from "./slices/loginSlice";
import cashSlice from "./slices/cashSlice";
import stockOrderTypeSlice from "./slices/stockOrderTypeSlice";
import stockOrderPriceSlice from "./slices/stockOrderPriceSlice";
import stockOrderVolumeSlice from "./slices/stockOrderVolumeSlice";
import decisionWindowSlice from "./slices/decisionWindowSlice";
import compareIdSlice from "./slices/companyIdSlice";

export const store = configureStore({
  reducer: {
    companyIdSlice,
    loginSlice,
    cashSlice,
    stockOrderTypeSlice,
    stockOrderPriceSlice,
    stockOrderVolumeSlice,
    decisionWindowSlice,
    compareIdSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
  RootState,
  unknown,
Action<string>
>;

export default store;