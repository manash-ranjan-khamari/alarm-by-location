const BaseController = require('../../common/controller/basecontroller.js');
const eventService = require('../service/eventservice.js');

class EventController extends BaseController {
    constructor() {
        super();
    }

    async getEvents(req, res, next) {
        try {
            const events = await eventService.getEvents({
                startTime: req.query.startTime && new Date(`${req.query.startTime} UTC`).toISOString(),
                endTime: req.query.endTime && new Date(`${req.query.endTime} UTC`).toISOString(),
                page: parseInt(req.query.page),
                limit: parseInt(req.query.per_page),
                sort: req.query.sort
            });
            return this.sendApiResponse({res, status: 200, model: events});
        } catch(err) {
            return this.sendApiResponse({res, status: 500});
        }
    }
}

module.exports = EventController;
