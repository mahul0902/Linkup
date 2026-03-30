import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        // Provide a default avatar URL so the UI always has an image to display!
        // You can replace this link with any default avatar you upload to your own Cloudinary.
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
    }
})

userSchema.plugin(passportLocalMongoose.default);

export const User = mongoose.model('User', userSchema);