import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://ramanaraovk18:Ramanarao@cluster0.nkrpsfa.mongodb.net/ShortUrl').then(() => console.log("DB connected"));
} 

    


