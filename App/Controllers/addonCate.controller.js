const AddonCategory = require('../Models/addonCate.model');

exports.TableData = async function(req, res) {
	const addonCategory = await AddonCategory.find();
	res.render('addon_categoty_table', { addonCategory: addonCategory });
};

exports.Create = (req, res) => {
    res.render('addon_categoty_create')
}

exports.Save = async (req, res) => {
	if(!req.body.name) {
		return res.status(400).send({
			message: "Category Name can not be empty"
		});
	}
	const addonCategory = new AddonCategory(req.body);
	try {
		addonCategory.save();
		res.redirect("addon_categoty_table");
	 }
	catch {
		res.render("addon_create");
	}
}


exports.Edit = async (req, res) => {
    try {
        const addonCategory = await AddonCategory.findOne({_id:req.params.id});
        res.render('addon_categoty_edit',{addonCategory:addonCategory});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.Update = async (req, res) => {
	try {
        const addonCategory = await AddonCategory.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!addonCategory) {
            return res.status(404).send();
        }
		res.redirect("/addon_categoty_table");
    } catch (error) {
        res.status(500).send(error);
    }
	
}




exports.Delete = (req, res) => {
	addonCategory.deleteOne({_id: req.params.id }, function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/addon_categoty_table");
		}
	});
}