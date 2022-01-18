const date = require('../getDate.js');
//const Wish = require('../models/data');
const Data = require('../models/data.js');

exports.getMainPage = (request,response)=>{
        Data.fetchData(dataFromFile =>{
                console.log(dataFromFile);
        
                let time = date.getDate();
        
                response.render('index',{CurrentTime: time, myData: dataFromFile[0]});
        })     
}

exports.getAdmin = (request,response)=>{
        response.render('admin');
}