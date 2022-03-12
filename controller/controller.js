const User=require('../model/User');
const bcrypt=require('bcrypt');
const Job = require('../model/Job');

exports.checkServer=(req,res)=>{
    return res.status(200).json({"message":"Working fine"});
}

exports.login=(req,res)=>{
    if(req.body.email==""||req.body.email==null){
        return res.status(400).json({
            "message":"User ID missing"
        })
    }
    else if(req.body.password==""||req.body.password==null){
        return res.status(400).json({
            "message":"Password ID missing"
        })
    }
    else{
        User.findOne({email:req.body.email},(err,usr)=>{
            if(usr){
                return res.status(200).json({
                    "message":"Logged In",
                    "User":usr
                })
            }
            else{
                var ps=bcrypt.hashSync(req.body.password,10)
                User.create({
                    email:req.body.email,
                    password:ps,
                },(err,prof)=>{
                    if(prof){
                        res.status(200).json({
                            "message":"User Created",
                            "User":prof
                        });
                    }
                })
            }
        })
        
    }
}


exports.addJob=(req,res)=>{
    if(req.body.title==""||req.body.title==null){
        return res.status(400).json({
            "message":"Title missing"
        })
    }
    else if(req.body.description==""||req.body.description==null){
        return res.status(400).json({
            "message":"Description missing"
        })
    }
    else if(req.body.department==""||req.body.department==null){
        return res.status(400).json({
            "message":"Department missing"
        })
    }
    else if(req.body.field==[]||req.body.field==null){
        return res.status(400).json({
            "message":"Job Field missing"
        })
    }
    else if(req.body.qualification==[]||req.body.qualification==null){
        return res.status(400).json({
            "message":"Qualification missing"
        })
    }
    else if(req.body.category==[]||req.body.category==null){
        return res.status(400).json({
            "message":"Category missing"
        })
    }
    else if(req.body.posts==""||req.body.posts==null){
        return res.status(400).json({
            "message":"Posts missing"
        })
    }
    else if(req.body.salary==""||req.body.salary==null){
        return res.status(400).json({
            "message":"Salary missing"
        })
    }
    else{
        var field=[],qual=[],cate=[],reser=new Map();
        //console.log(req.body.qualification)
        req.body.qualification.forEach(element => {
            qual.push(element.type)
        });
        req.body.field.forEach(element => {
            field.push(element.type)
        });
        req.body.category.forEach(element => {
            cate.push(element.type)
        });

        req.body.reservation.forEach(element => {
            reser.set(element.type,element.seats)
        });
        
        Job.create({
            title:req.body.title,
            department:req.body.department,
            description:req.body.description,
            field:field,
            //applied is 0
            posts:req.body.posts,
            salary:req.body.salary,
            gender:req.body.gender,
            qualification:qual,
            category:cate,
            reservation:reser,
            experience:req.body.experience,
            state:req.body.state,
            age:req.body.age,
            tenure:req.body.tenure,
        },(err,usr)=>{
            if(err){
                return res.status(400).json({
                    "message":err
                });
            }
            else if(usr){
                return res.status(200).json({
                    "message":"Saved Data",
                    "data":usr
                });
            }
        });
        
    }
}


exports.apply=(req,res)=>{
    if(req.body.id==""||req.body.id==null){
        return res.status(400).json({
            "message":"Job ID missing"
        })
    }
    else if(req.body.usrid==""||req.body.usrid==null){
        return res.status(400).json({
            "message":"User ID missing"
        })
    }        
    else{
        Job.findById(req.body.id,(err,usr)=>{
            if(usr){
                var arr=usr.applied_id
                arr.push(req.body.usrid)
                //console.log(arr)
                Job.findByIdAndUpdate(req.body.id,{applied_id:arr,applied:usr.applied+1},{returnOriginal:false},(err,usr)=>{
                    if(usr){
                        return res.status(200).json({
                            "message":"Updated",
                            "data":usr
                        });
                    }
                })
            }
        })
        
    }
}