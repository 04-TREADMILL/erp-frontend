import request from "@/network/request";
const testAPI = require("@/apis")

export const findAllProduct = config => request._get(testAPI.COMMODITY_ALL, config);
