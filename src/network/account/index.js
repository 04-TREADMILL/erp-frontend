import request from "@/network/request";
const testAPI = require("@/apis")

export const addAccount = config => request._get(testAPI.ACCOUNT_ADD, config);
export const deleteAccount = config => request._get(testAPI.ACCOUNT_DELETE, config);
export const showAccount= config => request._get(testAPI.ACCOUNT_SHOW,config);
export const getAccount = config => request._get(testAPI.ACCOUNT_GET_BY_ID,config);