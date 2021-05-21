const Restaurant = require('../Models/restaurant.model');
const User = require('../Models/user.model');
const AddonCategory = require('../Models/addonCate.model');
const Addons = require('../Models/addon.model');
const Dish = require('../Models/dish.model');
const DishCategory = require('../Models/dishCate.model');
const Coupons = require('../Models/coupons.model');


require('../DB');

seedUser();
seedRestaurant();
seedAddonCate();
seedAddon();
seedDish();
seedDishCate();
seedCoupon();


//Restaurant Seed
async function seedRestaurant(req, res) {
	Restaurant.remove({}, function() {
		console.log('Restaurant Colletion Cleared');
	});
	var Datas = [{
		"_id": "60a60d9e031bc32da8bda394",
		"name": "Janmangal Resort",
		"description": "Wondering that surat is having a nice rooftop place like this ,with such a delicious mouth watering food and the mocktails over here are must try things. The ambience is soo good that you really enjoy the fine dine vibes over here",
		"phone": "9773207150",
		"address": "515 Adajan Hajira Road Royal Trade Centre, 5th Floor, Surat 395009 India ",
		"cuisine": "a",
		"email": "janmangl@gmail.com",
		"user_id": "60a649ee15929c24a4c95697",
		"image": "1621420268923level-5-terrace-restro.jpg",
	}, {
		"_id": "60a6492615929c24a4c95692",
		"name": "Ghanshyam Food Corner",
		"description": "Rough stone walls, heavy wooden beams and hanging copper vessels conjure a northwest frontier feel at Vadodara's best restaurant, with loyal customers coming all the way from Ahmedabad and beyond. North Indian and clay-oven dishes are the speciality here; standouts include tandoori jhinga (prawns) and murgh malai (marinated chicken) kebabs, as well as imaginative stuffed naans. Book ahead.",
		"phone": " 0265-2330033",
		"address": "Manek Chowk, Ahmedabad 380001 India",
		"cuisine": "a",
		"email": "ghanshyam@gmail.com",
		"user_id": "609f6ccc0c196f0080605ec6",
		"image": "1621510438947logo.png",
	}, {
		"_id": "60a64b1999cf5b25a0603517",
		"name": "Shree Geeta Restaurant",
		"description": "On the rooftop terrace of the city’s finest heritage hotel, Agashiye's daily-changing, all-veg menu begins with a traditional welcome drink and is a cultural journey around the uniquely sweet Gujarati thali, with a multitude of diverse dishes delivered to your plate. It finishes with hand-churned ice cream. For dinner, book ahead.",
		"phone": "7896541230",
		"address": "House of MG Lal Darwaja",
		"cuisine": "a",
		"email": "shreegeetarestaurant@gmail.com",
		"user_id": "60a6499e15929c24a4c95694",
		"image": "1621510937530download.png"
	}, {
		"_id": "60a64bfe99cf5b25a0603518",
		"name": "Sahajanand Fast Food ",
		"description": "Advice and tips on travelling by an interest. Not sure where you want to go yet but interested in wildlife, world food, adventure travel, technology and travel gear, cycling holidays, family travel, budget travel, health tips, working overseas, gap years, diving, trekking and more. Ready to talk travel? We’re waiting. Get help, get connected, get inspired and have your say.",
		"phone": "7886541230",
		"address": "Opp Dangar College, Rajkot 360002 India",
		"cuisine": "a",
		"email": "sahajanandfastfood@gmail.com",
		"user_id": "60a649b715929c24a4c95695",
		"image": "1621511166853download (1).png",
	}, {
		"_id": "60a64c8299cf5b25a0603519",
		"name": "Nyalkaran Restaurant",
		"description": " There's also a small museum (admission ₹10) of traditional village-household items. An autorickshaw from central Ahmedabad costs about ₹150 return.",
		"phone": "9996541230",
		"address": "4 Way Morbi Rajkot - 363636",
		"cuisine": "s",
		"email": "Nyalkaran@gmail.com",
		"user_id": "60a649d715929c24a4c95696",
		"image": "1621511298454images (1).png",
	}, {
		"_id": "60a64cfb99cf5b25a060351a",
		"name": "Nilkanth Dham Restaurant",
		"description": "Nilkanth Dham Swaminarayan Temple is located at Poicha village on the bank of river Narmada which is about 80 kms from Bharuch and 60KM from Vadodara. It is beautiful swaminarayan temple constructed in large area and one of the most amazing pilgrimage attracts people around Gujarat. You can have divine experience by visiting Sahajanand universe, Nilkanth dham and surrounding",
		"phone": "8985241230",
		"address": "Nilkanth Dham Swaminarayan Temple is about 80 kms from Bharuch and 60KM from Vadodara.",
		"cuisine": "i",
		"email": "nilkanthdham@gmail.com",
		"user_id": "609f6ccc0c196f0080605ec6",
		"image": "1621511419882images.jpg",
	}];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new Restaurant(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("Restaurant Colletion Seeded");
}
//User Seed
async function seedUser(req, res) {
	User.remove({}, function() {
		console.log('User Colletion Cleared');
	});
	var Datas = [{
		"_id": "60a6499e15929c24a4c95694",
		"frist_name": "Darshan",
		"last_name": "Makashana",
		"email": "darshan@gmail.com",
		"role": "admin",
		"password": "1234"
	}, {
		"_id": "60a649b715929c24a4c95695",
		"frist_name": "Parag",
		"last_name": "Kavar",
		"email": "paragkavar@gmail.com",
		"role": "admin",
		"password": "1234"
	}, {
		"_id": "60a649d715929c24a4c95696",
		"frist_name": "Dhiraj ",
		"last_name": "Baldewa",
		"email": "dhiraj@gmail.com",
		"role": "admin",
		"password": "1234"
	}, {
		"_id": "60a649ee15929c24a4c95697",
		"frist_name": "Adarsh",
		"last_name": "Bhoraniya",
		"email": "adarsh@gmail.com",
		"role": "admin",
		"password": "1234"
	}, {
		"_id": "60a649ee15929c24a4c95857",
		"frist_name": "Admin",
		"last_name": "Admin",
		"email": "admin@gmail.com",
		"role": "admin",
		"password": "admin"
	}, {
		"_id": "609f6ccc0c196f0080605ec6",
		"frist_name": "Kishan",
		"last_name": "Kotadiya",
		"email": "kishan@gmail.com",
		"role": "admin",
		"password": "1234"
	}];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new User(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("User Colletion Seeded");
}

//AddonCate Seed
async function seedAddonCate(req, res) {
	AddonCategory.remove({}, function() {
		console.log('Addon Category Colletion Cleared');
	});
	var Datas = [{
			"_id": "60a651f23f1f3503347a401b",
			"name": "Mirch - Chili",
			"type": "SINGLE",
		},
		{
			"_id":"60a653df3f1f3503347a401c",
			"name": "Child & Fresh Water",
			"type": "SINGLE",
		},
		{
			"_id": "60a653e93f1f3503347a401d",
			"name": "Milk",
			"type": "SINGLE",
		},
		{
				"_id":"60a6550f3f1f3503347a4024" ,
				"name": "Full Cream Milk",
				"type": "MULTIPLE",
		},
		{
			"_id": "60a654f93f1f3503347a4023",
			"name": "Toned Milk",
			"type": "SINGLE",
		},
		{
			"_id":"60a6543b3f1f3503347a4022",
			"name": "Stretched curd cheeses",
			"type": "SINGLE",
		},
		{
			"_id":"60a6542e3f1f3503347a4021",
			"name": "Fresh and whey cheeses",
			"type": "MULTIPLE",
		},
		{
			"_id":"60a6540f3f1f3503347a4020",
			"name": "Beer",
			"type": "MULTIPLE",
		},
		{
			"_id":"60a654063f1f3503347a401f",
			"name": "Juice and juice drinks",
			"type": "MULTIPLE",
		},
		{
			"_id":"60a653f93f1f3503347a401e",
			"name": "Soft drinks",
			"type": "MULTIPLE",
		}
			
	];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new AddonCategory(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("Addon Category Colletion Seeded");
}

// Addon Seed
async function seedAddon(req, res) {
	Addons.remove({}, function() {
		console.log('Addon  Colletion Cleared');
	});
	var Datas = [
		{
			"_id": "60a655303f1f3503347a4025",
			"restaurant_id": "60a60d9e031bc32da8bda394",
			"name": "Milk",
			"addons_category_id": "60a654f93f1f3503347a4023",
			"price": "150",
		},
		{
			"_id": "60a655443f1f3503347a4026",
			"restaurant_id": "60a6492615929c24a4c95692",
			"name": "Water",
			"addons_category_id": "60a653df3f1f3503347a401c",
			"price": "150",
		},
		{
			"_id": "60a6558b3f1f3503347a4027",
			"restaurant_id": "60a64cfb99cf5b25a060351a",
			"name": "Drinks",
			"addons_category_id": "60a653f93f1f3503347a401e",
			"price": "40",
		},
		{
			"_id": "60a655ab3f1f3503347a4028",
			"restaurant_id": "60a64bfe99cf5b25a0603518",
			"name": "Cheese",
			"addons_category_id": "60a6543b3f1f3503347a4022",
			"price": "90",
		},
		{
			"_id": "60a655c23f1f3503347a4029",
			"restaurant_id": "60a64b1999cf5b25a0603517",
			"name": "Juice",
			"addons_category_id": "60a654063f1f3503347a401f",
			"price": "500",
		},
		
			
	];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new Addons(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("Addon Colletion Seeded");
}

//Dish  Seed
async function seedDish(req, res) {
	Dish.remove({}, function() {
		console.log('Dish  Colletion Cleared');
	});
	var Datas = [
		{
			"_id": "60a658c23f1f3503347a4031",
			"image": "1621514434474download (4).jpg",
			"restaurant_id": "60a60d9e031bc32da8bda394",
			"name": "Bharwa Bhindi",
			"description": "Okra is a vegetable we all love, and this stuffed version is the king of all bhindi dishes in this country.",
			"price": "350",
			"discount_price": "20",
			"dish_category_id": "60a6565e3f1f3503347a402a",
			"addons_category_id": "60a651f23f1f3503347a401b"
		},
		{
			"_id": "60a658f63f1f3503347a4032",
			"image": "1621514486781download (5).jpg",
			"restaurant_id": "60a6492615929c24a4c95692",
			"name": " Pindi Chana",
			"description": "Rawalpindi might be in Pakistan now, but we're glad we can get a bite of this spicy Punjabi dish any day.",
			"price": "369",
			"discount_price": "05",
			"dish_category_id": "60a6578d3f1f3503347a402e",
		 	"addons_category_id": "60a6543b3f1f3503347a4022"
		},
		{
			"_id": "60a659403f1f3503347a4033",
			"image": "1621514560591download (6).jpg",
			"restaurant_id": "60a64b1999cf5b25a0603517",
			"name": "Dhokla",
			"description": "Gujaratis have given us this soft and delicious snack, and the nation goes gaga over them, and for good reason.",
			"price": "50",
			"discount_price": "02",
			"dish_category_id": "60a6578d3f1f3503347a402e",
		 	"addons_category_id": "60a653df3f1f3503347a401c"
		},
		{
			"_id": "60a659d73f1f3503347a4035",
			"image": "1621514711819download (8).jpg",
			"restaurant_id": "60a64c8299cf5b25a0603519",
			"name": "Aamras",
			"description": "We Indians are crazy about mango, and this delicious dish celebrates everything we love about the golden fruit.",
			"price": "50",
			"discount_price": "02",
			"dish_category_id": "60a6580d3f1f3503347a4030",
			"addons_category_id": "60a653e93f1f3503347a401d"
		},
		{
			"_id": "60a65a243f1f3503347a4036",
			"image": "1621514788379download (9).jpg",
			"restaurant_id": "60a6492615929c24a4c95692",
			"name": "Hyderabadi Biryani",
			"description": "This biryani from Hyderabad is one of the best made in this country.",
			"price": "150",
			"discount_price": "05",
			"dish_category_id": "60a657d33f1f3503347a402f",
			"addons_category_id": "60a6542e3f1f3503347a4021"
		},
		{
			"_id": "60a659813f1f3503347a4034",
			"image": "1621514625016download (7).jpg",
			"restaurant_id": "60a64c8299cf5b25a0603519",
			"name": "Pooran Poli",
			"description": "If stuffed breads are your thing, you need to have a good dose of this traditional Maharashtrian dish in your life.",
			"price": "50",
			"discount_price": "09",
			"dish_category_id": "60a6570d3f1f3503347a402c",
			"addons_category_id":"60a6543b3f1f3503347a4022"
		}
		
			
	];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new Dish(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("Dish Colletion Seeded");
}

//Dish Category  Seed
async function seedDishCate(req, res) {
	DishCategory.remove({}, function() {
		console.log('Dish Category  Colletion Cleared');
	});
	var Datas = [
		{
			"_id": "60a6565e3f1f3503347a402a",
			"image": "1621513822956download.jpg",
			"name": "Ethnic",
			"restaurant_id": "60a6492615929c24a4c95692"
		},
		{
			"_id": "60a6568a3f1f3503347a402b",
			"image": "1621513866576Fastfood.jpg",
			"name": "Fast Food",
			"restaurant_id": "60a64bfe99cf5b25a0603518"
		},
		{
			"_id": "60a6570d3f1f3503347a402c",
			"image": "1621513997277download (1).jpg",
			"name": "Afghan Food",
			"restaurant_id": "60a6492615929c24a4c95692"
		},
		{
			"_id": "60a657433f1f3503347a402d",
			"image": "1621514051943images (1).jpg",
			"name": "Australian Food",
			"restaurant_id": "60a64cfb99cf5b25a060351a"
		},
		{
			"_id": "60a6578d3f1f3503347a402e",
			"image": "1621514125674download (2).jpg",
			"name": "Gujarati Dish",
			"restaurant_id": "60a60d9e031bc32da8bda394"
		},
		{
			"_id": "60a657d33f1f3503347a402f",
			"image": "1621514195965download (3).jpg",
			"name": "South Indian Food",
			"restaurant_id": "60a6492615929c24a4c95692"
		},
		{
			"_id": "60a6580d3f1f3503347a4030",
			"image": "1621514253761images (2).jpg",
			"name": "North  Indian Food",
			"restaurant_id": "60a64c8299cf5b25a0603519"
		}
	];
	for(var i = 0; i < Datas.length; i++) {
		var newEvent = new DishCategory(Datas[i]);
		console.log(newEvent);
		await newEvent.save();
	}
	console.log("Dish Category Colletion Seeded");
}

// Coupon seed
async function seedCoupon(req, res) {
	Coupons.remove({}, function() {
		console.log('Dish Category  Colletion Cleared');
	});
	var Datas = [
		{
			"_id": "60a74cad3e65db26483147fa",
			"name": "Janmangal Resort Special",
			"description": "CD Exclusive: Get Free McAloo Tikki + Fries on Order above Rs 349",
			"restaurant_id": "60a60d9e031bc32da8bda394",
			"coupon_code": "jmd1235",
			"discount_type": "FIXED",
			"discount": "1500",
			"expiry_date": "2021-05-07",
			"max_usage": "02"
		}
];
for(var i = 0; i < Datas.length; i++) {
	var newEvent = new Coupons(Datas[i]);
	console.log(newEvent);
	await newEvent.save();
}
console.log("Coupons Colletion Seeded");
}
