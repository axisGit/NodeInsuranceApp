var express = require('express');
var router = express.Router();
var accountData = require('../data/axisUScomp.json');
var tornadoData = require('../data/tornComp.json');
var windData = require('../data/windComp.json');
var hailData = require('../data/hailComp.json');
var earthquakeData = require('../data/earthquakeComp.json');
//var client = require('../node_modules/twilio/lib')(ACb6ae184fa6b1dbaa041729cb49b375eb, 4dcce31ece33a67e3c37503e333ff5b4);

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

   if(lat1 > lat2){
      var temp = lat1;
      lat1 = lat2;
      lat2 = temp;
   }
   if(lon1 > lon2){
      var temp = lon1;
      lon1 = lon2;
      lon2 = temp;
   }

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


router.post('/txt', function(req, res, next) {
   var lat = req.body.lat;
   var lon = req.body.lon;

   // var clockw = require('clockwork')({key:'4f89c4e61294732e8d1a466458274d11161d1b9d'});

   // var ins = "http://maps.google.com/maps?q=&layer=c&cbll=";
   // var lat_lon = lat + ", " + lon;
   // ins += lat_lon;
   // clockw.sendSms({ To: '13093338561', Content: ins },
   //    function(error, resp) {
   //       if (error) {
   //          console.log('Something went wrong', error);
   //       } else {
   //          console.log('Message sent',resp.responses[0].id);
   //       }
   // });
   // return next({
   //    success: true,
   //    message: "Not valid"
   // });
   var accountSid = 'ACb6ae184fa6b1dbaa041729cb49b375eb';
   var authToken = '4dcce31ece33a67e3c37503e333ff5b4';

   //require the Twilio module and create a REST client
   var client = require('twilio')('ACb6ae184fa6b1dbaa041729cb49b375eb', '4dcce31ece33a67e3c37503e333ff5b4');

   client.messages.create({
       to: '3093338561',
       from: '3097537022',
       body: 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon,
   }, function (err, message) {
       console.log('http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon);
       console.log(message.sid);
       res.json({ "success": true });
   });
});

module.exports = router;
