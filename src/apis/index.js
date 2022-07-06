//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';


const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';
const WAREHOUSE_EXCEL_EXPORT = 'api/warehouse/warehouse/exportExcel';

// 销售管理
// 进货管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';
// 进货退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';
// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
// 销售退货管理
const SALE_RETURN_ALL = '/api/sale-returns/sheet-show';
const SALE_RETURN_CREATE = '/api/sale-returns/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/sale-returns/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/sale-returns/second-approval';
// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_PURCHASE_ALL = '/api/purchase/sheet-show';
const SALE_PURCHASE_CREATE = '/api/purchase/sheet-make';
const SALE_CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_CUSTOMER_MAX = '/api/sale/maxAmountCustomer';

const CUSTOMER_ADD = 'api/customer/add';
const CUSTOMER_DELETE = 'api/customer/delete';
const CUSTOMER_UPDATE = 'api/customer/update';

//财务人员账号管理
const ACCOUNT_ADD = "api/account/add";
const ACCOUNT_SHOW = "api/account/show";
const ACCOUNT_GET_BY_ID = "api/account/get";
const ACCOUNT_DELETE = "api/account/delete";

//财务人员收款制定
const RECEIPT_CREATE = "api/receipt/sheet-make";
const RECEIPT_SHOW = "api/receipt/sheet-show";
const RECEIPT_APPROVAL="api/receipt/approval"

//人力资源管理
const EMPLOYEE_ADD = 'api/employee/add';
const EMPLOYEE_DELETE = 'api/employee/delete';
const EMPLOYEE_UPDATE = 'api/employee/update';
const EMPLOYEE_SHOW = 'api/employee/show';

const EMPLOYEE_SHOW_PUNCH = 'api/employee/show-punch';
const EMPLOYEE_ADD_PUNCH = 'api/employee/add-punch';

//促销策略管理
const GET_TOTAL_PROMOTION = 'api/sale/get-total-promotion';
const GET_CUSTOMER_PROMOTION = 'api/sale/get-customer-promotion';
const ADD_TOTAL_PROMOTION = 'api/promotion/add-total';
const ADD_CUSTOMER_PROMOTION = 'api/promotion/add-customer';
const DELETE_PROMOTION = 'api/promotion/delete';
const SHOW_PROMOTION = 'api/promotion/show';

const SALE_DETAIL = 'api/finance/sale-detail';

module.exports = {
  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DEATIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,
  WAREHOUSE_EXCEL_EXPORT,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_FIND_SHEET_BY_ID,

  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_CUSTOMER_QUERY,
  SALE_CUSTOMER_MAX,
  SALE_FIND_SHEET_BY_ID,
  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  CUSTOMER_QUERY,
  
  CUSTOMER_ADD,
  CUSTOMER_DELETE,
  CUSTOMER_UPDATE,

  ACCOUNT_ADD,
  ACCOUNT_SHOW,
  ACCOUNT_GET_BY_ID,
  ACCOUNT_DELETE,

  RECEIPT_CREATE,
  RECEIPT_SHOW,
  RECEIPT_APPROVAL,

  EMPLOYEE_ADD,
  EMPLOYEE_DELETE,
  EMPLOYEE_SHOW,
  EMPLOYEE_UPDATE,

  EMPLOYEE_SHOW_PUNCH,
  EMPLOYEE_ADD_PUNCH,

  GET_TOTAL_PROMOTION,
  GET_CUSTOMER_PROMOTION,

  ADD_TOTAL_PROMOTION,
  ADD_CUSTOMER_PROMOTION,
  DELETE_PROMOTION,
  SHOW_PROMOTION,

  SALE_DETAIL,
};
