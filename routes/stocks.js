const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// GET all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single stock
router.get('/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE stock
router.post('/', async (req, res) => {
  const stock = new Stock({
    symbol: req.body.symbol,
    companyName: req.body.companyName,
    quantity: req.body.quantity,
    buyPrice: req.body.buyPrice,
    currentPrice: req.body.currentPrice
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE stock
router.put('/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    stock.symbol = req.body.symbol || stock.symbol;
    stock.companyName = req.body.companyName || stock.companyName;
    stock.quantity = req.body.quantity || stock.quantity;
    stock.buyPrice = req.body.buyPrice || stock.buyPrice;
    stock.currentPrice = req.body.currentPrice || stock.currentPrice;

    const updatedStock = await stock.save();
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE stock
router.delete('/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    await stock.deleteOne();
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;