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
    const {user: {userId}, params: {id}, body: { company, position}} = req;

    if(!company || !position){
        return res.status(400).json({success:false, msg: "Company and position must be provided"});
    }

    const job = await Job.findByIdAndUpdate({_id: id, createdBy: userId }, req.body, {new: true, runValidators: true});
    res.status(200).json({success: true, job});
}

const deleteJob = async(req, res) => {
    const {user: {userId}, params: {id}} = req;
    try {
        const job = await Job.findByIdAndRemove({_id: id, createdBy: userId});
        res.status(200).json({success: true, job})
    } catch (error) {   
        return res.status(404).json({success: false, msg: `No job with id: ${id}`});
    }
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}