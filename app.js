console.log('Hello world! initializing application...');
console.log('Connecting to database...');
// importing package
let mysql=require('mysql');
let faker=require('faker');
let express=require('express');
let bodyParser=require('body-parser');

let app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

//creating connection
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'K11@mysqltoor',
    database:'join_us'
});

// code for request handler
app.get("/",function(request,response){
    let q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
        if (error) throw error;
        let count=results[0].count;
        response.render('home',{data:count});
    });
});

app.post("/register",function(request,response){
    console.log(request.body);
    console.log("Hey! there is a post request."+request.body.email);
    let person={email:request.body.email};
    let q = 'INSERT INTO users SET ?';
    connection.query(q,person,function (error, results) {
        if (error) throw error;
        response.send("<h1>Thank you for registering.</h1><a href='/'>Go to home</a>")
        /**
         * or
         * response.redirect("/");
         */
    });
});

app.get("/joke", function(req, res){
    var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
    res.send(joke);
});

app.get("/random_num", function(req, res){
    var num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

// starting server at
// url:- "http://localhost:5731/"
app.listen(5731,function(){
    console.log('App listening on port 5731');
});





/**
 * 
//closing connection
// console.log("Closing connection")
// connection.end();
 * bulk data insert query
let data=[];
for (i=0;i<500;i++)
{
    data.push([faker.internet.email(),faker.date.past()]);
}

Query='INSERT INTO users (email,created_at) VALUES ?';

connection.query(Query,[data],function(error,result,fields){
    if(error) throw error;
    console.log(result);    
});
 */