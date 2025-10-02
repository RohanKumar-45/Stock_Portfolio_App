import axios from 'axios';
import {
  setLoading,
  setError,
  setStocks,
  setCurrentStock,
  addStock,
  updateStock,
  removeStock
} from './stockSlice';

const API_URL = '/api/stocks';

export const fetchStocks = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(API_URL);
    dispatch(setStocks(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error fetching stocks'));
  }
};

export const fetchStockById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch(setCurrentStock(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error fetching stock'));
  }
};

export const createStock = (stockData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(API_URL, stockData);
    dispatch(addStock(response.data));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error creating stock'));
    throw error;
  }
};

export const updateStockById = (id, stockData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(`${API_URL}/${id}`, stockData);
    dispatch(updateStock(response.data));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error updating stock'));
    throw error;
  }
};

export const deleteStock = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`${API_URL}/${id}`);
    dispatch(removeStock(id));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error deleting stock'));
    throw error;
  }
};