const nodemailer=require('nodemailer')
const {JWT_SECRET}=process.env
const requireLogin=require('../middlewere/requireLogin.js');

const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API,EMAIL} =process.env
//
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))