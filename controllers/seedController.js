const User = require("../models/userModel");
const Product = require("../models/productModel");
const data = require("../data");


exports.createSeed = async (req, res, next) => {
    //seed for users
    await User.remove({});
    const createdUser = await User.insertMany(data.users);

    //seed for products
    await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);

    res.send({ createdUser, createdProduct });
}

