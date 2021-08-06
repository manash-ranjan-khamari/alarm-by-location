module.exports = (req, res, next) => {
    console.log(req, res, next);
    next();
};
