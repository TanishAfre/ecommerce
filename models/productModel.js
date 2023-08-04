const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brend: {
        type: String,
        enum: ["Apple","Samsung","Lenovo"],
    },
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images:{
            ype: Array,
    },
    color: {
        type: String,
        enum: ["Black","Brown","Red"],
    },
    ratings:[{
        star: Number,
        postedby: {
            type: mongoose.Schema.Types.ObjectId,
            referance: "User",
        },
    },],   
},
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Product', productSchema);