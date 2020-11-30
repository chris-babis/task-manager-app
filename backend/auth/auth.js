const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req,res,next) => {
    
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const tokenDecoded = jwt.verify(token, '.!##&@*#&*');
        const user = await User.findOne({_id: tokenDecoded, 'tokens.token': token});
       
        if(!user) throw new Error();
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({message: "Error, you are not authenticated."});
    }
    
}


module.exports = auth;