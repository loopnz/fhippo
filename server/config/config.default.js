'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // console.log(appInfo);
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '286420375';
  config.security = {
    csrf: false
  };
  // add your config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.nj': 'nunjucks',
    },
  }

  config.jwt = {
    secret: "286420375",
    enable: false,
  }

  return config;
};

