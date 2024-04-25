import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";
import User from "./Models/User.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb', parameterLimit: 20}))
app.use(cors());


app.post("/login", async function(req, res) {
    console.log(req.body);
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({success: false, message: "Wrong email or password"});
        }
        const samePass = await user.validPassword(password)
        if(samePass){
            return res.status(400).json({success: false, message: "Wrong email or password"});
        }
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
})
app.post("/signup", async function(req, res) {
    console.log(req.body);
    try {
        const user = new User(req.body);
        await user.validate();
        await user.save();
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});