const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')
const port = 3000

// Middleware
app.use(express.static(path.join(__dirname, '../public')))

// Set view engine to ejs
app.set('view engine', 'ejs')

// route for index page
app.get('*', (req, res) => {
  res.render('index', {route: req.url})
})

// binds to port to listen for any connections
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})