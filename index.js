const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))
.get('/testInside', (req, res) => res.sendFile(path.join(__dirname+'/public/.testInside.html')))