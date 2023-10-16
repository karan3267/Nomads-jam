const mongoose= require("mongoose");
const bcrypt=require("bcrypt")




const user = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        private:true
    }
})

user.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hash)=>{
            if(err) return next(err);
            this.password=hash;
            next();
        })
    }
})

const userModel= mongoose.model("user",user);

module.exports=userModel;