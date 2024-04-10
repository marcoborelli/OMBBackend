const mongoose = require('mongoose')
const express = require("express")
const axios = require('axios');
require('dotenv').config()

const valveRoutes = require('./routes/valve')
const testRoutes = require('./routes/test')

const app = express()
mongoose.connect(process.env.ATLAS_URI)

const port = 3000

axios.defaults.baseURL = `http://localhost:${port}`

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


app.use(express.json()) // Middleware to parse JSON in request body
//app.use(express.urlencoded({ extended: true }));
app.use('/api/valves', valveRoutes)
app.use('/api/tests', testRoutes)