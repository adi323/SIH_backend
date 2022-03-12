const express=require('express')
const app=express();
const mongoose=require('mongoose')
const env=require('dotenv')
const cors=require('cors');
const { checkServer, login, getSched, addSched, getAll, updEx, addJob, apply } = require('./controller/controller');

env.config();
app.use(cors());


var conn=mongoose.connect(
    `mongodb+srv://${process.env.USERID}:${process.env.PASSWORD}@trassh.lb9ra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log("Database Connected");
})
app.use(express.json());

app.get('/',checkServer);
app.post("/login",login);
app.post("/addJob",addJob);
app.post("/apply",apply);


app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`);
});