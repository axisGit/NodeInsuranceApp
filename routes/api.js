var express = require('express');
var router = express.Router();
var accountData = require('../data/axisUScomp.json');
var tornadoData = require('../data/tornComp.json');
var windData = require('../data/windComp.json');
var hailData = require('../data/hailComp.json');
var earthquakeData = require('../data/earthquakeComp.json');

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({ "success": true });
});

router.get('/location-test', function(req, res, next) {
   res.json(axisUS);
});

router.post('/location', function(req, res, next) {
   var lat1 = req.body.lat1;
   var lon1 = req.body.lon1;

   var lat2 = req.body.lat2;
   var lon2 = req.body.lon2;

   console.log("lat1 = " + lat1);

   var new_json = {"ID":[], "PREMIUM":[], "TIV":[], "DED":[], "CITY":[], "POSTALCODE":[], "LATITUDE":[], "LONGITUDE":[]};

   var i = 0;
   for (i = 0; i < accountData["LATITUDE"].length; i++) {
       var cur_lat = accountData["LATITUDE"][i];
       var cur_lon = accountData["LONGITUDE"][i];
       if (cur_lat >= lat1 && cur_lat <= lat2 && cur_lon >= lon1 && cur_lon <= lon2) {
            new_json["ID"].push(accountData["ID"][i]);
            new_json["PREMIUM"].push(accountData["PREMIUM"][i]);
            new_json["TIV"].push(accountData["TIV"][i]);
            new_json["DED"].push(accountData["DED"][i]);
            new_json["CITY"].push(accountData["CITY"][i]);
            new_json["POSTALCODE"].push(accountData["POSTALCODE"][i]);
            new_json["LATITUDE"].push(accountData["LATITUDE"][i]);
            new_json["LONGITUDE"].push(accountData["LONGITUDE"][i]);
       }
   }
   res.json(new_json);
});

router.get('/disasters', function(req, res, next) {
   var type = req.query.type;
   if(type == "wind")
      res.json(windData);
   else if(type == "tornado")
      res.json(tornadoData);
   else if(type == "hail")
      res.json(hailData);
   else if(type == "earthquake")
      res.json(earthquakeData);
   return next({
      success: false,
      message: "Not valid"
   });
});

module.exports = router;
