const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({
    name: String,   
    description : String,
    image: String,
    is_veg : String,
    price :parseFloat(),
    discount_price :parseFloat(),
    dish_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurant',
            required: true
    },
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
}, 
    addons_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addons_categories',
        required: true
        },
    active:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('dishes', DishSchema);