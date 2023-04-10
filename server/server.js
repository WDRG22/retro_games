const express = require('express')
const app = express()
const path = require('path')
const port = 3000

// middleware
app.use(express.static(path.join(__dirname, '../public')))

// single route for index page. All
app.get('/', (req, res) => {
  res.render('index')
})

// binds to port to listen for any connections
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})