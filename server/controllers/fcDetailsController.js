
const { FCDetail } = require('../models');
const getAllFcDetail = async (req, res) => {
    try {
        const fcDetails = await FCDetail.findAll()
        res.json(fcDetails)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { getAllFcDetail };