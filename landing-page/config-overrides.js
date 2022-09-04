/* config-overrides.js */

module.exports = {
    webpack: (config, env) => {
      return config;
    },
    devServer: (configFunction) => (proxy, allowedHost) => {
      const devServerConfig = configFunction(proxy, allowedHost);
  
      devServerConfig.allowedHosts = ["app.localhost"];
      return devServerConfig;
    },
  };