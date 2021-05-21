const Restaurant = require('../Models/restaurant.model');
const User = require('../Models/user.model');
const Order = require('../Models/order.model');
let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");

exports.TableData = async function (req, res) {
	const TempOrder = [];
	const Orders = [];
	const UserData = await User.find();
    const RestaurantData = await Restaurant.find();
	const OrderData = await Order.find();
    
	OrderData.forEach(Element => {
		TempOrder.push(Element);
	})
	TempOrder.forEach(order => {
        RestaurantData.forEach(rest => {
            UserData.forEach(users => {
                if (rest._id.toString() == order.restaurant_id.toString()) {
                     if (users._id.toString() == order.user_id.toString()) {
                        const OrdersData = {
                             RestName: rest.name,
                             RestAddress: rest.address,
                             RestPhone: rest.phone,
                             RestEmail: rest.email,
                             UserFristName: users.frist_name,
                             UserLastName: users.last_name,
                             UserEmail : users.email,
                            OrderName: 'cha Gathiya',
                            OrderId: order._id,
                             OrderAmount: order.amount,
                             OrderQty: order.qty,
                             OrderDate: order.Date,
                             OrderTime: order.Time,
                           
                        }
                         Orders.push(OrdersData);
                   }
                   
                }
            })
        })
    })
  //  console.log(Orders);
	res.render('order', {
		Orders: Orders
	});
};

exports.GeneratingPfd = async (req, res) => {
    const TempOrder = [];
	const Orders = [];
	const UserData = await User.find();
    const RestaurantData = await Restaurant.find();
	const OrderData = await Order.find();
    
	OrderData.forEach(Element => {
		TempOrder.push(Element);
	})
	TempOrder.forEach(order => {
        RestaurantData.forEach(rest => {
            UserData.forEach(users => {
                if (rest._id.toString() == order.restaurant_id.toString()) {
                     if (users._id.toString() == order.user_id.toString()) {
                        const OrdersData = {
                                RestName: rest.name,
                                RestAddress: rest.address,
                                RestPhone: rest.phone,
                                RestEmail: rest.email,
                                UserFristName: users.frist_name,
                                UserLastName: users.last_name,
                                UserEmail: users.email,
                                UserPhone:"987456321",
                                UserAddress: '299 Mueller Run Apt. 203',
                                OrderName: 'cha Gathiya',
                                OrderId: order._id,
                            Orderplace: order.Order_placed,
                            OrderAmount: order.amount,
                                OrderQty: order.qty,
                                OrderDate: order.Date,
                                OrderTime: order.Time,
                           
                        }
                         Orders.push(OrdersData);
                   }
                   
                }
            })
        })
    })

    ejs.renderFile(path.join(__dirname, '../Pdf/', "order-template.ejs"), {
        Orders: Orders
    }, (err, data) => {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },

            };
            pdf.create(data, options).toFile(path.join(__dirname, '../Pdf/',"Order.pdf"), function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully Visit Pdf Folder");
                }
            });
        }
    });
}