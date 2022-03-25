import request from "@/network/request";
const testAPI = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const testGet = config => request._get(testAPI.TEST_GET, config);
export const testPost = config => request._post(testAPI.TEST_POST, config);
