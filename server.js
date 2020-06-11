const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
const Discord = require("discord.js");
const isoDate = function() {
  var d = new Date();
  return d.toISOString();
};
const embed = {
  description: "Website online",
  title: "dannypx_web/master",
  url: "https://dannypx-staging.herokuapp.com/",
  color: 7995533,
  timestamp: isoDate(),
  footer: {
    text: "Build started"
  },
  thumbnail: {
    url: "https://i.imgur.com/GfAER9p.png"
  },
  author: {
    name: "DannyPX",
    icon_url:
      "https://cdn.discordapp.com/avatars/720382291825786882/3ea33d580fe5d970c12fbe1394a0674e.png?size=128"
  }
};

app.use(requireHTTPS);

// here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.post("/", function(req, res) {
  const webhookClient = new Discord.WebhookClient(
    "720382291825786882",
    "2muhPbEAVGwVjwgIuiwzwSsLKfzC5CXysNKRo6GIbIL4hClXQZ6zm3KlKaNa3RgZu8xV"
  );
  webhookClient.send({
    username: "Heroku",
    avatarURL: "https://i.imgur.com/GfAER9p.png",
    embeds: [embed]
  });
  res.status(200);
  res.send("");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
