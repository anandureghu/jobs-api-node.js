const User = require('../models/user');
const CustomAPIError = require('../errors/custom-error');

const register = async (req, res) => {
    try {
        
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({success: false, msg: "Please provide Username, E-mail and Password"});
        }
        const user = await User.create(req.body);
        const token = user.createToken();
        res.status(200).json({success: true, user: user.username, token});
    } catch (error) {
        res.status(404).json({error});
    }
}

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(500).json({success: false, msg: "Email and Password is required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, msg: "User doesn't exist"});
        }

        const validPassword = await user.validatePassword(password);

        if(!validPassword){
            return res.status(400).json({success: false, msg: "Incorrect password"});
        }

        const token = user.createToken();
        req.headers.Authorization = `Bearer ${token}`;

        res.status(200).json({success: true, msg: "Logged In", user: user.username, token});
    } catch (error) {
        console.log("catch")
        res.status(404).json(error);
    }
}

module.exports = {
    login,
    register
}