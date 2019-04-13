const app = require("express")();
const bodyParser = require("body-parser");
const api = require("../spec/api.json");
const cors = require("cors");

app.use(cors());

const handler = (req, res) => {
  res.json({
    url: req.originalUrl,
    apiKey: req.headers["X-API-Key"],
    query: req.query,
    params: req.params,
    body: req.body
  });
};

api.routes.forEach(e => {
  switch (e.method) {
    case "GET":
      app.get(e.path, handler);
      break;
    case "POST":
      app.post(e.path, handler);
      break;
    case "PATCH":
      app.patch(e.path, handler);
      break;
    case "DELETE":
      app.delete(e.path, handler);
      break;
  }
});

app.listen(3005);
