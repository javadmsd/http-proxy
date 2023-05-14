const express = require("express");
const httpProxy = require("http-proxy");

const auth = "YOUR_AUTH";

// Create a proxy and listen on port 1070
const proxy = httpProxy.createProxyServer({});
const app = express();

app.get("*", function (req, res) {
  if (req.headers?.["proxy-authorization"] !== auth) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  delete req.headers["proxy-authorization"];

  try {
    // Prints "Request GET https://httpbin.org/get?answer=42"
    console.log("Request", req.method, req.url);
    proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
  } catch (e) {
    console.log(e);
  }
});

console.log("listening on port 1070");
app.listen(1070);
