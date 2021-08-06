const MongoDBService = require('../../common/service/mongodbservice.js');

class EventService extends MongoDBService {
    constructor() {
        super();
    }

    async getEvents({startTime, endTime, sort, page, limit}) {
        const collection = this.db.collection('alarms');
        const skip = ((page ? (parseInt(page) - 1) : 0) * limit); 
        const matchQuery = startTime && endTime ? {
            timestamp: {
                $gte: startTime,
                $lte: endTime
            }
        } : {};

        const query = [
            {
                $match: matchQuery
            },
            {$sort: {isoTimestamp: 1}},
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $lookup:
                {
                    from: 'locations',
                    localField: 'location',
                    foreignField: 'id',
                    //   let: { <var_1>: <expression>, …, <var_n>: <expression> },
                    //   pipeline: [ <pipeline to run on joined collection> ],
                    as: 'events'
                }
            }, 
            {
                $project: {
                    _id: 0,
                    outcome: '$outcome',
                    datetime: '$timestamp',
                    location: {$arrayElemAt: ['$events.name', 0]}
                }
            }
        ];

        const [queryMatchCountData, eventsData] = await Promise.all([
            collection.find(matchQuery).count(),
            collection.aggregate(query).toArray()
        ]);

        const lastPage = Math.ceil(queryMatchCountData / 50);
        return {
            current_page: page,
            data: eventsData,
            from: (skip + 1),
            next_page_url: (page === lastPage) ? null : `/api/events/?sort=${sort}&per_page=50&page=${page + 1}`,
            per_page: 50,
            last_page: lastPage,
            prev_page_url: (page === 1) ? null : `/api/events/?sort=${sort}&per_page=50&page=${page - 1}`,
            to: (skip + 50),
            total: queryMatchCountData
        };
    }
};

module.exports = new EventService();
