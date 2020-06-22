const { createProxyMiddleware } = require("http-proxy-middleware");
const apiProxy = createProxyMiddleware("/antvip", {
  target: "http://114.115.190.197:9081",
  // target: "http://10.0.42.25:8180",
  // target: "http://10.0.42.23:80"


  
});
//target是要请求服务器的地址
module.exports = function (app) {
  app.use(apiProxy);
};
