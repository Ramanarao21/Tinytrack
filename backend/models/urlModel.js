import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required: true,
        unique: true,
    },
    redirectURL:{        
        type:String, 
        require:true,
    },
    visitHistory:[{
        timestamp: {type:Number},
        device: String,      
        browser: String,
    
    
    }],
} , {timestamps:true}
);


const urlModel = mongoose.models.url || mongoose.model("url" , urlSchema)

export default urlModel