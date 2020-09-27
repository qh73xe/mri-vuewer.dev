const PUBLICURL = "https://qh73xe.github.io/mri-vuewer.dev/";

module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/mri-vuewer.dev/" : "/",
  pluginOptions: {
    sitemap: {
      urls: [PUBLICURL]
    }
  },
  configureWebpack: {
    performance: {
      maxAssetSize: 270000,
      maxEntrypointSize: 700000
    }
  }
};
