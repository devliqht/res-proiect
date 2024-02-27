const express = require('express')
const Logs = require('../models/logsModel')
const { 
    getLogs,
    getLog,
    createLog,
    deleteLog,
    updateLog
} = require('../controllers/logsController')

const router = express.Router()
router.get('/', getLogs)
router.get('/:id', getLog)
router.post('/', createLog)
router.delete('/:id', deleteLog)
router.patch('/:id', updateLog)

module.exports = router