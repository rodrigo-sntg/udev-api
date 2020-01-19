const axios = require('axios');
const Dev = require('../models/Dev');
const str2array = require('./utils/string2array');

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    
    async create(req, res) {
        const {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
                let response;
            try{
                response = await axios.get(`https://api.github.com/users/${github_username}`);
            }catch(error){
                console.log(error)
            }
        
            let { name, login, avatar_url, bio} = response.data;
            var techsArray = str2array(techs);
        
            let coordinates = new Array();
            coordinates.push(longitude);
            coordinates.push(latitude);
            const location = {
                type: 'Point',
                coordinates: coordinates,
            };
            
            if(name == null)
                name = login;
        
            
        
            try{
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });
                
            }catch(error){
                console.log(error)
            }
        }
    
        return res.json(dev);
        
    
    },
    
    async read(req, res) {
        const { github_username } = req.params;
        const dev = await Dev.findOne({github_username});
        
        return res.json(dev === null ? {} : dev);
    },
    
    async update(req, res) {
        const { github_username } = req.params;
        const dev = await Dev.findOne({github_username});
        const { latitude, longitude, techs, ...rest} = req.body;
        rest.github_username = github_username;
        if (latitude && longitude)
            var newLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        if (techs)
            var techsArray = str2array(techs);
        const newDev = await Dev.updateOne({ github_username }, {
            location: (latitude&&longitude) ? newLocation : dev.location,
            techs: techs ? techsArray : dev.techs,
            ...rest
        });

        return res.json({
            modifiedCount: newDev.nModified,
            ok: newDev.ok
        });
    },
    
    async delete(req, res) {
        const { github_username } = req.params;
        await Dev.deleteOne({ github_username });
        return res.json();
    }

}


