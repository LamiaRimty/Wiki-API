const express =require("express");
const bodyParser = require("body-parser");
const ejs= require("ejs");
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

///////////////Requested targeting all articles///////////////
app.route("/articles").get(function(req,res){
    Article.find({},function(err,foundArticles){
        if(!err){
            //console.log(foundArticles);
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    });
})

.post(function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
           res.send("Successfully added new article");
        }

        else
        {
            res.send(err);
        }
    });

})

.delete(function(req,res){
   Article.deleteMany(function(err){
    if(!err){
        res.send("Sucessfully deleted all articles!");
    }
    else{
       res.send(err);
    }
   });
});


///////////////Requested targeting a specific articles///////////////
app.route("/articles/:articleTitle").get(function(req,res){
    const requestArticleTitle= req.params.articleTitle;

    Article.findOne({ title: requestArticleTitle},function(err,foundArticles){
        if(foundArticles){
            //console.log(foundArticles);
            res.send(foundArticles);
        }
        else{
            res.send("No articles matching that title was found!");
        }
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 8000");
});