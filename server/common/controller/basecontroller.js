class BaseController {
    constructor() {}

    sendApiResponse({res, status, model}) {
        // for non 500 we should log as well, not doing it as the scope will increase 
        res.status(status || 200).send(model || (status === 500 && 'Some problem happened, please try again'));
    }
};

module.exports = BaseController;
