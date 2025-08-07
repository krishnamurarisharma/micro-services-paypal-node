const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  orderId: String,
  captureId: String,
  payerId: String,
  amount: Number,
  currency: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
