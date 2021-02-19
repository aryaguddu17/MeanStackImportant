const express = require('express');
const fileCtrl = require('../controllers/file');

const routes = express.Router();

routes.get('/uploadCsv', fileCtrl.uploadCsv);

module.exports = routes;
