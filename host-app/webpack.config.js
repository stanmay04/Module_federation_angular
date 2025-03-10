const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4200/",
    uniqueName: "host_app"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        'remote_app': 'remote_app@http://localhost:4201/remoteEntry.js'
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: false, requiredVersion: "auto" },
        "@angular/common": { singleton: true, strictVersion: false, requiredVersion: "auto" },
        "@angular/router": { singleton: true, strictVersion: false, requiredVersion: "auto" }
      }
    })
  ]
};
