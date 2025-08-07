const express = require('express');
const router = express.Router();
const { createPayment, capturePayment } = require('../controllers/paymentController');

router.post('/create', createPayment);
router.post('/capture/:orderId', capturePayment);

module.exports = router;
