import request from "@/network/request";
const testAPI = require("@/apis")

export const addReceipt = config => request._post(testAPI.RECEIPT_CREATE, config);
export const showReceipt = config => request._get(testAPI.RECEIPT_SHOW, config);
export const approveReceipt = config => request._get(testAPI.RECEIPT_APPROVAL, config);