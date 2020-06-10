const manifestJSON = require("./public/img/icons/manifest.json");

module.exports = {
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js"
    }
  }
};
