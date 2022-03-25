import request from "@/network/request";
const testAPI = require("@/apis")

export const getAllCommodityClassification = config => request._get(testAPI.COMMODITY_CLASSIFICATION_ALL, config);
export const createCommodityClassification = config => request._get(testAPI.COMMODITY_CLASSIFICATION_CREATE, config);
export const deleteCommodityClassification = config => request._get(testAPI.COMMODITY_CLASSIFICATION_DELETE, config);
export const updateCommodityClassification = config => request._get(testAPI.COMMODITY_CLASSIFICATION_UPDATE, config);

export const getAllCommodity = config => request._get(testAPI.COMMODITY_ALL, config);
export const createCommodity = config => request._post(testAPI.COMMODITY_CREATE, config);
export const updateCommodity = config => request._post(testAPI.COMMODITY_UPDATE, config);
export const deleteCommodity = config => request._get(testAPI.COMMODITY_DELETE, config);
