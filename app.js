require('dotenv').config()
const express = require('express')

const indexRoute = require('./routes/index')
const exampleRoute = require('./routes/example')
const errorRoute = require('./routes/error')

module.exports = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use('/', indexRoute)
  .use('/v1/example', exampleRoute)
  .use(errorRoute)
