class APIUtils {
  constructor(apiContext, loginpayload) {
    this.apiContext = apiContext;
    this.loginpayload = loginpayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginpayload });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log("Token is---------->" + token);
    return token;
  }

  async createOrder(orderpayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderpayload,
      headers: {
        Authorization: response.token,
        "Content-Type": "application/json",
      },
    });
    const orderResponseJson = await orderResponse.json();
    const orderID = orderResponseJson.orders[0];
    response.orderID = orderID;
    console.log("Order ID------->" + orderID);
    return response;
  }
}

module.exports = { APIUtils };
