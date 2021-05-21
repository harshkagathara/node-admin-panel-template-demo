const mongoose = require('mongoose');
const Dishes = require('./dish.model');

const DishCateSchema = mongoose.Schema({
    name: String,
    image : String,
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
      }, 
    active:String,
}, {
    timestamps: true
});


DishCateSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Dishes.deleteMany({ dish_category_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});
module.exports = mongoose.model('dish_categories', DishCateSchema);