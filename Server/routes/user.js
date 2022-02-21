const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const Post =  mongoose.model("Post")
const User = mongoose.model("User")



router.get('/profile/:userid',requireLogin,async(req,res)=>{
     const user = await User.findOne({_id: req.params.userid}).select("-password")
     const posts = await Post.find({postedBy: req.params.userid})
     res.json({user,posts})
})


router.put('/follow/:userid',requireLogin,async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.userid,{
        $push:{followers:req.user._id}
    },{
        new:true
    })
   const currUser = await User.findByIdAndUpdate(req.user._id,{
    $push:{following:req.params._id}
    },{
        new:true
    })

res.status(200).json(user)
})

router.put('/unfollow/:userid',requireLogin,async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.userid,{
        $pull:{followers:req.user._id}
    },{
        new:true
    })
   const currUser = await User.findByIdAndUpdate(req.user._id,{
    $pull:{following:req.params._id}
    },{
        new:true
    })

res.status(200).json(user)
})


router.get('/myprofile',requireLogin,(req,res)=>{
    User.findOne({_id:req.user._id})
    .populate('followers')
    .populate('following')
    .then(user=>{
        res.json(user)
    })
    .catch(err=>{
        console.log(err)
    })
})




module.exports = router;