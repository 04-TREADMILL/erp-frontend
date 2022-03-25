// 一个简单样例
//!!!!  请使用commonjs的语法导入导出(require/module.exports)
//!!!!  不要用es6语法导入导出(import/export)
const API = require("../../apis");

module.exports = {
  auth: [ // key的名字不要取重了
    API.AUTH,
    "get",
    {
      "code": 200,
      "msg": "",
      "data": {
        "user_info": {
          "id": 419,
          "phone": "17888888888",
          "name": "二狗",
          "role": "ADMIN" // "GM","INVENTORY_MANAGER","ADMIN"
        }
      }
    }
  ],
  login: [
    API.LOGIN,
    "post",
    {
      "code": 200,
      "msg": "",
      "data": {
        "token" : "HIOghuiGFOoguIGIguiogui4564g"
      }
    }
  ]
};
