const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req,res,next) => {
    const {autherization} = req.headers;

    if(!autherization){
        res.status(401).json({err:'Autherization problem'});
    }

    const token = autherization.split(' ')[1];
    try{
        const {_id} = jwt.verify(token,process.env.SECRET);

        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch(err){
        res.status(401).json({err:'Requesting the token problem'});
    }
}