const getAllJobs = async (req, res) => {
    res.send("Get all jobs")
}

const getJob = async(req, res) => {
    const {id} = req.params;
    res.send(`Get a single job with id: ${id}`);
}

const createJob = async(req, res) => {
    res.send(`Create a job`);
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