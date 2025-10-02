import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createStock, updateStockById, fetchStockById } from '../redux/actions';

function StockForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentStock, loading } = useSelector((state) => state.stocks);

  const [formData, setFormData] = useState({
    symbol: '',
    companyName: '',
    quantity: '',
    buyPrice: '',
    currentPrice: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchStockById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && currentStock) {
      setFormData({
        symbol: currentStock.symbol,
        companyName: currentStock.companyName,
        quantity: currentStock.quantity,
        buyPrice: currentStock.buyPrice,
        currentPrice: currentStock.currentPrice
      });
    }
  }, [currentStock, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateStockById(id, formData));
        setMessage('Stock updated successfully!');
      } else {
        await dispatch(createStock(formData));
        setMessage('Stock added successfully!');
        setFormData({
          symbol: '',
          companyName: '',
          quantity: '',
          buyPrice: '',
          currentPrice: ''
        });
      }
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setMessage('Error saving stock. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Stock' : 'Add New Stock'}</h2>
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Stock Symbol</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
            placeholder="e.g., AAPL"
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="e.g., Apple Inc."
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            placeholder="e.g., 10"
          />
        </div>
        <div className="form-group">
          <label>Buy Price ($)</label>
          <input
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="e.g., 150.00"
          />
        </div>
        <div className="form-group">
          <label>Current Price ($)</label>
          <input
            type="number"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="e.g., 155.00"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Stock' : 'Add Stock'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StockForm;