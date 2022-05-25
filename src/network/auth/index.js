import request from "@/network/request";
const testAPI = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const auth = config => request._get(testAPI.AUTH, config);
export const login = config => request._post(testAPI.LOGIN, config);
export const register = config => request._post(testAPI.REGISTER, config);
