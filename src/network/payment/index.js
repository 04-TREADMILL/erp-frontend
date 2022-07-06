import request from "@/network/request";
const testAPI = require("@/apis")

export const addPayment = config => request._post(testAPI.PAYMENT_CREATE, config);
export const showPayment = config => request._get(testAPI.PAYMENT_SHOW, config);
export const approvePayment = config => request._get(testAPI.PAYMENT_APPROVAL, config);