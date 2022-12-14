const bodyParser = require("body-parser");
const ejs= require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser: true});


const app=express(); //creates app using ejs
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const articleSchema = mongoose.Schema({
    title: "String",
    content: "String"
});

const Article =mongoose.model("Article",articleSchema);



app.listen(3000,function(){
    console.log("Server is running on port 8000");
});