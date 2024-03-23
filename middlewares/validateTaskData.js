const validateTaskData = (req,res,next)=>{
    const {description,status} = req.body;
    if(!description || typeof description !== 'string'){
        return res.status(400).json({message: 'invalid or missing description'});
    }
    const stats = ['backlog','process','done','basket']
    if(typeof status !== 'string' || !stats.includes(status)){
        return res.status(400).json({message:'invalid status'})
    }
    next();
}
module.exports = validateTaskData;