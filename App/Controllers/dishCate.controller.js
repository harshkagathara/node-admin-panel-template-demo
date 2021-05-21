const DishCategory = require('../Models/dishCate.model');
const Restaurant = require('../Models/restaurant.model');
const fs = require('fs');

const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
	  callback(null, './public/uploads');
	},
	filename: function (request, file, callback) {
	  callback(null, Date.now() + file.originalname);
	},
});
  
exports.TableData = async function (req, res) {
	const TempDishCate = [];
	const dishCategory = [];
	const DishCategoryData = await DishCategory.find();
	const RestaurantData = await Restaurant.find();

	RestaurantData.forEach(Element => {
		TempDishCate.push(Element);
	})
	TempDishCate.forEach(Element => {
		DishCategoryData.forEach(iteam => {
			if(iteam.restaurant_id.toString() == Element._id.toString()) {
				const dishData = {
					DishCateName: iteam.name, 
					RestName: Element.name,
					DishCateId: iteam._id,
					image: iteam.image
				}
				dishCategory.push(dishData);
		 }
		})
	})
	res.render('dish_category_table', {
		dishCategory: dishCategory
	});
};

exports.Create = (req, res) => {
    Restaurant.find().exec(function(err, restaurant) {
		if(err) {
			console.log("Error:", err);
		} else {
				res.render('dish_category_create', {
					restaurant: restaurant
				  });
		}
	});
}

exports.Save = async (req, res) => {

	
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
	upload(req, res, async function (err) {
		console.log(req.file);
		const dishCategorys = new DishCategory({
			image: req.file.filename,
			name: req.body.name,
			restaurant_id: req.body.restaurant_id,
		
		});
		try {
			dishCategorys.save();
			res.redirect("dish_category_table");
		}
		catch {
			res.render("dish_category_create");
		}
	})
}


exports.Edit = async(req, res) => {
	try {
		const dishCategory = await DishCategory.findOne({ _id: req.params.id });
		const restaurant = await Restaurant.find();
		console.log(dishCategory);
		if (!dishCategory) {
            return res.status(404);
        }
        res.render('dish_category_edit',{restaurant:restaurant,dishCategory:dishCategory});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Update = async (req, res) => {
	let upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 3 }, }).single('image');
	upload(req, res, async function (err) {
		if (!req.body.imgchecker) {
			let imageDATA = await DishCategory.findById(req.params.id);
			await DishCategory.updateOne({ _id: req.params.id }, {
				image: imageDATA.image,
				name: req.body.name,
				restaurant_id: req.body.restaurant_id,
			
			}, function (err, result) {
				if (err) {
					res.send("err" + err);
				} else {
					res.redirect("/dish_category_table");
				}
			});
		}
		else {
			await DishCategory.updateOne({ _id: req.params.id }, {
				image: req.file.filename,
				name: req.body.name,
				restaurant_id: req.body.restaurant_id,
			}, function (err, result) {
				if (err) {
					res.send(err);
				} else {
					fs.unlinkSync(`public/uploads/${req.params.img}`);
					res.redirect("/dish_category_table");
				}
			});
		}
	});
}

exports.Delete =async (req, res) => {
	try {
        const dishCategory = await DishCategory.deleteOne(req.params.id);
        if (!dishCategory) {
            return res.status(404).send();
        }
		fs.unlinkSync(`public/uploads/${req.params.img}`);
		res.redirect("/dish_category_table");
    } catch (error) {
        res.status(500).send(error);
    }

}
