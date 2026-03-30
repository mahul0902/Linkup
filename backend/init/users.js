import mongoose from 'mongoose';
// import 'dotenv/config';
import {User} from '../models/user.js'; 

const mockUsers = [
    { 
        username: "kunal_dev", 
        email: "kunal@example.com", 
        password: "kunal_dev"
    },
    { 
        username: "alice_smith", 
        email: "alice@example.com", 
        password: "alice_smith"
    },
    { 
        username: "tech_bob", 
        email: "bob@example.com", 
        password: "tech_bob"
    },
    { 
        username: "charlie_codes", 
        email: "charlie@example.com", 
        password: "charlie_codes"
    },
    { 
        username: "diana_design", 
        email: "diana@example.com", 
        password: "diana_design", 
    }
];

const seedDB = async () => {
    try {
        // 1. Connect to your database
        await mongoose.connect("mongodb://127.0.0.1:27017/linkup");
        console.log("Connected to MongoDB!");

        // 2. Loop through the array and register each user securely
        for (let u of mockUsers) {
            // We only pass email, username, and profileImage to the new User instance
            const newUser = new User({ 
                email: u.email, 
                username: u.username, 
                profileImage: u.profileImage 
            });
            
            // Passport handles hashing the password before saving!
            await User.register(newUser, u.password);
            console.log(`Registered user: ${u.username}`);
        }

        console.log("✅ All 5 mock users successfully seeded!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        // 3. Close the connection so the script stops running
        mongoose.connection.close();
    }
};

// Run the function
seedDB();