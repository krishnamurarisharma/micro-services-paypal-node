const { createOrder, captureOrder } = require("../services/paypalService");
const Transaction = require("../models/Transaction");

exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createOrder(amount);
    res.status(200).json(order);
  } catch (err) {
    console.error("Create Payment Error:", err.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

exports.capturePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const capture = await captureOrder(orderId);
    const details = capture.purchase_units[0].payments.captures[0];
    await Transaction.create({
      orderId,
      status: details.status,
      amount: details.amount.value,
      currency: details.amount.currency_code,
      payerId: capture.payer.payer_id,
      captureId: details.id,
    });

    res.status(200).json({ success: true, data: capture });
  } catch (err) {
    console.error("Capture Payment Error:", err.message);
    res.status(500).json({ error: "Payment capture failed" });
  }
};
