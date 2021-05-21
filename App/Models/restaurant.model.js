const mongoose = require('mongoose');
const coupons = require('./coupons.model');
const DishCate = require('./dishCate.model');
const Dishes = require('./dish.model');
const Addon = require('./addon.model');


const RestaurantSchema = mongoose.Schema({
    name:String,
    description:String,
    image:String,
    phone: String,
    address: String,
    cuisine:String,
    email: String,
    rating: parseFloat(),
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
       required: true
    }
}, {
    timestamps: true
});

RestaurantSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await coupons.deleteMany({ restaurant_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});

RestaurantSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await DishCate.deleteMany({ restaurant_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});
RestaurantSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Dishes.deleteMany({ restaurant_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});

RestaurantSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Addon.deleteMany({ restaurant_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});
module.exports = mongoose.model('restaurants', RestaurantSchema);
