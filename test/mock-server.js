const app = require("express")();
const bodyParser = require("body-parser");
const api = require("../spec/api.json");

api.routes.forEach(e =>
  app.use(e.path, (req, res) => {
    res.json({
      url: req.originalUrl,
      apiKey: req.headers["X-API-Key"],
      query: req.query,
      params: req.params,
      body: req.body
    });
  })
);

app.listen(3005);
