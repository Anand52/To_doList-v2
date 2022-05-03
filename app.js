// jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date());

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
   const day = date.getDate();

  // switch(currentDay){
  //   case 0:
  //   day = "Sunday";
  //   break;
  //   case 1:
  //   day = "Monday";
  //   break;
  //   case 2:
  //   day = "Tuesday";
  //   break;
  //   case 3:
  //   day = "Wednesday";
  //   break;
  //   case 4:
  //   day = "Thursday";
  //   break;
  //   case 5:
  //   day = "Friday";
  //   break;
  //   case 6:
  //   day = "Saturday";
  //   break;
  //   default:
  //   console.log("Error: Current day is equal to : " + currentDay);
  // }

  // if(currentDay === 6|| currentDay === 0){
  //   day = "weekend";
  //  }
  // else{
  //   day = "weekday";
  // }
    res.render('List', {listTitle: day, newListItems: items});
});
app.post("/", function(req,res){
  const item = req.body.newItem;
  // console.log(req.body);
  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
     // res.render("List", {newListItem: item});
     // console.log(item);
     res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"work List", newListItems: workItems});
})
app.post("/work", function(req,res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
app.get("/about", function(req,res){
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
