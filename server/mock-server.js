/**
 * Created by xeonwell on 2017-03-23.
 */

module.exports = function (options) {
  let path = require('path')
  let url = require('url')
  let fs = require('fs')
  let mockPath = path.join(__dirname, '../mock')
  let log = (options && typeof options.log === 'function') ? options.log : console.log
  let successRate = (options && typeof options.successRate === 'number') ? options.successRate : 1
  let isSuccessful = () => (Math.random() < successRate)
  let successWrap = (data) => ({status: 1, data: data})
  let failWrap = () => ({status: 2, data: 'MockServer random error occurred.'})
  log('mock enabled. mock path ->', mockPath)

  return function (req, res, next) {
    if (!isSuccessful()) {
      // log('random error')
      res.json(failWrap())
      return
    }
    let urlObj = url.parse(req.url, true, true)
    let jsonFile = path.join(mockPath, urlObj.pathname + '.json')
    fs.readFile(jsonFile, function (err, result) {
      if (err) {
        // log(jsonFile + ' not found. next')
        return next()
      }

      log(jsonFile + 'find and output')
      let str = result.toString()
      try {
        res.json(successWrap(JSON.parse(str)))
      } catch (e) {
        res.send(str)
      }
    })
  }
}
