const wiki = require('./routes/wiki')
const express = require('express')
const app = express()

app.use('/wiki', wiki)