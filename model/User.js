const mongoose=require('mongoose');
const User=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true,
        default:Date.now,
    },
    gender:{
        type:String,
        required:true,
        default:'Male'
    },
    age:{
        type:Number,
    },
    qualification: [{
        _id:false,
        type: Number,
        institution: String,
        grade: String,
        year:Date.year,
    }],
    experience: [{
        _id:false,
        type: Number,
        institution: String,
        grade: String,
        year:Date.year,
    }],
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    adhaar:{
        type:String,
        required:true,
        default:"Not Given"
    },
    file:{
        type:String,
    },
},{timestamps:true})

module.exports=mongoose.model('User_profile',User);