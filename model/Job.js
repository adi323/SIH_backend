const mongoose=require('mongoose');
const Job=mongoose.Schema({
    applied_id:{
        type:Array,
        default:[],
        of:String,
    },
    title:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    field:[{
        type:String,
        required:true
    }],
    applied:{
        type:Number,
        required:true,
        default:0,
    },
    posts:{
        type:Number,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        default:'Open to all'
    },
    qualification: [{
        _id:false,
        type: String,
    }],
    category: [{
        _id:false,
        type: String,
    }],
    reservation: {
        type:Map,
        of:String,
        default:{}
    },
    experience: {
        type:Number,
        required:true,
        default:0
    },
    state:{
        type:String,
    },
    country:{
        type:String,
        required:true,
        default:"India"
    },
    age:{
        type:Number,
    },
    tenure:{
        type:Number,
    },
},{timestamps:true})

module.exports=mongoose.model('Job_Database',Job);