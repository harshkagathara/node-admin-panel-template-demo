const DishCategory = require('../Models/dishCate.model');
const Restaurant = require('../Models/restaurant.model');
const AddonCategory = require('../Models/addonCate.model');
const Dish = require('../Models/dish.model');
const fs = require('fs');

const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
	  callback(null, './public/uploads/Dish');
	},
	filename: function (request, file, callback) {
	  callback(null, Date.now() + file.originalname);
	},
  });
  

exports.TableData = async function(req, res) {
	const TempRes = [];
	const restaurantName = [];
	const RestaurantData = await Restaurant.find();
	const addonCateData = await AddonCategory.find();
	const DishaCateData = await DishCategory.find();
	const DishaData = await Dish.find();
	DishaData.forEach(Element => {
		TempRes.push(Element);
	})
	TempRes.forEach(Element => {
		RestaurantData.forEach(iteam => {
			addonCateData.forEach(addoniteam => {
				DishaCateData.forEach(DishCateiteam => {
					if(iteam._id.toString() == Element.restaurant_id.toString()) {
						if(addoniteam._id.toString() == Element.addons_category_id.toString()) {
							if(DishCateiteam._id.toString() == Element.dish_category_id.toString()) {
								const resdata = {
									DishName: Element.name,
									RestName: iteam.name,
									Dish_id: Element._id,
									Dish_price: Element.price,
									image: Element.image,
									AddonCateName: addoniteam.name,
									DishCateName: DishCateiteam.name,
								}
								restaurantName.push(resdata);
							}
						}
					}
				})
			})
		})
	})
	res.render('dish_table', {
		restaurantName: restaurantName
	});
};
exports.Create = async(req, res) => {
	const restaurant = [];
	const addonCategory = [];
	const dishCategory = [];
	const RestData = await Restaurant.find();
	const addonCateData = await AddonCategory.find();
	const DishaCateData = await DishCategory.find();
	RestData.forEach(Element => {
		restaurant.push(Element);
	})
	addonCateData.forEach(Element => {
		addonCategory.push(Element);
	})
	DishaCateData.forEach(Element => {
		dishCategory.push(Element);
	})
	res.render('dish_create', {
		restaurant: restaurant,
		addonCategory: addonCategory,
		dishCategory: dishCategory
	});
}
exports.Save = async (req, res) => {
	
		let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
		upload(req, res, async function (err) {
		
			const dishCategorys = new Dish({
				image: req.file.filename,
				restaurant_id: req.body.restaurant_id,
				name: req.body.name,
				description: req.body.description,
				is_veg: req.body.is_veg,
				price: req.body.price,
				discount_price: req.body.discount_price,
				dish_category_id: req.body.dish_category_id,
				addons_category_id: req.body.addons_category_id,
			});
			try {
				dishCategorys.save();
				res.redirect("dish_table");
			}
			catch {
				res.render("dish_create");
			}
		})
	
}

exports.Edit = async (req, res) => {

	const restaurant = [];
	const addonCategory = [];
	const dishCategory = [];
	const RestData = await Restaurant.find();
	const addonCateData = await AddonCategory.find();
	const DishaCateData = await DishCategory.find();
	const dish = await Dish.findOne({ _id: req.params.id });
	RestData.forEach(Element => {
		restaurant.push(Element);
	})
	addonCateData.forEach(Element => {
		addonCategory.push(Element);
	})
	DishaCateData.forEach(Element => {
		dishCategory.push(Element);
	})
	
	res.render('dish_edit', {
		restaurant: restaurant,
		addonCategory: addonCategory,
		dishCategory: dishCategory,
		dish:dish
	});

}

exports.Update = async (req, res) => {
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
	upload(req, res, async function (err) {
		if (!req.body.imgchecker) {
			let imageDATA = await Dish.findById(req.params.id);
			await Dish.updateOne({ _id: req.params.id }, {
				image: imageDATA.image,
				restaurant_id: req.body.restaurant_id,
				name: req.body.name,
				description: req.body.description,
				is_veg: req.body.is_veg,
				price: req.body.price,
				discount_price: req.body.discount_price,
				dish_category_id: req.body.dish_category_id,
				addons_category_id: req.body.addons_category_id,
		
			}, function (err, result) {
				if (err) {
					res.send("err"+err);
				} else {
					res.redirect("/dish_table");
				}
			});

	
		}
		else{
			await Dish.updateOne({ _id: req.params.id }, {
				restaurant_id: req.body.restaurant_id,
				name: req.body.name,
				description: req.body.description,
				is_veg: req.body.is_veg,
				price: req.body.price,
				discount_price: req.body.discount_price,
				dish_category_id: req.body.dish_category_id,
				addons_category_id: req.body.addons_category_id,
				image:req.file.filename
			}, function (err, result) {
				if (err) {
					res.send(err);
				} else {
					fs.unlinkSync(`public/uploads/Dish/${req.params.img}`);
					res.redirect("/dish_table");
				}
			});
		}
	});
}


exports.Delete = async (req, res) => {
	fs.unlinkSync(`public/uploads/Dish/${req.params.img}`);
	try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) {
            return res.status(404).send();
		}
		
		res.redirect("/dish_table");
    } catch (error) {
        res.status(500).send(error);
    }

}
