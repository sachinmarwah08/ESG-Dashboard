module.exports = function override(config, env) {
  const fs = require("fs");
  var CryptoJS = require("crypto-js");

  const content = CryptoJS.AES.encrypt(
    "my message",
    "secret key 123"
  ).toString();
  // const content = CryptoJS.HmacSHA1('Message', 'Key');
  const value = JSON.stringify(content);

  fs.writeFile("src/alwaysChange.js", `export const a=${value}`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  config.output = {
    ...config.output,
    filename: "[name].[contenthash].js",
  };

  // New config, e.g. config.plugins.push...
  return config;
};
