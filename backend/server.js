require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logRoutes = require('./routes/logs')
const experimentRoutes = require('./routes/experiments')
// Express App
const app = express()

// Middle ware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// Routes
app.use('/api/logs', logRoutes)
app.use('/api/experiments', experimentRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('[RES02 Proj] Connected! Listening on port ', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })

