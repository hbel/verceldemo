const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
require('dotenv').config()

const {MONGODB_URI, PORT, FRONTEND_DOMAIN} = process.env

mongoose.connect(MONGODB_URI)

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsConfig = {
  origin: FRONTEND_DOMAIN,
  credentials: true,
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api/test', (req, res) => { res.json({ type: "Data", payload: { name: "foo", count: 12 }}); })
app.use('/api/user', require('./src/routes/user'))
app.use('/api/answers', require('./src/routes/answers'))
app.use('/api/questions', require('./src/routes/questions'))

app.post('/api/drop-database', async (req, res) => {
  await mongoose.connection.db.dropDatabase()
  res.status(200).send('OK')
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../frontend/build/index.html'));
});

app.use((req, res, next) => {
  const error = new Error('Nichts gefunden')
  error.status = 404
  next(error)
})


// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: error.message
  })
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
