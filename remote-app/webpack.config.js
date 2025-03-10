// webpack.config.js in remote app
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "remote_app",
    globalObject: "window",
    library: { type: "var", name: "remote_app" }
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteModule": "./src/app/remote/remote.module.ts"
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: false, requiredVersion: "auto" },
        "@angular/common": { singleton: true, strictVersion: false, requiredVersion: "auto" },
        "@angular/router": { singleton: true, strictVersion: false, requiredVersion: "auto" }
      }
    })
  ]
};
