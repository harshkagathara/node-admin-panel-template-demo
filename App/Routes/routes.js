module.exports = (app) => {
    
    const redirectLogin = require('../Middlewares/redirectLogin');


    const RestaurantController = require('../Controllers/restaurant.controller');
    const CouponeController = require('../Controllers/coupon.controller');
    const AuthController = require('../Controllers/auth.controller');
    const AddonCateController = require('../Controllers/addonCate.controller');
    const AddonController = require('../Controllers/addon.controller');
    const DishCateController = require('../Controllers/dishCate.controller');
    const DishController = require('../Controllers/dish.controller');
    const HomeController = require('../Controllers/home.controller');
    const OrderController = require('../Controllers/order.controller');
    
//    app.get('/', HomeController.Index);
    app.get('/', redirectLogin, HomeController.Index)
  
  app.get('/order', OrderController.TableData);
  app.get('/order/pdf', OrderController.GeneratingPfd);
  app.get('/Pdf',(req,res)=>{res.render('Order.pdf')} )
   
    app.get('/user_table', (req, res) => { res.render('user_table'); })
    app.get('/wepppi_table', (req, res) => { res.render('wepppi_table'); })
    app.get('/owner_table', (req, res) => { res.render('owner_table'); })
    app.get('/seting', (req, res) => { res.render('seting'); })
   
    app.get('/res_table', RestaurantController.TableData)
    app.get('/restaurant_create', RestaurantController.Create);
    app.post('/restaurant_save',RestaurantController.Save);
    app.get('/restaurant_edit/:id', RestaurantController.Edit);
    app.post('/restaurant_update/:id/:img', RestaurantController.Update);
    app.get('/restaurant_delete/:id/:img', RestaurantController.Delete)

    app.get('/dish_table', DishController.TableData);
    app.get('/dish_create', DishController.Create);
    app.post('/dish_save', DishController.Save);
    app.get('/dish_edit/:id', DishController.Edit);
    app.post('/dish_update/:id/:img', DishController.Update);
    app.get('/dish_delete/:id/:img', DishController.Delete);

    app.get('/dish_category_table', DishCateController.TableData);
    app.get('/dish_category_create', DishCateController.Create);
    app.post('/dish_category_save', DishCateController.Save);
    app.get('/dish_category_edit/:id', DishCateController.Edit);
    app.post('/dish_category_update/:id/:img', DishCateController.Update);
    app.get('/dish_category_delete/:id/:img', DishCateController.Delete);

    app.get('/addon_table',AddonController.TableData)
    app.get('/addon_create', AddonController.Create);
    app.post('/addon_save', AddonController.Save);
    app.get('/addon_edit/:id', AddonController.Edit);
    app.post('/addon_update/:id', AddonController.Update);
    app.get('/addon_delete/:id', AddonController.Delete);
   
    app.get('/addon_categoty_table', AddonCateController.TableData);
    app.get('/addon_categoty_create', AddonCateController.Create);
    app.post('/addon_categoty_save', AddonCateController.Save);
    app.get('/addon_categoty_edit/:id', AddonCateController.Edit);
    app.post('/addon_categoty_update/:id', AddonCateController.Update);
    app.get('/addon_categoty_delete/:id', AddonCateController.Delete);

    app.get('/coupons_table', CouponeController.TableData);
    app.get('/coupons_create', CouponeController.Create);
    app.post('/coupon_save', CouponeController.Save);
    app.get('/coupon_edit/:id', CouponeController.Edit);
    app.post('/coupon_update/:id', CouponeController.Update);
    app.get('/coupon_delete/:id', CouponeController.Delete);

    app.get('/auth-login', (req, res) => { res.render('auth-login'); })
    app.get('/auth-register', (req, res) => { res.render('auth-register'); })
    app.get('/auth-forgot-password', (req, res) => { res.render('auth-forgot-password'); })
    app.post('/auth-password-check', AuthController.Forgot_Password);
    app.post('/auth-check', AuthController.authCheck);
    app.post('/register-save', AuthController.Register);
    app.get('/logout', AuthController.logout);

}