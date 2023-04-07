const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

app.get('/pong', (req, res) => {
  res.sendFile(path.resolve('public', 'game.html'))
})

app.get('/pacman', (req, res) => {
  res.sendFile(path.resolve('public', 'game.html'))
})

app.get('/tetris', (req, res) => {
  res.sendFile(path.resolve('public', 'game.html'))
})

app.get('/spaceinvaders', (req, res) => {
  res.sendFile(path.resolve('public', 'game.html'))
})

app.get('/mario', (req, res) => {
  res.sendFile(path.resolve('public', 'game.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})