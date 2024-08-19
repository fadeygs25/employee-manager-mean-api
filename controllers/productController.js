const Product = require("../models/productModel");



exports.createProduct = async (req, res, next) => {

    const { name, price, size } = req.body;

    try {
        const product = await Product.create({
            name,
            price,
            size,
        });
        res.status(201).json({
            success: true,
            product
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.displayProduct = async (req, res, next) => {


    try {
        const products = await Product.find();
        res.json(products)

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.countProducts = async (req, res, next) => {


    try {
        const countProducts = await Product.countDocuments();
        res.status(200).json({ count: countProducts });


    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.findProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found!" });
        }
    } catch (error) {
        console.log(error);
        next(error);

    }

}


exports.searchProduct = async (req, res, next) => {

    try {
        const products = await Product.find({ name: req.params.id });
        console.log(products);
        res.status(201).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        next(error);

    }

}

// Update product image in Cloudinary and product data in MongoDB.
exports.updateProduct = async (req, res, next) => {
    try {
        //current product
        const currentProduct = await Product.findById(req.params.id);
        const form = req.body.form
        //build the data object
        const data = {
            name: form.name,
            description: form.description,
            price: form.price,
            image: form.image
        }
        //modify image conditionnally
        if (req.body.image !== '') {
            const ImgId = currentProduct.image_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }

            const newImage = await cloudinary.uploader.upload(req.body.image, {
                folder: "products",
                width: 1000,
                crop: "scale"
            });

            data.image = newImage.secure_url;
            data.image_id = newImage.public_id
        }

        const productUpdate = await Product.findOneAndUpdate(req.params.id, data, { new: true })

        res.status(200).json({
            success: true,
            productUpdate
        })


    } catch (error) {
        console.log(error);
        next(error);
    }

}



// delete product and product image in cloudinary
exports.deleteProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);
        //retrieve current image ID
        const imgId = product.image_id;
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }

        const rmProduct = await Product.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: " Product deleted",

        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}





// display category
exports.productCategory = async (req, res, next) => {

    try {
        const cat = await Product.find().populate('category', 'name').distinct('category');
        res.status(201).json({
            success: true,
            cat
        })

    } catch (error) {
        console.log(error);
        next(error);
    }

}




