const configureAPI = require('./src/server/configuration') 

module.exports = {
  devServer: {
    before: configureAPI
  }
}