const mongoose = require('mongoose')
const express = require("express")
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const valveInstanceRoutes = require('./routes/valveInstance')
const valveModelRoutes = require('./routes/valveModel')
const valveFamilyRoutes = require('./routes/valveFamily')
const testRoutes = require('./routes/test')

const app = express()
mongoose.connect(process.env.ATLAS_URI)

const port = 3000

axios.defaults.baseURL = `http://localhost:${port}`

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));


app.use(express.json()) // Middleware to parse JSON in request body
//app.use(express.urlencoded({ extended: true }));
app.use('/api/instances', valveInstanceRoutes)
app.use('/api/valves', valveModelRoutes)
app.use('/api/families', valveFamilyRoutes)
app.use('/api/tests', testRoutes)