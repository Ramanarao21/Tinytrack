import urlModel from "../models/urlModel.js";
import shortid from "shortid";

const handleGnerateShortId = async(req , res) => {
    const body = req.body;
    if(!body.url){
        return res.json({success:false, message:"URL is required"})
    }
    const shortId = shortid();
    await urlModel.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    });
    
    return res.json({success:true, id: shortId})
}


const handleGetAnalytics = async(req,res) => {
    const shortId = req.params.shortId;
    const result = await urlModel.findOne({shortId});
    return res.json({success:true, totalClicks : result.visitHistory.length , analytics: result.visitHistory,});
}


export {handleGnerateShortId,handleGetAnalytics}