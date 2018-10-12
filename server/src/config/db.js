import mongoose from 'mongoose'
import "dotenv/config"
const { DB_url } = process.env

mongoose.Promise = global.Promise;//permet d'eviter les chargements trop longs
export const connect = () => {
  mongoose.connect(DB_url, { useNewUrlParser: true })
  console.log('this mongo-bitch be working')
}
