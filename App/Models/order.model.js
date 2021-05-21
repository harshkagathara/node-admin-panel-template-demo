const mongoose = require('mongoose');


const OderSchema = mongoose.Schema({
   
    Date: String,
    Time: String,
    amount: parseFloat(),
    order_no: String,
    cust_name: String,
    cust_phone: String,
    cust_email: String,
    cust_address: String,
    Order_id: String,
    Order_placed: String,
    qty: Number,
    
    dish_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dishes',
        required: true
}, 
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
}, 
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
       required: true
    }
}, {
    timestamps: true
});

// OderSchema.pre('deleteOne', async function (next) {
//     try {
//         let id = this.getQuery()["_id"];
//         await coupons.deleteMany({ restaurant_id: { $in: id } });
//         console.log("delete Done!");
//         next();
//     }
//     catch (err) {
//         next(err);
//     }
// });

module.exports = mongoose.model('orders', OderSchema);
