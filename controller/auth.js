const login = async (req, res) =>{
    const {username, password} = req.body;
    res.status(200).json({status: true, msg: "Logged In", username});
}

const register = async (req, res) => {
    const {username, password} = req.body;
    res.status(200).json({status: true, msg: "User Created"});
}

module.exports = {
    login,
    register
}