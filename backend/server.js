import express from "express";
import cors from 'cors'
import db from './db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

db()

app.get('/', (req, res) => {
  res.send('This is the backend server for the MERN stack application.')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
