import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStockById, deleteStock } from '../redux/actions';

function StockDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentStock, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStockById(id));
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      try {
        await dispatch(deleteStock(id));
        navigate('/');
      } catch (error) {
        alert('Error deleting stock');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading stock details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!currentStock) {
    return <div className="error">Stock not found</div>;
  }

  const profitLoss = (currentStock.currentPrice - currentStock.buyPrice) * currentStock.quantity;
  const profitLossPercent = ((currentStock.currentPrice - currentStock.buyPrice) / currentStock.buyPrice) * 100;
  const totalInvestment = currentStock.buyPrice * currentStock.quantity;
  const currentValue = currentStock.currentPrice * currentStock.quantity;

  return (
    <div className="stock-detail">
      <h2>Stock Details</h2>
      <div className="detail-row">
        <div className="detail-label">Symbol:</div>
        <div className="detail-value"><strong>{currentStock.symbol}</strong></div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Company Name:</div>
        <div className="detail-value">{currentStock.companyName}</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Quantity:</div>
        <div className="detail-value">{currentStock.quantity} shares</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Buy Price:</div>
        <div className="detail-value">${currentStock.buyPrice}</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Current Price:</div>
        <div className="detail-value">${currentStock.currentPrice}</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Total Investment:</div>
        <div className="detail-value">${totalInvestment.toFixed(2)}</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Current Value:</div>
        <div className="detail-value">${currentValue.toFixed(2)}</div>
      </div>
      <div className="detail-row">
        <div className="detail-label">Profit/Loss:</div>
        <div className={`detail-value ${profitLoss >= 0 ? 'positive' : 'negative'}`}>
          ${profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
        </div>
      </div>
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Stock
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Stock
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}

export default StockDetail;