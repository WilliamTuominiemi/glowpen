const express = require('express')
const path = require('path');

const app = express()
const port = 3000

var public = path.join(__dirname, 'public');
app.use(express.static(public));

app.get('/', (req, res) => {
  res.sendFile(path.join(public, 'flare.png'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})