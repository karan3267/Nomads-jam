const express = require("express")
const mongoose = require("mongoose")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport")
const authRoutes = require("./routes/auth")
const songRoutes = require("./routes/Song")
const playlistRoutes= require("./routes/playlist")
const cors =require("cors")
const User = require("./models/User")
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://karanreddy3267:" + process.env.Mongo_Password + "@cluster0.omcuk69.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((x) => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err)
    })


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
     User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/api", (req, res) => {
    res.send("hello")
})

app.use("/auth", authRoutes)
app.use("/song", songRoutes)
app.use("/playlist",playlistRoutes)

app.listen(8000, () => {
    console.log("Apps is up")
})