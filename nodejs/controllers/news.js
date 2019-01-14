const newsModel = require('../models/news');
module.exports = {
 get: function(req, res, next) { 
    newsModel.findById({ _id: req.body.id}, function (err, result) {
      if (err) 
       res.json({status: "fail"});
      else
       res.json({status: "success", data: result});    
    });
 },
 add: function(req, res, next) { 
    newsModel.create({title: req.body.title, description: req.body.description }, function (err, result) {
      if (err) 
       res.json({status: "fail"});   
      else
       res.json({status: "success", data: result});    
    });
 },
 update: function(req, res, next) { 
    newsModel.updateOne( {filter: { _id: req.body.id }, update: { title: req.body.title, description: req.body.description }}, function (err, result) {
      if (err) 
       res.json({status: "fail"});   
      else
       res.json({status: "success", data: result});    
    });
 },
 delete: function(req, res, next) { 
    newsModel.deleteOne({ _id: req.body.id}, function (err, result) {
      if (err) 
       res.json({status: "fail"});    
      else
       res.json({status: "success", data: result});    
    });
 },
}