const { Router } = require('express')
const axios = require('axios');
const Dev = require('./models/Dev');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

// Query params: request.query (filtros, ordenacao, paginacao...) /?nome=rodrigo
// Route Params: request.params (identificar um recurso na alteracao ou remocao) /users/:id
// Body: request.body (Dados para criacao ou alteracao)

routes
    // DEVS Endpoint
    .get('/devs', DevController.index)
    .post('/devs', DevController.create)
    .get('/devs/:github_username', DevController.read)
    .put('/devs/:github_username', DevController.update)
    .delete('/devs/:github_username', DevController.delete)
    // SEARCH Endpoint
    .get('/search', SearchController.index);

module.exports = routes;

