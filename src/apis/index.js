//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/auth"
const LOGIN = "/api/login"
const REGISTER = '/api/register'

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
};
