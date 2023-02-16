const mongoose=require("mongoose");

// forming schema of todolist items 

const TodoSchema=new mongoose.Schema({
    todoItem:{
        type:String,
        required:true,
    },completed:{
        type:Boolean,
        default:false
    },
})

// exporting schema so that we can use this in different files 

const user=mongoose.model('User',TodoSchema);
module.exports=user;