import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";

const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const CommodityManagement = () =>
  import("../views/commodity/CommodityManagement");
const CommodityClassification = () =>
  import("../views/commodity/CommodityClassification");
const InventoryManagement = () => import("../views/inventory/InventoryManagement");
const InventoryCheck = () => import("../views/inventory/InventoryCheck");
const InventoryOperation = () =>
  import("../views/inventory/InventoryOperation");
const InventoryIn = () => import("../views/inventory/InventoryIn");
const InventoryOut = () => import("../views/inventory/InventoryOut");
const InventoryLoss = () => import("../views/inventory/InventoryLoss");
const InventoryOverflow = () => import("../views/inventory/InventoryOverflow");
const InventoryPresent = () => import("../views/inventory/InventoryPresent");
const InventoryView = () => import("../views/inventory/InventoryView");
const InventoryWarning = () => import("../views/inventory/InventoryWarning");
const PurchaseView = () => import("../views/purchase/PurchaseView");
const PurchaseReturnView = () => import("../views/purchase/PurchaseReturnView");
const SaleView = () => import("../views/sale/SaleView");
const SaleReturnView = () => import("../views/sale/SaleReturnView");
const CustomerView = () => import ("../views/purchase/CustomerView");
// const Approval = () => import("../views/approval/Approval");
const AnnualBonus = ()=> import("../views/employee/AnnualBonus");
const ShowAnnualBonus = ()=>import("../views/employee/ShowAnnualBonus");
const EmployeeManageView = () => import("../views/employee/EmployeeView");
const EmployeeIncome = () => import("../views/employee/Income");
const EmployeeDailyAttendance = ()=>import("../views/employee/EmployeeDailyAttendance");
const EmployeeSalaryManage = ()=>import("../views/employee/SalaryManage");
const ReceiveManage = ()=>import("../views/financial/ReceiveManage");
const PayManage = ()=> import("../views/financial/PayManage");
const IncomeManage = ()=>import("../views/financial/IncomeManage");
const CheckPurchaseDetail = ()=>import("../views/financial/CheckPurchaseDetail");


const CheckBusinessSituation = ()=>import("../views/financial/CheckBusinessSituation");
const AccountManage = ()=>import("../views/financial/AccountManage");

const SetPromotion = ()=>import("../views/sale/SalePromotion");

