const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios');
const router = express.Router()
const Test = require('../models/Test.js')

const test_for_page = 10

router.get("/all", async (req, res) => {
    let pageNumber = parseInt(req.query.page_number) //le pagine partono da 1

    try {
        let query = Test.find().sort({ timestamp: -1 })
        if (!isNaN(pageNumber)) {
            query = query.skip(test_for_page * (pageNumber - 1)).limit(test_for_page)
        }

        const data = await query.exec();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tests.' })
    }
})

router.get("/find", async (req, res) => {
    let instance_id = req.query.instance_id ? req.query.instance_id : ''
    const pageNumber = parseInt(req.query.page_number) //le pagine partono da 1

    try {
        let data = await Test.find({ instance_id: { $regex: instance_id, $options: 'i' } }).sort({ timestamp: -1 }) //i = case insensitive
        const totalNumber = data.length

        if (!isNaN(pageNumber)) {
            let base = test_for_page * (pageNumber - 1)
            data = data.slice(base, (base + test_for_page <= data.length) ? base + test_for_page : base + (data.length - base))
        }

        res.status(200).json({ elements_number: totalNumber, elements_for_page: test_for_page, query_data: data })
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tests.' })
    }
})

router.get("/get/:testID", async (req, res) => {
    const testId = req.params.testID

    if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send("TestID is not valid")
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
        const { timestamp, instance_id, data } = req.body

        try {
            await axios.get(`api/instances/get/${instance_id}`)
        } catch {
            return res.status(400).json({ message: "Not valid valve" })
        }

        const newTest = new Test({
            timestamp, //TODO: gestire nel caso in cui sia undefined
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