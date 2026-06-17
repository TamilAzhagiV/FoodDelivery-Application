const mongoose=require("mongoose");
const restaurantSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    restaurantName:{
        type:String,
        required:true
    },
    description:String,
    logo:String,
    address: {
        street: String,
        area: String,
        city: String,
        state: String,
        pincode: String,

        latitude: Number,
        longitude: Number
    },

    gstNumber: {
        type: String,
        required: true
    },

    fssaiLicenseNumber: {
        type: String,
        required: true
    },

    businessPhoneNumber: String,

    cuisineTypes: [String],

    openingTime: String,

    closingTime: String,

    isApproved: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

module.exports=mongoose.model("Restaurant",restaurantSchema)