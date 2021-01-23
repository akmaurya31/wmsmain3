import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../util.js';
//import data from '../data.js';


const router=express.Router();

//User Data Seed


router.get("/", async(req, res)=>{
 const users= await User.find({});
//  console.log("i ambbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb inside of get request")
  res.send(users);
})



router.get('/seed', expressAsyncHandler( async(req, res)=>{
   // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers})
}) )

//SignIN

router.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );

//Register

router.post('/register', expressAsyncHandler( async(req, res)=>{
    const user=new User({
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        mobile:req.body.mobile,
        password:bcrypt.hashSync(req.body.password, 8),
    });

    const newUser= await user.save();

    if (newUser) {
        res.send({
          _id: newUser.id,
          name: newUser.name,
          lname:newUser.lname,
          email: newUser.email,
          mobile:newUser.mobile,
          isAdmin: newUser.isAdmin,
          token: generateToken(newUser),
        });
      }
    else{
        res.status(401).send({msg:'Invalid User Data'});
    }

}))

router.get("/createadmin", async(req, res) => {
        try{
            const user= new User({
                name:"Agam Bhai34",
                email:"agamsahudd01ww80@gmail.com",
                password:"1234",
                isAdmin:true
            });
            const newUser= await user.save();
                res.send(newUser);
        } catch(error){
            res.send({msg: error.message});
        }
})

//UserProfile

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
//////

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

export default router;