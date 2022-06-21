const express = require('express')

module.exports = express
  .Router()

  // catch 404 and forward
  .use((req, res, next) => {
    next((new Error('Not Found').status = 404))
  })

  // error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message, error: err })
  })
