import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  currentStock: null,
  loading: false,
  error: null
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setStocks: (state, action) => {
      state.stocks = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentStock: (state, action) => {
      state.currentStock = action.payload;
      state.loading = false;
      state.error = null;
    },
    addStock: (state, action) => {
      state.stocks.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateStock: (state, action) => {
      const index = state.stocks.findIndex(stock => stock._id === action.payload._id);
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
      state.currentStock = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeStock: (state, action) => {
      state.stocks = state.stocks.filter(stock => stock._id !== action.payload);
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  setStocks,
  setCurrentStock,
  addStock,
  updateStock,
  removeStock
} = stockSlice.actions;

export default stockSlice.reducer;