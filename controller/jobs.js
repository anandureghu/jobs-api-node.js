const Job = require('../models/job');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(200).json({success: true, nbHits: jobs.length, jobs});
}

const getJob = async(req, res) => {
    const {id} = req.params;
    try {
        
        const job = await Job.findOne({createdBy: req.user.userId, _id: id});
    } catch (error) {
        return res.status(404).json({success:false, msg: `No job found with id ${id}`})
        
    }
    
    if(!job){
        return res.status(404).json({success:false, msg: `No job found with id ${id}`})
    }

    res.status(200).json({success:false, job});
}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({success: true, job});
}

const updateJob = async(req, res) => {
    const {id} = req.params;
    res.send(`Updating Job with id: ${id}`);
}

const deleteJob = async(req, res) => {
    const {id} = req.params;
    res.send(`Deleting job with id: ${id}`);
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}