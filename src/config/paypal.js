const axios = require('axios');

const PAYPAL_API = process.env.PAYPAL_API; 
const CLIENT = process.env.PAYPAL_CLIENT_ID;
const SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: CLIENT,
      password: SECRET
    },
    data: 'grant_type=client_credentials'
  });

  return response.data.access_token;
};

module.exports = { getAccessToken };
