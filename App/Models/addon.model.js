const mongoose = require('mongoose');

const AddonsSchema = mongoose.Schema({
        name: String,
        price:parseFloat(),
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

module.exports = mongoose.model('addon', AddonsSchema);