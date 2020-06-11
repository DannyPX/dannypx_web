const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
const Discord = require('discord.js')
const isoDate = function() {
  var d = new Date();
  return d.toISOString();
}
const embed = {
    "description": "Runner completed",
    "title": "dannypx_web/master",
    "url": "https://github.com/DannyPX/dannypx_web",
    "color": 7995533,
    "timestamp": isoDate,
    "footer": {
      "text": "Commit pushed"
    },
    "thumbnail": {
      "url": "https://i.imgur.com/uZM2EUT.png"
    },
    "author": {
      "name": "DannyPX",
      "icon_url": "https://cdn.discordapp.com/avatars/720382291825786882/3ea33d580fe5d970c12fbe1394a0674e.png?size=128"
    }
}

app.use(requireHTTPS);
// here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));


// https://discordapp.com/api/webhooks/720382291825786882/2muhPbEAVGwVjwgIuiwzwSsLKfzC5CXysNKRo6GIbIL4hClXQZ6zm3KlKaNa3RgZu8xV
const port = process.env.PORT || 8080;
app.listen(port, function() {
  const webhookClient = new Discord.WebhookClient('720382291825786882', '2muhPbEAVGwVjwgIuiwzwSsLKfzC5CXysNKRo6GIbIL4hClXQZ6zm3KlKaNa3RgZu8xV')
  webhookClient.send({
    username: 'GitHub',
    avatarURL: 'https://i.imgur.com/uZM2EUT.png',
    embeds: [embed]
  }).then(() => {
    console.log('0')
    process.exit(0)
  }).catch((error) => {
    console.log(error)
    process.exit(1)
  });
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
