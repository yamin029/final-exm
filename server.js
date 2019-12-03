var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
//var mongo = require('mongodb')
var db, uri = "mongodb+srv://yaminkhan017:@Yamin287232@cluster0-95fpq.mongodb.net/test?retryWrites=true&w=majority"
var mongoose = require('mongoose')

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('error',function(err){
  console.log('could not connect to MongoDB')

})

var Schema = mongoose.Schema
var articleSchema = new Schema(
  {
    title: {
      type:String,
      required: "Title is required"
    },
    author:{
      type:String,
      required: "Content is required"
    },
    rating:{
        type: Number,
        required: "Rating is requirde between 0 to 5"
    }
  }
)

var Article = mongoose.model('artices', articleSchema)

app.use(bodyParser.urlencoded({extended:true}))


app.post('/submit',function(request,response){
    let article = new Article(request.body)
    console.log(request.body)
    article.save(function(err,data){
      if(err){
          console.log(err)
            return response.status(400).json({msg:"make sure the all fields are filled us or the rating between 0 to 5 "})
      }
      response.status(200).json({article:data})
    })
    
   
  }) 

  app.get('/',function(request,response){
    response.sendFile(__dirname+'/index.html')
  })

  app.get('/new/:index',function(request,response){
    if(request.params.index){
        //response.json(articles[request.params])
        //response.render('article.ejs',{article:articles[request.params.index]})
        Article.find({'_id': request.params.index},function(err,data){
          if(err){
            console.log(err)
            return response.status(400).json({msg:'could not not query the id'})
     
          }
          return response.render('singleview.ejs',{article:data[0]})
        })
      }
      else{
        return response.json({msg:"Article not found"})
      }
  })


  server.listen(3000, 'localhost', function(){
    console.log('Server running ...');
  });