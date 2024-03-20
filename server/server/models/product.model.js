const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	title: String,
	price: Number,
	description: String,
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;