import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import { envVars } from "../../config/env";


const store_id = envVars.SSL_STORE_ID;
const store_passwd = envVars.SSL_STORE_PASS;
const is_live = false; // false for sandbox, true for live

const initiation = async (req:Request, res: Response) => {
  try {
    const body = await req.body;

    const { amount, customer_name, customer_email } = body;

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: "tran_" + Date.now(), // unique transaction id
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/ipn`,

      shipping_method: "NO",
      product_name: "Payment",
      product_category: "General",
      product_profile: "general",

      cus_name: customer_name,
      cus_email: customer_email,
      cus_add1: "Dhaka",
      cus_phone: "01711111111",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
    };
    console.log(data);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    return res.json({ GatewayPageURL: apiResponse.GatewayPageURL });
  } catch (error) {
    console.error(error);
    return res.json({ error: "SSLCommerz initiation failed" });
  }
}

export const paymentControllers = {
    initiation
}