const mongoose=require("mongoose");
const customerProfileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    addresses:[
        {
            label:{
                type:String,
                enum:["HOME","WORK","OTHER"],
                default:"HOME"
            },
            street:String,
            area: String,
            city: String,
            state: String,
            pincode: String,
            landmark: String,
            latitude: Number,
            longitude: Number
        }
    ],
    preferences:{
        vegetarian:{
            type:Boolean,
            default:false
        },
        favouriteCuisines:[String]
    },
    profileImage:String
},{
    timestamps:true
});
module.exports=mongoose.model("CustomerProfile",customerProfileSchema)