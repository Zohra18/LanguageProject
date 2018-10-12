import express from 'express'
import volleyball from 'volleyball'
import 'dotenv/config'
import { connect } from './config/db'
import { restRouter } from './blog'
import passport from 'passport'
import cors from 'cors'
import { configJWTStrategy } from './blog/middlewares/passport-jwt'

const { PORT, DB_url } = process.env

connect()

const app = express()

app.use(volleyball)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize());
configJWTStrategy();

app.use('/blog', restRouter)
app.use('/blog', (req, res) => {
  res.send('Welcome to our selection of Blogs!')
})
app.use('/', (req, res) => {
  res.send('Hello!')
})


//pour les routes inéxistantes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = "invalid route"
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.json({
    error:{
      msg:error.message
    }
  })
})

app.listen(PORT, (req, res) => {
  console.log(`This #${PORT} is LIT`)
})
