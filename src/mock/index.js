const mock = require("./utils");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3456;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//设置允许跨域访问该服务.
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

mock(app);
app.listen(port, '0.0.0.0',() => console.log(`Example app listening on port ${port}!`));
