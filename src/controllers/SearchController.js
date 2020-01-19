const Dev = require('../models/Dev');
const str2array = require('./utils/string2array');

module.exports = {
    async index(req, res){
        const { latitude, longitude, techs } = req.query;

        const devs = await Dev.find({
            techs: {
                $in: str2array(techs, true)
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return res.json({devs});
    }
}