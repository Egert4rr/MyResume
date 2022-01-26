const date = require('../getDate.js');
//const Wish = require('../models/data');
const Data = require('../models/data.js');
const passport = require('passport')
const User = require('../models/user')

exports.getMainPage = (request,response)=>{
        Data.fetchData(dataFromFile =>{
                console.log(dataFromFile);
        
                let time = date.getDate();
        
                response.render('index',{CurrentTime: time, myData: dataFromFile[0]});
        })     
}

exports.getAdmin = (request,response)=>{
        if (request.isAuthenticated()) {
                Data.fetchData(dataFromFile =>{
                        console.log(dataFromFile);
                        response.render('admin',{myData: dataFromFile[0]});
                })
        } else {
                response.redirect('/')
        }
}

exports.postData = (req, res) => {
        const Sbody = req.body
        const newData = new Data(Sbody.fullName,Sbody.dateOfbirth,Sbody.placeOfresidence,
                Sbody.schools,Sbody.technicalSkills,Sbody.softSkills,req.file.filename)
        newData.saveData()
    
        res.redirect('/')
}

exports.getRegisterPage = (req, res)=> {
        res.render('register')
    }
    
    exports.postRegister = (req,res)=>{
        User.register({username: req.body.username}, req.body.password, (error,user)=>{
            if (error) {
                console.log(error);
                res.redirect('/register')
            }
            else {
                passport.authenticate('local')(req,res,()=>{
                    res.render('index')
                })
            }
        })
    }
    
exports.getLoginPage = (req,res)=>{
        res.render('login')
}
exports.postLogin = (req,res)=>{
        const user = new User({
            username: req.body.username,
            password: req.body.password
})
req.login(user, (error)=>{
        if (error) {
                console.log(error);
                res.redirect('/login')
        }
        else {
                passport.authenticate('local')(req,res,()=>{
                    res.redirect('/')
                })
        }
})}

exports.userLogout = (req,res)=>{
        req.logout()
        res.redirect('/')
}