const checkSaleSheet = ()=> import("../views/financial/SaleSheet");
const checkPurchaseSheet = ()=>import("../views/financial/PurchaseSheet");
const checkFinanceSheet = ()=>import("../views/financial/FinanceSheet");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: () => import("@/views/auth/register.vue")
  },
  // 商品管理
  {
    path: PATH.COMMODITY_CLASSIFICATION.path,
    component: CommodityClassification,
    meta: { requiresAuth: PATH.COMMODITY_CLASSIFICATION.requiresAuth }
  },
  {
    path: PATH.COMMODITY_MANAGEMENT.path,
    component: CommodityManagement,
    meta: { requiresAuth: PATH.COMMODITY_MANAGEMENT.requiresAuth }
  },
  // 库存管理
  {
    path: PATH.INVENTORY_MANAGEMENT.path,
    component: InventoryManagement,
    meta: { requiresAuth: PATH.INVENTORY_MANAGEMENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_CHECK.path,
    component: InventoryCheck,
    meta: { requiresAuth: PATH.INVENTORY_CHECK.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OPERATION.path,
    component: InventoryOperation,
    name: "InventoryOperation",
    meta: { requiresAuth: PATH.INVENTORY_OPERATION.requiresAuth }
  },
  {
    path: PATH.INVENTORY_IN.path,
    component: InventoryIn,
    name: "InventoryIn",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OUT.path,
    component: InventoryOut,
    name: "InventoryOut",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_LOSS.path,
    component: InventoryLoss,
    name: "InventoryLoss",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OVERFLOW.path,
    component: InventoryOverflow,
    name: "InventoryOverflow",
    meta: { requiresAuth: PATH.INVENTORY_OVERFLOW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_PRESENT.path,
    component: InventoryPresent,
    name: "InventoryPresent",
    meta: { requiresAuth: PATH.INVENTORY_PRESENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_VIEW.path,
    component: InventoryView,
    meta: { requiresAuth: PATH.INVENTORY_VIEW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_WARNING.path,
    component: InventoryWarning,
    name: "InventoryWarning",
    meta: { requiresAuth: PATH.INVENTORY_WARNING.requiresAuth }
  },
  // 销售管理
  {
    path: PATH.PURCHASE_VIEW.path,
    component: PurchaseView,
    name: "PurchaseView",
    meta: { requiresAuth: PATH.PURCHASE_VIEW.requiresAuth }
  },
  {
    path: PATH.PURCHASE_RETURN_VIEW.path,
    component: PurchaseReturnView,
    name: "PurchaseReturnView",
    meta: { requiresAuth: PATH.PURCHASE_RETURN_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_VIEW.path,
    component: SaleView,
    name: "SaleView",
    meta: { requiresAuth: PATH.SALE_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_RETURN_VIEW.path,
    component: SaleReturnView,
    name: "SaleReturnView",
    meta: { requiresAuth: PATH.SALE_RETURN_VIEW.requiresAuth }
  },
  {
    path: PATH.CUSTOMER_VIEW.path,
    component: CustomerView,
    name: "CustomerView",
    meta: { requiresAuth: PATH.CUSTOMER_VIEW.requiresAuth }
  },
  // 审批
  // {
  //   path: PATH.GM_APPROVAL.path,
  //   component: Approval,
  //   meta: { requiresAuth: PATH.GM_APPROVAL.requiresAuth }
  // },
  {
    path: PATH.GM_SET_PROMOTION.path,
    component: SetPromotion,
    meta: {requiresAuth: PATH.GM_SET_PROMOTION.requiresAuth }
  },
  {
    path:PATH.ALLOCATE_ANNUAL_BONUS.path,
    component: AnnualBonus,
    meta:{requiresAuth: PATH.ALLOCATE_ANNUAL_BONUS.requiresAuth}
  },
  {
    path:PATH.SHOW_ANNUAL_BONUS.path,
    component: ShowAnnualBonus,
    meta:{requiresAuth:PATH.SHOW_ANNUAL_BONUS.requiresAuth}
  },
  //HR
  {
    path: PATH.HR_EMPLOYEEMANAGE.path,
    component: EmployeeManageView,
    meta: { requiresAuth: PATH.HR_EMPLOYEEMANAGE.requiresAuth }
  },
  {
    path:PATH.HR_EMPLOYEEDAILYATTENDANCE.path,
    component: EmployeeDailyAttendance,
    meta:{ requiresAuth:PATH.HR_EMPLOYEEDAILYATTENDANCE.requiresAuth}
  },
  {
    path: PATH.HR_EMPLOYEEINCOME.path,
    component: EmployeeIncome,
    meta:{ requiresAuth:PATH.HR_EMPLOYEEINCOME.requiresAuth}
  },
  {
    path:PATH.HR_SALARY_MANAGE.path,
    component:EmployeeSalaryManage,
    meta:{requiresAuth: PATH.HR_SALARY_MANAGE.requiresAuth}
  },
  //FINANCIAL_STAFF
  {
    path:PATH.ACCOUNT_MANAGE.path,
    component:AccountManage,
    meta:{requiresAuth: PATH.ACCOUNT_MANAGE.requiresAuth}
  },
  {
    path:PATH.RECEIVE_MANAGE.path,
    component:ReceiveManage,
    meta:{requiresAuth:PATH.RECEIVE_MANAGE.requiresAuth}
  },
  {
    path:PATH.PAY_MANAGE.path,
    component: PayManage,
    meta:{requiresAuth:PATH.PAY_MANAGE.requiresAuth}
  },
  {
    path:PATH.INCOME_MANAGE.path,
    component: IncomeManage,
    meta:{requiresAuth:PATH.INCOME_MANAGE.requiresAuth}
  },
  {
    path:PATH.CHECK_PURCHASE_DETAIL.path,
    component:   CheckPurchaseDetail,
    meta:{requiresAuth:PATH.CHECK_PURCHASE_DETAIL.requiresAuth}
  },

  {
    path:PATH.CHECK_BUSINESS_SITUATION.path,
    component: CheckBusinessSituation,
    meta:{requiresAuth:PATH.CHECK_BUSINESS_SITUATION.requiresAuth}
  },
  {
    path:PATH.CHECK_SALE_SHEET.path,
    component: checkSaleSheet,
    meta:{requiresAuth:PATH.CHECK_SALE_SHEET.requiresAuth}
  },
  {
    path:PATH.CHECK_PURCHASE_SHEET.path,
    component: checkPurchaseSheet,
    meta:{requiresAuth:PATH.CHECK_PURCHASE_SHEET.requiresAuth}
  },
  {
    path:PATH.CHECK_FINANCE_SHEET.path,
    component: checkFinanceSheet,
    meta:{requiresAuth:PATH.CHECK_FINANCE_SHEET.requiresAuth}
  },
  // -----------------------未找到页面-----------------------------
  {
    path: "*",
    redirect: "/error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // console.log(to.path);
  if (to.path === "/error" || to.path === "/login") {
    next();
  } else if (to.path === "/") {
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    if (token == null || role == null) next("/login");
    else next();
  } else if (to.meta.requiresAuth) {
    if (
      to.meta.requiresAuth.some(
        role => role.toString() === sessionStorage.getItem("role")
      )
    ) {
      //有权限
      // console.log("获得访问权限");
      next()
    } else {
      // console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    next();
  }
});

export default router;
