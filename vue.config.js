const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    themeColor: "#ed4040",
    msTileColor: "#000000",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#42b983",
    },
    iconPaths: {
      msTileImage: "img/icons/mstile-150x150.png",
    },
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./src/sw.js",
      // ...other Workbox options...
    },
  },
};
