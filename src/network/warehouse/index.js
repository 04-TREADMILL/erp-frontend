import request from "@/network/request";
const testAPI = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const warehouseInput = config => request._post(testAPI.WAREHOUSE_INPUT, config);
export const warehouseOutputPre = config => request._post(testAPI.WAREHOUSE_OUTPUT_PRE, config);
export const warehouseOutput = config => request._post(testAPI.WAREHOUSE_OUTPUT, config);
