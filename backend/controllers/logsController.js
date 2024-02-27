const Log = require('../models/logsModel')
const mongoose = require('mongoose')


const getLogs = async (req, res) => {
    const logs = await Log.find({}).sort({createdAt: -1})

    res.status(200).json(logs)
}

const getLog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log exists'})
    }

    const log = await Log.findById(id)

    if (!log) {
        return res.status(404).json({error: 'No such log exists'})
    }

    res.status(200).json(log)
}


const createLog = async (req, res) => {
    const { studentName, studentID, studentBlocksection, logTimeAndDate, studentGroup, apparatuses } = req.body

    // Add Student to Database
    try {
        const log = await Log.create({studentName, studentID, studentBlocksection, logTimeAndDate, studentGroup, apparatuses})
        res.status(200).json(log)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteLog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log exists'})
    }

    const log = await Log.findOneAndDelete({_id: id})

    if (!log) {
        return res.status(404).json({error: 'No such log exists'})
    }

    res.status(200).json(log)

}

const updateLog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log exists'})
    }

    const log = await Log.findOneAndUpdate({_id: id}, {
      ...req.body  
    })

    if (!log) {
        return res.status(404).json({error: 'No such log exists'})
    }

    res.status(200).json(log)
} 


module.exports = { 
    getLogs,
    getLog,
    createLog,
    deleteLog,
    updateLog
}