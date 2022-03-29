// 部署url
export const REQUEST_BASE_URL_PROD = "";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
  SALE_STAFF: "SALE_STAFF", // 进货销售人员
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

  // GM
  GM_APPROVAL: {
    path: '/approval',
    requiresAuth: [ROLE.GM,ROLE.ADMIN]
  }
}
