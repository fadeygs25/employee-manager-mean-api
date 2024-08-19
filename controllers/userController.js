const User = require("../models/userModel");
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")


exports.signup = async (req, res, next) => {

    const { email, username } = req.body;
    const userExist = await User.findOne({ email, username });

    if (userExist) {

        return next(new ErrorResponse('E-mail already exists', 400))
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
        next(error);

    }


}

exports.forgotPass = async (req, res, next) => {
    const { email, OTP } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })
    const mailOption = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "KODING 101 PASSWORD RECOVERY",
        html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Koding 101 Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
    };

    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(info.response);
        }
    })
}

exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id);
    //if user exists
    const form = req.body.form;
    try {
        if (user) {
            //if you want to update username or email
            user.username = form.username || user.username;
            user.email = form.email || user.email;
            user.number = form.number || user.number;
            user.address = form.address || user.address;
            user.role = form.role || user.role;


            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                number: updatedUser.number,
                address: updatedUser.address,
            });

        } else {
            res.status(401).send({ message: 'User not Found!' });
        }
    } catch (error) {
        console.log(error);
        console.log(form);
        next(error);

    }
}


exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {

            return next(new ErrorResponse('E-mail and password are required', 400))
        }

        // check user e-mail
        const user = await User.findOne({ email });
        if (!user) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }

        generateToken(user, 200, res);
    }
    catch (error) {
        console.log(error);

        next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }

}

const generateToken = async (user, statusCode, res) => {

    const token = await user.jwtGenerateToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token })
}


//LOG OUT USER
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}



// USESR PROFILE 
exports.userProfile = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);
        res.send(user);
    } catch (error) {
        console.log(error);
        next(error);

    }

}




exports.allUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        next(error)

    }

}

// Count User 
exports.countUsers = async (req, res, next) => {
    try {

        const countUsers = await User.countDocuments();
        res.status(200).json({ count: countUsers });
    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.singleUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.json(user)

    } catch (error) {
        next(error)

    }

}

// delete User and User image in cloudinary
exports.deleteUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            message: " User deleted",
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}
