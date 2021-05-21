const User = require('../Models/user.model');
var nodemailer = require('nodemailer');
require('dotenv').config();

exports.authCheck = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, data) {
        if (data) {
            if (data.password == req.body.password) {
                req.session.UserId = data._id,
                    req.session.Email = data.email;
                res.send({
                    "Message": "Success!"
                });
            } else {
                res.send({
                    "Message": "Wrong password!"
                });
            }
        } else {
            res.send({
                "Message": "This Email Is not regestered!"
            });
        }
    });

}

exports.Register = (req, res) => {
    if (req.body.password === req.body.passwordConfirm) {
        User.findOne({
            email: req.body.email
        }, function (err, data) {
            if (!data) {
                const users = new User(req.body);

                users.save().then(data => {
                    res.send({
                        "Message": "Success"
                    });
                }).catch(err => {
                    console.log(err);
                });

            } else {
                res.send({
                    "Message": "Email is already used"
                });
            }
        })
    } else {
        res.send({
            "Message": "password is not matched"
        });
    }
}


exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth-login');
};

exports.Forgot_Password = async (req, res) => {
    const Email = await User.findOne({ email: req.body.email });
    if (Email) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.Password
            }
        });

        var mailOptions = {
            from: process.env.Email,
            to: req.body.email,
            subject: 'Sending Email BY Dev Harsh Kagathara',
            text: 'Your Credentials is Email :- '+req.body.email+ ' Password :-'+Email.password
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("hy");
                res.send({
                    "Message": "Success!"
                });
            }
        });
    } else {
        res.send({
            "Message": "This Email is Not Registered"
        });
    }
   

}