const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
 
const {PORT,DB_URL,DB_UR}=process.env;



// app.use(require('./routes/post'));
// app.use(require('./routes/user'));






mongoose.connect(DB_UR,{
    user: process.env.USER, 
    pass: process.env.PASSWORD,
    useCreateIndex: true,
  //  useFindAndModify: true,
    useNewUrlParser:true,
    useUnifiedTopology: true

});
mongoose.connection.on('connected',()=>{
    console.log('connected to Cloud Database ');
});
mongoose.connection.on('error',()=>{
    console.log('not connected some error ');
})


require('./models/user')
require('./models/message')
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/message'));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log("db connected and running on port",PORT,DB_UR);
})