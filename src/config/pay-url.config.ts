const PayUrlConfig = {
  returnUrl: process.env.RETURN_URL || 'http://localhost:3000/payment/success',
  cancelUrl: process.env.CANCEL_URL || 'http://localhost:3000/payment/cancel',
};

export default PayUrlConfig;
