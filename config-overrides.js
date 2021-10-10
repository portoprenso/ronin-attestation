const {
  addDecoratorsLegacy,
  override,
  // addBabelPlugin,
  disableEsLint
} = require("customize-cra");
// const pluginProposalDecorators = require("@babel/plugin-proposal-decorators");

module.exports = {
  webpack: override(
    // addBabelPlugin(pluginProposalDecorators),
    addDecoratorsLegacy(),
    disableEsLint()
  ),
};
