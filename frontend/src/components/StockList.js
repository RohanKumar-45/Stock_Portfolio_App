import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStocks } from '../redux/actions';

function StockList() {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const calculateProfitLoss = (stock) => {
    const profitLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
    return profitLoss.toFixed(2);
  };

  const calculateProfitLossPercent = (stock) => {
    const percent = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
    return percent.toFixed(2);
  };

  const calculatePortfolioStats = () => {
    const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.buyPrice * stock.quantity), 0);
    const currentValue = stocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.quantity), 0);
    const totalProfitLoss = currentValue - totalInvestment;
    const profitLossPercent = totalInvestment > 0 ? ((totalProfitLoss / totalInvestment) * 100) : 0;

    return {
      totalInvestment: totalInvestment.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalProfitLoss: totalProfitLoss.toFixed(2),
      profitLossPercent: profitLossPercent.toFixed(2),
      totalStocks: stocks.length
    };
  };

  if (loading) {
    return <div className="loading">Loading stocks...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const stats = calculatePortfolioStats();

  return (
    <div className="stock-list">
      <h2>My Portfolio</h2>
      
      {stocks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h3>No stocks in your portfolio yet</h3>
          <p>Start building your portfolio by adding your first stock</p>
          <Link to="/add" className="add-first-stock">Add Your First Stock</Link>
        </div>
      ) : (
        <>
          <div className="portfolio-stats">
            <div className="stat-card">
              <div className="stat-label">Total Stocks</div>
              <div className="stat-value">{stats.totalStocks}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Investment</div>
              <div className="stat-value">${stats.totalInvestment}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Current Value</div>
              <div className="stat-value">${stats.currentValue}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total P/L</div>
              <div className="stat-value">
                ${stats.totalProfitLoss} ({stats.profitLossPercent}%)
              </div>
            </div>
          </div>

          <table className="stock-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Quantity</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>P/L Amount</th>
                <th>P/L %</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const pl = calculateProfitLoss(stock);
                const plPercent = calculateProfitLossPercent(stock);
                return (
                  <tr key={stock._id}>
                    <td><span className="stock-symbol">{stock.symbol}</span></td>
                    <td>{stock.companyName}</td>
                    <td>{stock.quantity}</td>
                    <td>${stock.buyPrice}</td>
                    <td>${stock.currentPrice}</td>
                    <td>
                      <span className={`profit-badge ${pl >= 0 ? 'positive' : 'negative'}`}>
                        ${pl}
                      </span>
                    </td>
                    <td>
                      <span className={`profit-badge ${plPercent >= 0 ? 'positive' : 'negative'}`}>
                        {plPercent}%
                      </span>
                    </td>
                    <td>
                      <Link to={`/stock/${stock._id}`}>View Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default StockList;