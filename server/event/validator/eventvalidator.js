const {body, param, query, validationResult} = require('express-validator');


const getRule = (keyName, position) => {
    let rule;

    switch(position) {
        case 'query':
            rule = query(keyName);
            break;

        case 'body':
            rule = body(keyName);
            break;

        default:
            rule = param(keyName);
            break;
    }

    return rule;
};

const timeValidation = (fieldName) => [
    query(fieldName)
    .trim()
    .optional()
    .isISO8601('yyyy-mm-dd')
    .matches(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('must be a valid datetime in the format YYYY-MM-DD HH:MM:SS')
];
const integerValidation = (keyName, position) => [
    getRule(keyName, position)
    .isInt()
    .withMessage('must be an integer value')
];

const getEventsValidationRule = [...timeValidation('startTime'), ...timeValidation('endTime'), 
    ...integerValidation('page', 'query'), ...integerValidation('per_page', 'query')];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => {
            return {
                field: error.param,
                message: error.msg
            };
        });
        
        return res.status(400).json({
            errors: errorMessages
        });
    }
    
    next();
}

module.exports = {
    getEvents: [
        getEventsValidationRule,
        validator
    ]
};
