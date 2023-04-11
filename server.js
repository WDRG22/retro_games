const express = require('express')
const app = express()
const path = require('path')
const port = 3000

// middleware
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// binds to port to listen for any connections
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})