module.exports = (req, res, next) => {
    /* We can do the validation of authentic sources here
        - Like we can may be restrict by IP location & we can check req header to get the IP & check that
        - Or else let's say retrict for certain userAgent or so
    */
    next();
};
