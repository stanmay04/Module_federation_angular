const { RawSource } = require('webpack-sources');

class AppendToAssetPlugin {
  constructor(assetName, text) {
    this.assetName = assetName;
    this.text = text;
  }

  apply(compiler) {
    // Use thisCompilation hook to access the current compilation.
    compiler.hooks.thisCompilation.tap("AppendToAssetPlugin", (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: "AppendToAssetPlugin",
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets, callback) => {
          if (compilation.assets[this.assetName]) {
            const originalSource = compilation.assets[this.assetName].source();
            const newSource = originalSource + "\n" + this.text;
            // Update the asset using the Webpack 5 API
            compilation.updateAsset(this.assetName, new RawSource(newSource));
          }
          callback();
        }
      );
    });
  }
}

module.exports = AppendToAssetPlugin;
