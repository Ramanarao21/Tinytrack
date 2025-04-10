import express from "express";
import cors  from "cors";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import { connectDB } from "./config/db.js";
import urlRouter from "./routes/urlRoute.js";
import urlModel from "./models/urlModel.js";
import useragent from "express-useragent";




const app = express();
const port = 4003 || process.env.PORT;


app.use(express.json());
app.use(cors());
app.use(useragent.express());

//api end points 

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.get("/:shortId" , async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate({
        shortId
    } , { $push:{
        visitHistory: {
            timestamp : Date.now(),
            device: req.useragent?.isMobile ? "Mobile" : "Desktop",
            browser: req.useragent?.browser,
        }
    }
    },
    { new: true }
);if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirectURL);
});


connectDB();

app.get("/" , (req,res) => {
    res.send("API WORKING!!")
})

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
});


