var express = require('express');
var router = express.Router();
//var accountData = require('../data/axisUScomp.json');
//var tornadoData = require('../data/');
var windData = require('../data/windComp.json');
//var hailData = require('../data/');

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({ "success": true });
});

router.get('/location-test', function(req, res, next) {
   res.json(axisUS);
});

// router.post('/location', function(req, res, next) {
//    var lat1 = req.body.lat1;
//    var lon1 = req.body.lon1;

//    var lat2 = req.body.lat2;
//    var lon2 = req.body.lon2;

//    var new_json;

//    var i = 0;
//    for (i = 0; i < axisUS.length; i++) {
//        var cur_lat = (number)accountData[i]["LATITUDE"];
//        var cur_lon = (number)accountData[i]["LONGITUDE"];
//        if (cur_lat >= lat1 && cur_lat <= lat2 && cur_lon >= lon1 && cur_lon <= lon2) {
//            new_json += accountData[i];
//        }
//    }

//    res.json(new_json);
// });

router.get('/disasters', function(req, res, next) {
   var type = req.params.type;
   switch(type){
      case "tornado":
         //res.json(tornadoData);
         break;
      case "wind":
         res.json(windData);
         break;
      case "hail":
         //res.json(hailData);
   }
});

module.exports = router;
