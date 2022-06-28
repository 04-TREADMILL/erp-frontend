import request from "@/network/request";
const testAPI = require("@/apis")
export const addCustomer = config => request._post(testAPI.CUSTOMER_ADD, config);
export const updateCustomer = config => request._post(testAPI.CUSTOMER_UPDATE, config);
export const deleteCustomer = config => request._get(testAPI.CUSTOMER_DELETE, config);