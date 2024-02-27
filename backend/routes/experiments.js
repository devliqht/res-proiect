const express = require('express')
const Experiments = require('../models/experimentsModel')
const { 
    getExperiments,
    getExperiment,
    createExperiment,
    deleteExperiment,
    updateExperiment
} = require('../controllers/experimentsController')

const router = express.Router()
router.get('/', getExperiments)
router.get('/:id', getExperiment)
router.post('/', createExperiment)
router.delete('/:id', deleteExperiment)
router.patch('/:id', updateExperiment)

module.exports = router