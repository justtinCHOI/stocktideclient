import { configureStore } from '@reduxjs/toolkit'
import companyIdSlice from "./slices/companyIdSlice.js";
import loginSlice from "./slices/loginSlice.js";
import cashSlice from "./slices/cashSlice.js";
import stockOrderTypeSlice from "./slices/stockOrderTypeSlice.js";
import stockOrderPriceSlice from "./slices/stockOrderPriceSlice.js";
import stockOrderVolumeSlice from "./slices/stockOrderVolumeSlice.js";
import decisionWindowSlice from "./slices/decisionWindowSlice.js";

export default configureStore({
  reducer: {
    companyIdSlice: companyIdSlice,
    loginSlice: loginSlice,
    cashSlice: cashSlice,
    stockOrderTypeSlice: stockOrderTypeSlice,
    stockOrderPriceSlice: stockOrderPriceSlice,
    stockOrderVolumeSlice: stockOrderVolumeSlice,
    decisionWindowSlice: decisionWindowSlice,
  }
})
