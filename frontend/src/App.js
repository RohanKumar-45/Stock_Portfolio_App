import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StockList from './components/StockList';
import StockForm from './components/StockForm';
import StockDetail from './components/StockDetail';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<StockList />} />
          <Route path="/add" element={<StockForm />} />
          <Route path="/edit/:id" element={<StockForm />} />
          <Route path="/stock/:id" element={<StockDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;