const { validationResult } = require('express-validator');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const db = require('../database/db');
var graph = require('fbgraph');
graph.setVersion('5.0'); //2.10
waterfall = require('async-waterfall'),
    Response = require('../lib/response.js'),

    //TODO Add Controller
    exports.todoAddController = ((req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            var error = new Error('Invalid Todo Details!');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        console.log(req.body.name)
        const name = req.body.name;
        const description = req.body.description;
        const status = req.body.status;


        db.getDB().db().collection('todos').insertOne({ name: name, description: description, status: status }).then(data => {
            res.status(201).json({
                objResponse: { responseText: "Successfully Data Added!", responseMethod: "TODO_ADD_SUCCESS", responseCode: 1, data: data }
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            err.objResponse = { responseText: "Error!", responseMethod: "TODO_ADD_Fail", responseCode: 0, data: null }
            next(err);
        })
    })

//TODO Get Controller
exports.todoGetController = ((req, res, next) => {
    var finalResponse = {};
    console.log('ssssssssssssddddddddddddffffffffffffggggggggggg');
    var access_token = 'EAAdLEjjQe4wBAOoxs6K1XYMwx3qydEENG9KTbL5in15tfWfXK8yczhHCMcJ8cGGgcmzG5DgBLlZBe4JdZBsMoSbWYUQwfRE7d3vE5wkbpZBRfMp5svNJYDBGcTpvLt1oouKPSZBsBoYv7jtJvZBo0le7fXZBvIDmhhZAdqEkZBWrdZAk31j50qkg9TtFzgZB0WeEeoZAwAb6bvshQZDZD';
    graph.setAccessToken(access_token);
    graph.get("me/accounts?fields=picture{url},name,access_token&limit=10&type=page", function (err, response) {
        finalResponse.facebook_feeds = response;
        res.json(Response(200, 'yes', response, null));
        console.log('aaa', finalResponse.facebook_feeds);
    });

})

exports.inboxDataController = ((req, res, next) => {
    var finalResponse = {};
    console.log('bbbbbbbbbbbb', req);
    var pages_id = req.body.page_id;
    var access_token = req.body.access_token;
    graph.setAccessToken(access_token);
    graph.get(pages_id + "/published_posts?fields=created_time,message,id,story&limit=5", function (err, response) {
        finalResponse.facebook_feeds = response;
        res.json(Response(200, 'yes', response, null));
    });

})

exports.publishPostController = ((req, res, next) => {
    var finalResponse = {};
    console.log('ccccccccccccc');
    var access_token = req.body.access_token;
    var pages_id = req.body.page_id;
    graph.setAccessToken(access_token);
    graph.get(pages_id + "/feed?fields=created_time,picture,full_picture,attachments{title,unshimmed_url,url,media,media_type,type,subattachments},comments{created_time,message,id,from{name,picture{url}}},shares,likes,story_tags", function (err, response) {
        finalResponse.facebook_feeds = response;
        res.json(Response(200, 'yes', response, null));
    });

})
//TODO  Update Controller
exports.todoUpdateController = ((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = new Error('Invalid Todo Details!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const status = req.body.status;
    const id = req.body.Id;
    db.getDB().db().collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } }).then(updatedData => {
        res.status(201).json({
            objResponse: { responseText: "Successfully Data Updated!", responseMethod: "TODO_UPDATE_SUCCESS", responseCode: 1, data: updatedData }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Failed!", responseMethod: "TODO_UPDATE_Fail", responseCode: 0, data: null }
        next(err);
    })
})


//TODO Delete Controller
exports.todoDeleteController = ((req, res, next) => {
    //const id = req.params.id;
    db.getDB().db().collection('todos').deleteOne({ _id: new ObjectId(req.params.id) }).then(data => {
        res.status(200).json({
            objResponse: { responseText: "Data Deleted!", responseMethod: "TODO_DELETE_SUCCESS", responseCode: 0, data: data }
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.objResponse = { responseText: "Failed!", responseMethod: "TODO_Delete_Fail", responseCode: 0, data: null }
        next(err);
    })

})
