const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = async (req,res,next) => {
    const {authorization } = req.headers;

    if(!authorization){
        return res.status(404).json({error:'Autherization not valid'});
    }

    const token = authorization.split(' ')[1];
    
    try{
        const {_id} = jwt.verify(token,process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch{
        console.log(error);
        res.status(404).json({error:'request is not authorized'});
    }
}

module.exports = requireAuth;