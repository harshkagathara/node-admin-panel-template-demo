const Restaurant = require('../Models/restaurant.model');

exports.Index = (req, res) => {
    Restaurant.find().count(function (err, restaurant) {
        res.render('dashbord', {restaurant: restaurant});
    })
}