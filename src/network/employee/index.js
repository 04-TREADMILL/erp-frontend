import request from "@/network/request";
const testAPI = require("@/apis")

export const addEmployee = config => request._post(testAPI.EMPLOYEE_ADD, config);
export const updateEmployee = config => request._post(testAPI.EMPLOYEE_UPDATE, config);
export const deleteEmployee = config => request._get(testAPI.EMPLOYEE_DELETE, config);
export const showEmployee= config => request._get(testAPI.EMPLOYEE_SHOW,config);
export const showEmployeepunch = config => request._get(testAPI.EMPLOYEE_SHOW_PUNCH,config);
export const addEmployeepunch = config => request._post(testAPI.EMPLOYEE_ADD_PUNCH,config);

export const showlastmonthpunch = config => request._get(testAPI.SHOW_LAST_MONTH_PUNCH,config);
export const showthismonthpunch = config => request._get(testAPI.SHOW_THIS_MONTH_PUNCH,config);
export const showlatestpunch = config => request._get(testAPI.SHOW_LATEST_PUNCH,config);
export const allocateAnnualBonus = config => request._get(testAPI.ALLOCATE_ANNUAL_BONUS,config);
export const showAnnualBonus = config => request._get(testAPI.SHOW_ANNUAL_BONUS,config);