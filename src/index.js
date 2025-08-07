require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
