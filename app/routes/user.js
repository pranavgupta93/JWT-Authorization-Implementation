const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth=require('../middleware/auth')
module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/users`;
    app.get("/",function(req,res){
        res.send("hello")
    })
    app.get(`${baseUrl}/all`,auth.isAuthorized,userController.getAllUsers);
    app.get(`${baseUrl}/user/:id`,auth.isAuthorized,userController.getSingleUser);
    app.post(`${baseUrl}/signup`,userController.signUp);
    app.post(`${baseUrl}/login`,userController.logIn);
    app.post(`${baseUrl}/logout`,auth.isAuthorized,userController.logout);
}