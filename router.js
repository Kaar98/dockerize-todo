const express=require("express");
const router=express.Router();
const User=require('./todoschema');

// request to create an item of todo list 
router.post('/create',async (req,res)=>{
    const {todoItem}=req.body;
    if(!todoItem){
        res.status(404).json("Invalid Item");
        return;
    }
    const user=new User({todoItem});
    try{
        await user.save();
        res.status(200).json("item saved");
    }catch(err){
        res.status(404).json("item not saved",err);
    }
})

// request to edit a todo item 
router.put('/:id/update',async (req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        res.status(200).json("User updated successfully");
    }catch(err){
        res.status(402).json(err);
        return;
    }
})

// request to delete a todo item 
router.delete('/:id/delete',async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
    }catch(err){
        res.status(402).json(err);
        return;
    }
})

// get all items to display on screen 
router.get('/allItems',async(req,res)=>{
    try{
        const items=await User.find();
        res.status(200).json(items);
    }catch(err){
        res.status(402).json(err);
        return;
    }

})

// request to check whether task is complete/incomplete 
router.put("/:id/complete", async (req, res) => {
    try {
      const item = await User.findById(req.params.id);
      if (!item.completed) {
        item.completed=true;
        await item.save();
        res.status(200).json("The task has been comppleted");
      } else {
        item.completed=false;
        await item.save();
        res.status(200).json("The task is incomplete currently.");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  });

module.exports=router;