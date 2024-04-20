const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios');
const router = express.Router()
const Test = require('../models/Test.js')


router.get("/all", async (req, res) => {
    try {
        const data = await Test.find().populate('data')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tests.' })
    }
})


router.get("/get/:testID", async (req, res) => {
    const testId = req.params.testID

    if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(400).send("TestID is not valid")
    }

    try {
        const data = await Test.findById(testId).populate('data')

        if (!data) {
            return res.status(404).json({ error: 'Test not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tests.' })
    }
})


router.post("/add", async (req, res) => {
    try {
        const { instance_id, data } = req.body

        try {
            await axios.get(`api/instances/get/${instance_id}`)
        } catch {
            return res.status(400).json({ message: "Not valid valve" })
        }

        const newTest = new Test({
            instance_id,
            data,
        })

        await newTest.save()
        await axios.put(`api/instances/edit/${instance_id}`, { tests: [newTest._id] })
        res.status(200).json(newTest)
    } catch (error) {
        console.error('Error saving valve to the database:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router