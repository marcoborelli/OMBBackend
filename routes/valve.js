const express = require('express')
const router = express.Router()
const Valve = require('../models/Valve.js')


router.get("/all", async (req, res) => {
    try {
        const data = await Valve.find().populate('tests')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valves.' })
    }
})


router.get("/get/:valveID", async (req, res) => {
    const valveId = req.params.valveID

    try {
        const data = await Valve.findById(valveId).populate('tests')

        if (!data) {
            return res.status(404).json({ error: 'Valve not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valves.' })
    }
})


router.post("/add", async (req, res) => {
    try {
        const { name, model_family } = req.body

        const newValve = new Valve({
            name,
            model_family,
        })

        await newValve.save()
        res.status(200).json(newValve)
    } catch (error) {
        console.error('Error saving valve to the database:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.put('/edit/:valveID', async (req, res) => {
    const valveId = req.params.valveID
    const newData = req.body

    try {
        const updatedValve = await Valve.findByIdAndUpdate(valveId, newData, { new: true })

        if (!updatedValve) {
            return res.status(404).json({ error: 'Valve not found' })
        }

        res.status(200).json(updatedValve)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.delete('/del/:valveID', async (req, res) => {
    const valveId = req.params.valveID

    try {
        const deletedValve = await Valve.findByIdAndDelete(valveId, { new: true })
        res.status(200).json({ success: (deletedValve !== null) })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router