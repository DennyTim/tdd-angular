module.exports = function(config) {
  config.set({
    ...config,
    client: {
      jasmine: {
        random: false
      }
    }
  })
}
