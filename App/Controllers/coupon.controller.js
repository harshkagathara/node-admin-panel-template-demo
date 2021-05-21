const { restart } = require('nodemon');
const Coupons = require('../Models/coupons.model');
const Restaurant = require('../Models/restaurant.model');



exports.TableData = async function (req, res) {
	const TempData = [];
	const CoupnData = [];
	const Coupdata = await Coupons.find();
	const Restaurantdata = await Restaurant.find();

	Coupdata.forEach(Element => {
		TempData.push(Element);
	})
	TempData.forEach(Element => {
		Restaurantdata.forEach(iteam => {
			if(iteam._id.toString() == Element.restaurant_id.toString()) {
				const resdata = {
					CoupName: Element.name,
					ResName: iteam.name,
					coupn_id: Element._id,
					couponCode: Element.coupon_code,
					discount_type: Element.discount_type,
					expiry_date:Element.expiry_date
				}
				CoupnData.push(resdata);
		 }
		})
	})
	res.render("coupons_table", {
		CoupnData: CoupnData
	});
};

exports.Create = async(req, res) => {
	try {
		const restaurant = await Restaurant.find();

        res.render('coupons_create',{restaurant:restaurant});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Save = async (req, res) => {
	if(!req.body.name) {
		return res.status(400).send({
			message: "Coupon Name can not be empty"
		});
	}

	const coupon = new Coupons(req.body);
    try {
       await coupon.save();
		res.redirect("coupons_table");
    } catch (error) {
		res.render("coupons_create");
	}
}


exports.Edit = async(req, res) => {
	try {
		const coupon = await Coupons.findOne({ _id: req.params.id });
		const restaurant = await Restaurant.find();
	
		if (!coupon) {
            return res.status(404);
        }
        res.render('coupons_edit',{restaurant:restaurant,coupon:coupon});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Update =async (req, res) => {
	try {
        const coupon = await Coupons.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!coupon) {
            return res.status(404).send();
        }
		res.redirect("/coupons_table");
    } catch (error) {
        res.status(500).send(error);
    }
	
}



exports.Delete = (req, res) => {
	coupon.deleteOne({_id: req.params.id }, function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/coupons_table");
		}
	});
}