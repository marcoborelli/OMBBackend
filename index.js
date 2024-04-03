const mongoose = require('mongoose')
const express = require("express")
require('dotenv').config()

const valveRoutes = require('./routes/valve')

const app = express()
mongoose.connect(process.env.ATLAS_URI)

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


app.use(express.json()) // Middleware to parse JSON in request body
app.use('/api/valves', valveRoutes)