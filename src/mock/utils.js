const api = require("./handler");
const Mock = require("mockjs");

const reqInterceptor = (app, url, type, ret) => {
  if (type === "get") _get(app, url, ret);
  else if (type === "post") _post(app, url, ret);
  else if (type === "delete") _delete(app, url, ret);
  else if (type === "put") _put(app, url, ret);
};

const _get = (app, url, ret) => {
  app.get(url, (req, resp) => {
    resp.json(Mock.mock(ret));
    console.log(url,req.body, req.query);
  });
};

const _post = (app, url, ret) => {
  app.post(url, (req, resp) => {
    resp.json(Mock.mock(ret));
    console.log(url,req.body, req.query);
  });
};

const _delete = (app, url, ret) => {
  app.delete(url, (req, resp) => {
    resp.json(Mock.mock(ret));
    console.log(url,req.body, req.query);
  });
};

const _put = (app, url, ret) => {
  app.put(url, (req, resp) => {
    resp.json(Mock.mock(ret));
    console.log(url,req.body, req.query);
  });
};
module.exports = app => {
  Object.values(api).forEach(value => {
    reqInterceptor(app, ...value);
  });
};
