const csv = require('csv-parser');
const fastCsv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const db = require('../database/db');
const Response = require('../lib/response');

exports.uploadCsv = ((req, res, next) => {
    var csvList = [];
    console.log(req.file)
    let filePath = path.join(__dirname, '../files', req.file);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', row => {
            csvList.push(row);
        })
        .on('end', error => {
            db.getDB().db().collection('csvData').insertMany(csvList).then(data => {
                data.filePath=req.file;
                res.status(200).json(Response(1, 'SuccessFully Data Inserted!', 'SuccessFully Data Inserted!', data.filePath, data.ops))
                //fs.unlink(filePath, err => console.log(err));
            })
                .catch(err => {
                    next(err);
                })
        })
})