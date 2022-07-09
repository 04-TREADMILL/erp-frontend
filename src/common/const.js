

// 部署url
export const REQUEST_BASE_URL_PROD = "http://43.142.159.174:8080";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://43.142.159.174:8080";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
  SALE_STAFF: "SALE_STAFF", // 进货销售人员
  SALE_MANAGER: "SALE_MANAGER", //销售经理
  FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
  HR: "HR", // 人力资源人员
  GM: "GM", // 总经理
  ADMIN: "ADMIN" // 最高权限
};


export const PATH = {
  // INVENTORY_MANAGER
  COMMODITY_CLASSIFICATION: {
    path: '/commodityClassification',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  COMMODITY_MANAGEMENT: {
    path: '/commodityManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_MANAGEMENT: {
    path: '/inventoryManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OPERATION: {
    path: '/inventoryOperation',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_CHECK: {
    path: '/inventoryCheck',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_IN: {
    path: '/inventoryIn',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OUT: {
    path: '/inventoryOut',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_LOSS: {
    path: '/inventoryLoss',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_WARNING: {
    path: '/inventoryWarning',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_OVERFLOW: {
    path: '/inventoryOverflow',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_PRESENT: {
    path: '/inventoryPresent',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },
  INVENTORY_VIEW: {
    path: '/inventoryView',
    requiresAuth: [ROLE.INVENTORY_MANAGER,ROLE.ADMIN]
  },

  // SALE_STAFF & SALE_MANAGER
  PURCHASE_VIEW: {
    path: '/purchaseView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  PURCHASE_RETURN_VIEW: {
    path: '/purchaseReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_VIEW: {
    path: '/saleView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  SALE_RETURN_VIEW: {
    path: '/saleReturnView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },
  CUSTOMER_VIEW: {
    path: '/customerView',
    requiresAuth: [ROLE.SALE_STAFF,ROLE.SALE_MANAGER,ROLE.GM,ROLE.ADMIN]
  },

  // GM
  // GM_APPROVAL: {
  //   path: '/approval',
  //   requiresAuth: [ROLE.GM,ROLE.ADMIN]
  // },
  GM_SET_PROMOTION: {
    path: '/SetPromotion',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  },
  ALLOCATE_ANNUAL_BONUS:{
    path:'/AllocateAnnualBonus',
    requiresAuth:[ROLE.GM,ROLE.ADMIN]
  },
  SHOW_ANNUAL_BONUS:{
    path:'/ShowAnnualBonus',
    requiresAuth:[ROLE.GM,ROLE.ADMIN]
  },
  //HR
  HR_EMPLOYEEMANAGE: {
    path: '/EmployeeManageView',
    requiresAuth: [ROLE.HR,ROLE.ADMIN]
  },

  HR_EMPLOYEEDAILYATTENDANCE:{
    path: '/EmployeeDailyAttendance',
    requiresAuth: [ROLE.HR,ROLE.ADMIN]
  },
  HR_EMPLOYEEINCOME:{
    path: '/EmployeeIncome',
    requiresAuth: [ROLE.HR,ROLE.ADMIN]
  },
  HR_SALARY_MANAGE:{
    path:'/SalaryManage',
    requiresAuth:[ROLE.HR,ROLE.ADMIN]
  },
  //FINANCIAL_STAFF
  ACCOUNT_MANAGE:{
    path:'/AccountManage',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN]
  },
  RECEIVE_MANAGE:{
    path:'/ReceiveManage',
    requiresAuth: [ROLE.GM,ROLE.FINANCIAL_STAFF,ROLE.ADMIN]
  },
  PAY_MANAGE:{
    path:'/PayManage',
    requiresAuth: [ROLE.GM,ROLE.FINANCIAL_STAFF,ROLE.ADMIN]
  },
  INCOME_MANAGE:{
    path:'/IncomeManage',
    requiresAuth: [ROLE.GM,ROLE.HR,ROLE.ADMIN]
  },
  CHECK_PURCHASE_DETAIL:{
    path:'/CheckPurchaseDetail',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  CHECK_BUSINESS_SITUATION:{
    path:'/CheckBusinessSituation',
    requiresAuth: [ROLE.FINANCIAL_STAFF,ROLE.ADMIN,ROLE.GM]
  },
  CHECK_SALE_SHEET:{
    path:'/CheckSaleSheet',
    requiresAuth:[ROLE.ADMIN,ROLE.FINANCIAL_STAFF,ROLE.GM]
  },
  CHECK_PURCHASE_SHEET:{
    path:'/CheckPurchaseSheet',
    requiresAuth:[ROLE.ADMIN,ROLE.FINANCIAL_STAFF,ROLE.GM]
  },
  CHECK_FINANCE_SHEET:{
    path:'/CheckFinanceSheet',
    requiresAuth:[ROLE.ADMIN,ROLE.FINANCIAL_STAFF,ROLE.GM]
  }
  




}
