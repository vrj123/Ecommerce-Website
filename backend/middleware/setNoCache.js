module.exports=(req, res, next)=>{
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}