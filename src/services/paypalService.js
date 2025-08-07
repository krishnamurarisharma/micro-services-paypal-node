const axios = require("axios");
const { getAccessToken } = require("../config/paypal");
const PAYPAL_API = process.env.PAYPAL_API;
const createOrder = async (amount) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

const captureOrder = async (orderId) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

module.exports = { createOrder, captureOrder };
