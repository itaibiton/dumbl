const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Enable CSS support for Metro
config.resolver.assetExts.push('css');

module.exports = withNativeWind(config, { 
  input: './app/global.css',
  configPath: './tailwind.config.js'
});