const Experiment = require('../models/experimentsModel')
const mongoose = require('mongoose')


const getExperiments = async (req, res) => {
    const experiments = await Experiment.find({}).sort({createdAt: -1})

    res.status(200).json(experiments)
}

const getExperiment = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    const experiment = await Experiment.findById(id)

    if (!experiment) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    res.status(200).json(experiment)
}


const createExperiment = async (req, res) => {
    const { experimentName, experimentNo, apparatusList } = req.body

    try {
        const experiment = await Experiment.create({experimentName, experimentNo, apparatusList})
        res.status(200).json(experiment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteExperiment = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    const experiment = await Experiment.findOneAndDelete({_id: id})

    if (!experiment) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    res.status(200).json(experiment)

}

const updateExperiment = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    const experiment = await Experiment.findOneAndUpdate({_id: id}, {
      ...req.body  
    })

    if (!experiment) {
        return res.status(404).json({error: 'No such experiment exists'})
    }

    res.status(200).json(experiment)
} 


module.exports = { 
    getExperiments,
    getExperiment,
    createExperiment,
    deleteExperiment,
    updateExperiment

}