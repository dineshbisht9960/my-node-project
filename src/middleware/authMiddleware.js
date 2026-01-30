const jwt = require('jsonwebtoken');

module.exports.authMiddleware =(req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).json({
                success: false,
                message :"Authorization header missing"
            });                                                                                 
        }
        
        const token = authHeader.split("Bearer ")[1];

        if(!token){
            return res.status(401).json({
                message : "Token missing"
            })
        }

        const decoded = jwt.verify(token, "test");
        
        req.user = decoded?.data;
        console.log(req.user);
        next();
        } catch (error) {
        return res.status(401).json({
        success:false,
        message : 'Invalid or expired token'
        })
    }
}
