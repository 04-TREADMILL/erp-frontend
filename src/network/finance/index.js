import request from "@/network/request";
const testAPI = require("@/apis")

export const addEmployee = config => request._post(testAPI.EMPLOYEE_ADD, config);
export const getSaledetail = config=>request._get(testAPI.SALE_DETAIL,config);