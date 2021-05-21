const Restaurant = require('../Models/restaurant.model');
const User = require('../Models/user.model');
const fs = require('fs');
const upload = require('../Middlewares/imageUpload');

//image setup
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
	  callback(null, './public/uploads/Restaurant');
	},
	filename: function (request, file, callback) {
	  callback(null, Date.now() + file.originalname);
	},
  });
  
exports.TableData = async function(req, res) {
	const TempRes = [];
	const restaurant = [];
	const RestaurantData = await Restaurant.find();
	const users = await User.find()
	RestaurantData.forEach(Element => {
		TempRes.push(Element);
	})
	TempRes.forEach(Element => {
		users.forEach(iteam => {
			if(iteam._id.toString() == Element.user_id.toString()) {
				const resdata = {
					resName: Element.name,
					userFname: iteam.frist_name,
					userLname: iteam.last_name,
					res_id: Element._id,
					image: Element.image
				}
				restaurant.push(resdata);
		 }
		})
	})
	res.render("res_table", {
		restaurant: restaurant
	});
};
exports.Create =  async (req, res) => {

	const users = [];
	const UserData = await User.find();
	UserData.forEach(Element => {
		users.push(Element);
	})
	res.render('restaurant_create', {
		users: users
	});
}
exports.Save = async (req, res) => {

	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
	upload(req, res, async function (err) {

		const email = await Restaurant.findOne({ email: req.body.email })
		if (email) {
			res.send({
				"Message": "This Email is already in use"
			});
		}
		else {
			const restaurant = new Restaurant({
				name: req.body.name,
				description: req.body.description,
				phone: req.body.phone,
				address: req.body.address,
				cuisine: req.body.cuisine,
				email: req.body.email,
				user_id: req.body.user_id,
				image: req.file.filename,
			});
	
				restaurant.save();
				
				res.send({
					"Message": "Success!"
				});
			
		}
	});
}
exports.Edit = async (req, res) => {
	const users = [];
	const restaurant = await Restaurant.findOne({ _id: req.params.id });

	const UserData = await User.find();
	UserData.forEach(Element => {
		users.push(Element);
	})
	res.render("restaurant_edit", {
		restaurant: restaurant,
		users:users
	});
}
exports.Update = async (req, res) => {
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
	upload(req, res, async function (err) {
		if(!req.body.imgchecker){
			
			let imageDATA = await Restaurant.findById(req.params.id);
			// console.log(image);
				await Restaurant.updateOne({ _id: req.params.id }, {
					name: req.body.name,
					address: req.body.address,
					description: req.body.description,
					image: imageDATA.image,
					phone: req.body.phone,
					cuisine: req.body.cuisine,
					email: req.body.email,
					user_id: req.body.user_id
			
				}, function (err, result) {
					if (err) {
						res.send("err"+err);
					} else {
						res.redirect("/res_table");
					}
				});
			// res.send(req.body);
		}
		else{
			// res.send("hiii");
			await Restaurant.updateOne({ _id: req.params.id }, {
				name: req.body.name,
				address: req.body.address,
				description: req.body.description,
				image: req.file.filename,
				phone: req.body.phone,
				cuisine: req.body.cuisine,
				email: req.body.email,
				user_id: req.body.user_id
			}, function (err, result) {
				if (err) {
					res.send(err);
				} else {
					fs.unlinkSync(`public/uploads/Restaurant/${req.params.img}`);
					res.redirect("/res_table");
				}
			});
		}
	
	});
}





exports.Delete = (req, res) => {
	Restaurant.deleteOne({_id: req.params.id }, function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/res_table");
		}
	});
}