const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();

const todoCtrl = require('../controllers/todo')

//Add Todo POST API
routes.post('/Todo_Add',
    [
        body('name').isString().trim().withMessage('Name must be String type'),
        body('description').isString().trim().withMessage('Description must be String type'),
        body('status').isString().withMessage('Status should be String type')
    ],
    todoCtrl.todoAddController);

//Get Todos GET API
routes.get('/Todo_Get', todoCtrl.todoGetController)
routes.post('/inbox', todoCtrl.inboxDataController)
routes.post('/publishpost', todoCtrl.publishPostController)

//Update Todo Post API
routes.post('/Todo_Update', [
    body('Id').isString().withMessage('Status should be String type'),
    body('status').isString().withMessage('Status should be String type')
], todoCtrl.todoUpdateController);

//Delete Todo Post API
routes.get('/Todo_Delete/:id', todoCtrl.todoDeleteController);

module.exports = routes;
