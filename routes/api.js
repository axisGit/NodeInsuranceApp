var express = require('express');
var router = express.Router();
//var accountData = require('../data/axisUScomp.json');
var tornadoData = require('../data/tornComp.json');
var windData = require('../data/windComp.json');
var hailData = require('../data/hailComp.json');

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
//        var cur_lat = (number)accountData["LATITUDE"][i];
//        var cur_lon = (number)accountData["LONGITUDE"][i];
//        if (cur_lat >= lat1 && cur_lat <= lat2 && cur_lon >= lon1 && cur_lon <= lon2) {
//            var cur_json = {"ID":accountData["ID"][i], 
//                            "PREMIUM":accountData["PREMIUM"][i], 
//                            "TIV":accountData["TIV"][i], 
//                            "DED":accountData["DED"][i], 
//                            "CITY":accountData["CITY"][i], 
//                            "POSTALCODE":accountData["POSTALCODE"][i]
//                            "LATITUDE":accountData["LATITUDE"][i]
//                            "LONGITUDE":accountData["LONGITUDE"][i]};
//             new_json += cur_json;
//        }
//    }

//    res.json(new_json);
// });

router.get('/disasters', function(req, res, next) {
   var type = req.query.type;
   if(type == "wind")
      res.json(windData);
   else if(type == "tornado")
      res.json(tornadoData);
   else if(type == "hail")
      res.json(hailData);
   return next({
      success: false,
      message: "Not valid"
   });
});

module.exports = router;
