const mongoose = require('mongoose');
const Dishes = require('./dish.model');
const Addon = require('./addon.model');

const AddonsCateSchema = mongoose.Schema({
    name: String,
    type:String,
}, {
    timestamps: true
});


AddonsCateSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Dishes.deleteMany({ addons_category_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});

AddonsCateSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Addon.deleteMany({ addons_category_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});
module.exports = mongoose.model('addons_categories', AddonsCateSchema);