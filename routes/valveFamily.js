const express = require('express')
const router = express.Router()
const axios = require('axios')
const ValveFamily = require('../models/ValveFamily.js')


router.get("/all", async (req, res) => {
    try {
        const data = await ValveFamily.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve families.' })
    }
})

router.get("/get/:valveFamilyID", async (req, res) => {
    const valveFamilyId = req.params.valveFamilyID

    try {
        const data = await ValveFamily.findById(valveFamilyId)

        if (!data) {
            return res.status(404).json({ error: 'Valve family not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving valve families.' })
    }
})

router.post("/add", async (req, res) => {
    try {
        const { _id, theoric_values, img_url } = req.body

        const newValveFamily = new ValveFamily({
            _id,
            theoric_values,
            img_url
        })

        await newValveFamily.save()
        res.status(200).json(newValveFamily)
    } catch (error) {
        console.error('Error saving valve family to the database:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/edit/:valveFamilyID', async (req, res) => {
    const valveFamilyId = req.params.valveFamilyID
    const { theoric_values, img_url } = req.body

    //TODO: mettere un controllo regex che id sia valido

    let values
    try {
        values = (await axios.get(`api/families/get/${valveFamilyId}`)).data.theoric_values
    } catch {
        return res.status(404).json({ error: 'Valve family not found' })
    }

    if (!values)
        values = {}

    for (const prop in theoric_values) { //aggiungo gli attributi che non sono stati modificati (verrebbero rimossi altrimenti)
        values[prop] = theoric_values[prop]
    }

    try {
        const updatedValveFamily = await ValveFamily.findByIdAndUpdate(valveFamilyId, { theoric_values: values, img_url }, { new: true })

        if (!updatedValveFamily) {
            return res.status(404).json({ error: 'Valve family not found' })
        }

        res.status(200).json(updatedValveFamily)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.delete('/del/:valveFamilyID', async (req, res) => {
    const valveFamilyId = req.params.valveFamilyID

    //TODO: mettere un controllo regex che id sia valido

    try {
        const deletedValveFamily = await ValveFamily.findByIdAndDelete(valveFamilyId, { new: true })
        res.status(200).json({ success: (deletedValveFamily !== null) })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router