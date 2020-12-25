const express = require('express')
const cors = require('cors')
const port=8087
const app = express()
app.use(cors())
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})
app.post('/users/login',(req,res)=>{
    res.json({
        "code": 0,
        "result": {
          "username": "jack",
          "password": "123456",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTBkOTQ2YzU3NmQwNGI3NDFkMTI5ZSIsImlhdCI6MTYwODc4NzAyMCwiZXhwIjoxNzAzNDU5ODIwfQ.m47b2jzt6iyzEPDVGEGTkk0Cw0IP_V0stibcZGHJWLw"
        }
      })
})
app.get('/:name', (req, res) => {
  const name = req.params.name

  res.json({
    message: `Hello ${name}`
  })
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
