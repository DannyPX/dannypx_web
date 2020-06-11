const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const { default: Axios } = require("axios");
const app = express();

app.use(requireHTTPS);

// here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`app is listening on port: ${port}`);
  Axios.post('https://discordapp.com/api/webhooks/720382291825786882/2muhPbEAVGwVjwgIuiwzwSsLKfzC5CXysNKRo6GIbIL4hClXQZ6zm3KlKaNa3RgZu8xV', {
    content: 'Runner tested',
    username: 'Github'
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(() => {
    process.exit(0)
  }).catch(() => {
    process.exit(1)
  })
});

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
