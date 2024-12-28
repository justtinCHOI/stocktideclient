import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import companyIdSlice from "./slices/companyIdSlice";
import memberReducer from "@slices/memberSlice";
import cashSlice from "./slices/cashSlice";
import stockOrderTypeSlice from "./slices/stockOrderTypeSlice";
import stockOrderPriceSlice from "./slices/stockOrderPriceSlice";
import stockOrderVolumeSlice from "./slices/stockOrderVolumeSlice";
import decisionWindowSlice from "./slices/decisionWindowSlice";
import compareIdSlice from "./slices/companyIdSlice";
import rootSaga from '@/store/sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    memberSlice: memberReducer,
    cashSlice,
    companyIdSlice,
    stockOrderTypeSlice,
    stockOrderPriceSlice,
    stockOrderVolumeSlice,
    decisionWindowSlice,
    compareIdSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Thunk 비활성화
      serializableCheck: false, // Saga에서 Promise 사용을 위해 비활성화
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;