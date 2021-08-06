const EventController = require('./server/event/controller/eventcontroller.js');
const EventValidator = require('./server/event/validator/eventvalidator.js');
const auth = require('./middleware/auth.js');

class Routes {
    _getMethodLoader(Obj, method) {
        return function (req, res, next) {
            const controller = new Obj();

            controller[method].bind(controller)(req, res, next);
        };
    }

    exposeRoutes(app) {
        app.get('/', (req, res) => {
            return res.render('csr.ejs', {}, (err, html) => {
                if (err) {
                    // log error & return a non-200 response, just sending text Error for now
                    res.send('Error');
                }
                res.send(html);
            });
        });
        app.get('/health', (req, res) => {
            res.send('Service is up.');
        });
        app.get('/api/events', [EventValidator.getEvents, auth], this._getMethodLoader(EventController, 'getEvents'));
        app.get('*', (req, res) => {
            res.send('Final fallback');
        });
    }
}

module.exports = new Routes();
