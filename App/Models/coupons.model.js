const mongoose = require('mongoose');


const CouponSchema = mongoose.Schema({
    name: String,
    description: String,
    coupon_code: String,
    discount_type : String,
    discount: Number,
    expiry_date :String,
    max_usage: String,
    active: String,
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
}
  }, {
    timestamps: true
});

module.exports = mongoose.model('coupon',CouponSchema);