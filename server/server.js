import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './configs/mongodb.js'

// Initialize express
const app = express()

// Connect to databse
await connectDB()

// Middleware
app.use(cors())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks.js)

// Port

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})