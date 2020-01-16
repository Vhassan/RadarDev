const {Router} = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body;
    
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
    
    const {name = login, avatar_url, bio} = apiRes.data;
    
    const techsArray = techs.split(',').map(tech => tech.trim());
    
    const  location = {
        type: 'Point',
        coordenates: [longitude, latitude],
    };

    const dev = await Dev.create({
        github_username,
        name,
        bio,
        techs: techsArray,
        location,
    });

    return res.json(dev);

});

module.exports = routes;
