const { __app } = require('../dist/ssr-rotulos/server/main');

module.exports = (req, res) => {
  const server = __app();
  return server(req, res);
};