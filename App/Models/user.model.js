const mongoose = require('mongoose');
const Restaurant = require('./restaurant.model');

const UserSchema =  mongoose.Schema({
    frist_name: String,
    last_name:String,
    phone: Number,
    role: String,
    email : String,
    password: String,
    
}, {
    timestamps: true
});

UserSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];
        await Restaurant.deleteMany({ user_id: { $in: id } });
        console.log("delete Done!");
        next();
    }
    catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('user', UserSchema);