const mongoose = require('mongoose')
const passport = require("passport")
const passportlocalmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String
})

userSchema.plugin(passportlocalmongoose)

const User = new mongoose.model('User', userSchema)
passport.use(User.createStrategy())


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = mongoose.model('User', userSchema)