const express = require('express')
const router = express.Router()
const ValveInstance = require('../models/ValveInstance.js')


router.get("/all", async (req, res) => {
    try {
        const data = await ValveInstance.find().populate({
            path: 'valve_model',
            populate: {
                path: 'valve_family',
            }
        }).populate('tests')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve instances.' })
    }
})

router.get("/all/ofmodel/:valveID", async (req, res) => {
    const valveId = req.params.valveID

    try {
        const data = await ValveInstance.find({ valve_model: valveId })

        if (!data) {
            return res.status(404).json({ error: 'Valve not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve instances.' })
    }
})


router.get("/all/offamily/:valveFamilyID", async (req, res) => {
    const valveFamilyId = req.params.valveFamilyID

    try {
        const data = (await ValveInstance.find().populate({
            path: 'valve_model',
            populate: {
                path: 'valve_family',
                match: { _id: valveFamilyId }
            }
        })).filter(el => el.valve_model.valve_family !== null)

        if (!data) {
            return res.status(404).json({ error: 'Valve not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tests.' })
    }
})


router.get("/get/:valveInstanceSN", async (req, res) => {
    const valveId = req.params.valveInstanceSN

    //TODO: mettere un controllo regex che id sia valido

    try {
        const data = (await ValveInstance.findById(valveId).populate({
            path: 'valve_model',
            populate: {
                path: 'valve_family',
            }
        }).populate('tests'))

        if (!data) {
            return res.status(404).json({ error: 'Valve instance not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve instances.' })
    }
})


router.post("/add", async (req, res) => {
    try {
        const { _id, job_number, valve_model } = req.body

        const newValve = new ValveInstance({
            _id,
            job_number,
            valve_model
        })

        await newValve.save()
        res.status(200).json(newValve)
    } catch (error) {
        console.error('Error saving valve instance to the database:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.put('/edit/:valveInstanceSN', async (req, res) => {
    const valveId = req.params.valveInstanceSN
    const { job_number, valve_model, tests } = req.body

    //TODO: mettere un controllo regex che id sia valido

    try {
        const updatedValve = await ValveInstance.findByIdAndUpdate(valveId, { job_number, valve_model, $push: { tests } }, { new: true })

        if (!updatedValve) {
            return res.status(404).json({ error: 'Valve instance not found' })
        }

        res.status(200).json(updatedValve)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.delete('/del/:valveInstanceSN', async (req, res) => {
    const valveId = req.params.valveInstanceSN

    //TODO: mettere un controllo regex che id sia valido

    try {
        const deletedValve = await ValveInstance.findByIdAndDelete(valveId, { new: true })
        res.status(200).json({ success: (deletedValve !== null) })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router