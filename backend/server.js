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
mongoose.connect("mongodb+srv://ayerinmattxc:g3YR6DvjayVOECYS@violationtracker.fpqujlc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT || 8000, () => {
            console.log('[RES02 Proj] Connected! Listening on port ', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })

