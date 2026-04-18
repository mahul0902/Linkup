import { User } from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary';

export const signup = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        message: "Welcome to the application!",
        user: registeredUser // Send the user data so React can display their profile
      });
    });
  } catch (e) {
    return res.status(400).json({ 
      error: e.message 
    });
  }
}

export const login = async (req, res) => {
  res.status(200).json({
    message: "Welcome back!",
    user: req.user 
    });
}

export const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.status(200).json({ message: "You logged out successfully!" });
  });
}

export const destroyAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
        
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.profileImage && user.profileImage.includes('cloudinary')) {
      const urlParts = user.profileImage.split('/');
      const folderAndFile = urlParts.slice(-2).join('/'); 
      const publicId = folderAndFile.split('.')[0];       
            
      await cloudinary.uploader.destroy(publicId);
    }
    await User.findByIdAndDelete(userId);
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Account deleted successfully." });
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account." });
  }
}