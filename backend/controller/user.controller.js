const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')
const { sendEmail } = require('../utils/sendEmail')

const signUpUser = async (req, res) => {
  const { email, name, password, mobile } = req.body;
  const active = false
  
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      return res.status(400).json({message: 'User with this email or phone number already exists', code: 403});
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("otp", otp);
    const text = "Thank you for choosing Your ZIVON. Use the following OTP to complete your Sign Up procedures."
    await User.create({ email, name, password: hashedPassword, mobile, active, otp });
    
    sendEmail(email, 'Registration OTP',text, otp, (error, info) => {
      if (error) {
          console.log('Email sending failed:', error);
      } else {
          console.log('Email sent successfully:', info.response);
      }
    });

    res.status(201).json({ message: "Account Successfully Opened", code: 201 });
  } catch (err) {
    console.log('Error: ', err);
    res.status(200).json({ message: "Internal server error", code: 500 });
  }
}

const otpVerify = async(req,res)=>{
  const {otp, email} = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!user) {
      res.status(200).json({message: "No user Exists", code:404})
    }

    if (otp === user.otp) {
      const user = await User.findOneAndUpdate({ email }, { active: true }, { new: true });
      if (user) {
        await User.findOneAndUpdate({ email }, { otp: "none" }, { new: true });
        return res.status(200).json({message: "Otp verified.", code: 200});
      }
      else{
        return res.status(200).json({message: "Something went wrong.", code:400})
      }
    }
    else{
      return res.status(200).json({message:"Invalid OTP",code:400})
    }
  } catch (err) {
    console.log('EROR', err)
    return res.status(200).json({message: "Internal server erroe", code : 500})
  }
}


const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!!!user) {
      return res.status(200).json({code:404, message:" User not found"})
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      let token = newToken(user)
      res.status(200).json({code: 200, token, active: user.active})
      return res;
    }
    else{
      return res.status(200).json({code:404, message:" Invalid password"})
    }
  } catch (err) {
    console.log('EROR', err)
    return res.status(200).json({code:404, message:" INternal server error"})
  }
}

const getUser = async (req, res) => {
  res.status(200).send({user: req.user})
}


const isUserVerified = async(req,res) =>{
   res.status(200).json({message: "user verified", code : 200})
}


const updateUserDetails = async (req, res) => {
  try {
    const { email, updatedDetails } = req.body;

    const user = await User.findOneAndUpdate({ email }, updatedDetails, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const userForgotPassword = async(req,res) =>{
  const { email } = req.body;

  if(!email){
    return res.status(404).json({err: "Email is required"})
  }
  const user = await User.findOne({email})

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const text = "Thank you for choosing CadRank. Use the following OTP to Reset password."
  sendEmail(email, 'Reset Password OTP',text, otp, (error, info) => {
    if (error) {
        console.log('Email sending failed:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
  });
  const newUserData = await User.findOneAndUpdate({ email }, { otp: otp }, { new: true });
  if(newUserData){
    return res.status(200).json({message : `Reset password instructions sent to ${email}`});
  }else{
    return res.status(500).json({message : `Something went wrong`});
  }

}

const resetPassword = async(req,res)=>{
  const {email, otp, password} = req.body;
  if(!email || !otp || !password){
    return res.status(404).json({message:"Email, otp and password is required"})
  }
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    if(otp === user.otp){
      const updateData = await User.findOneAndUpdate({email},  {password : password}, {new :true})
      if(updateData){
        await User.findOneAndUpdate({ email }, { otp: "none" }, { new: true });
        return res.status(200).json({message:"Password reset Successfully"})
      }
      else{
        return res.status(500).json({message: "Something went wrong."})
      }
    }else{
      return res.status(404).json({message:"Invalid Otp"})
    }
  } catch (error) {
    return res.status(500).json({message: "Internal server error"})
  }
}


const deleteUserAccount = async(req,res)=>{
  try {
    const { email } = req.body;
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
} catch (error) {
    res.status(500).json({ message: error.message });
}
}





module.exports = {
  signUpUser,
  signInUser,
  getUser,
  updateUserDetails,
  userForgotPassword,
  deleteUserAccount,
  otpVerify,
  resetPassword,
  isUserVerified,
};
