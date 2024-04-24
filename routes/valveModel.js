const express = require('express')
const router = express.Router()
const ValveModel = require('../models/ValveModel.js')


router.get("/all", async (req, res) => {
    try {
        const data = await ValveModel.find().populate('valve_family')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve models.' })
    }
})


router.get("/get/:valveID", async (req, res) => {
    const valveId = req.params.valveID

    //TODO: mettere un controllo regex che id sia valido

    try {
        const data = await ValveModel.findById(valveId).populate('valve_family')

        if (!data) {
            return res.status(404).json({ error: 'Valve model not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve models.' })
    }
})


router.post("/add", async (req, res) => {
    try {
        const { _id, valve_family, description, gear_model, ma_gear, img_url } = req.body

        const newValve = new ValveModel({
            _id,
            valve_family,
            description,
            gear_model,
            ma_gear,
            img_url
        })

        if (!newValve._id.startsWith(valve_family)) {
            return res.status(400).json({error: 'Data inconsistency between \'_id\' and \'valve_family\''})
        }

        await newValve.save()
        res.status(200).json(newValve)
    } catch (error) {
        console.error('Error saving valve model to the database:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.put('/edit/:valveID', async (req, res) => {
    const valveId = req.params.valveID
    const { description, gear_model, ma_gear, img_url } = req.body

    //TODO: mettere un controllo regex che id sia valido

    try {
        const updatedValve = await ValveModel.findByIdAndUpdate(valveId, { description, gear_model, ma_gear, img_url }, { new: true })

        if (!updatedValve) {
            return res.status(404).json({ error: 'Valve model not found' })
        }

        res.status(200).json(updatedValve)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.delete('/del/:valveID', async (req, res) => {
    const valveId = req.params.valveID

    //TODO: mettere un controllo regex che id sia valido

    try {
        const deletedValve = await ValveModel.findByIdAndDelete(valveId, { new: true })
        res.status(200).json({ success: (deletedValve !== null) })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router