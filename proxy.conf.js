module.exports = {
  "/api/": {
    "target": "http://localhost:8001/api/v1/namespaces/qa-env2/services",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api/([^\/]+)/(.*)": "/$1:http/proxy/api/exposed/$2"
    },
    "headers": {
      "VATBOX-USER-ID": "5c35fdc93b0000dc0a1d4b8d",
      "VATBOX-USER-NAME": "aleksandr.klimenko@vatbox.com"
    },
    "bypass": function (req, res) {
      if (req.url.includes("api/exposed/v1.0/logs") && req.method === "POST") {
        var body = '';
        req.on('data', function(chunk) { body += chunk });
        req.on('end', function() {
          console.log(body); // 'Write' to kubernetes logger
        });
        res.statusCode = 200;
        res.end();
        return true;
      }
    }
  }
}
