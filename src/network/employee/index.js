import request from "@/network/request";
const testAPI = require("@/apis")

export const addEmployee = config => request._post(testAPI.EMPLOYEE_ADD, config);
export const updateEmployee = config => request._post(testAPI.EMPLOYEE_UPDATE, config);
export const deleteEmployee = config => request._get(testAPI.EMPLOYEE_DELETE, config);
export const showEmployee= config => request._get(testAPI.EMPLOYEE_SHOW,config);
export const showEmployeepunch = config => request._get(testAPI.EMPLOYEE_SHOW_PUNCH,config);
export const addEmployeepunch = config => request._post(testAPI.EMPLOYEE_ADD_PUNCH,config);