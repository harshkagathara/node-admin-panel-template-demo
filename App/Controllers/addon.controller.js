const Addons = require('../Models/addon.model');
const Restaurant = require('../Models/restaurant.model');
const AddonCategory = require('../Models/addonCate.model');

exports.TableData =  async function (req, res) {
    const TempData = [];
    const AddonsData = [];

	const AddonData = await Addons.find();
	const AddonCategoryData = await AddonCategory.find();

	AddonData.forEach(Element => {
		TempData.push(Element);
	})
	TempData.forEach(Element => {
		AddonCategoryData.forEach(iteam => {
			if(iteam._id.toString() == Element.addons_category_id.toString()) {
				const resdata = {
					AddonName: Element.name,
					AddonCateName: iteam.name,
					Addon_id: Element._id,
					price: Element.price
					
				}
				AddonsData.push(resdata);
		 }
		})
	})
    res.render('addon_table', {
        AddonsData:AddonsData
    });
};

exports.Create = async (req, res) => {
    try {
		const restaurant = await Restaurant.find();
        const addonCategory = await AddonCategory.find();
        res.render('addon_create',{restaurant: restaurant,addonCategory:addonCategory });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Save = async(req, res) => {
	if(!req.body.name) {
		return res.status(400).send({
			message: "Category Name can not be empty"
		});
	}
	const addon = new Addons(req.body);
    try {
        await addon.save();
		res.redirect("/addon_table");
    } catch (error) {
		res.render("addon_create");
	}
}


exports.Edit = async (req, res) => {
    try {
        const addon = await Addons.findOne({_id:req.params.id});
        const restaurant = await Restaurant.find();
        const addonCategory = await AddonCategory.find();
        res.render('addon_edit',{restaurant: restaurant,addonCategory:addonCategory ,addon:addon});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Update = async (req, res) => {
	try {
        const addons = await Addons.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!addons) {
            return res.status(404).send();
        }
		res.redirect("/addon_table");
    } catch (error) {
        res.status(500).send(error);
    }
	
}

exports.Delete = (req, res) => {
	Addons.deleteOne({_id: req.params.id }, function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/addon_table");
		}
	});
}