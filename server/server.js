import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// Connect DB & Cloudinary
await connectDB()
await connectCloudinary()

// Middleware Setup
app.use(cors())
app.use(clerkMiddleware())

// Stripe webhook MUST go before express.json()
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Body parser for JSON
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', clerkWebhooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.use('/uploads', express.static('uploads'))


// Optional: Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})






// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './configs/mongodb.js'
// import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
// import educatorRouter from './routes/educatorRoutes.js'
// import { clerkMiddleware } from '@clerk/express'
// import connectCloudinary from './configs/cloudinary.js'
// import courseRouter from './routes/courseRoute.js'
// import userRouter from './routes/userRoutes.js'

// // initialize Express
// const app = express()

// // Connect to Database
// await connectDB()
// await connectCloudinary()

// // Middlewares
// app.use(cors())
// app.use(clerkMiddleware())

// // Routes
// app.get('/', (req, res)=> res.send("API Working"))
// app.post('/clerk', express.json(), clerkWebhooks )
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.use('/api/user', express.json(), userRouter)
// app.post('/stripe', express.raw({ type: 'application/json'}), stripeWebhooks)

// // Port
// const PORT = process.env.PORT || 5000

// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`)
// })


