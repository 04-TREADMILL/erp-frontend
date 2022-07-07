import request from "@/network/request";
const testAPI = require("@/apis")

export const addSalary = config => request._post(testAPI.SALARY_CREATE, config);
export const showSalary = config => request._get(testAPI.SALARY_SHOW, config);
export const approveSalary = config => request._get(testAPI.SALARY_APPROVAL, config);

export const changeSalaryMode = config => request._get(testAPI.CHANGE_SALARY_MODE,config);