const express = require('express')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to api.fdnd.nl! This is a template, please change this text.',
      github: 'https://github.com/fdnd-apis/api',
      spec: 'https://example.api.fdnd.nl/v1',
      docs: 'https://redocly.github.io/redoc/?url=https:%2F%2Fexample.api.fdnd.nl%2Fv1',
    })
  })
