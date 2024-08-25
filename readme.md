```javascript
const { faker, th } = require('@faker-js/faker');
const mysql = require('mysql2');

const express = require('express') // common js synchronously
const app = express();
const path = require("path")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
const { count } = require('console');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'JCMN@#8133'
})
// password: 'CJnm@#9501'
let createRandomUser = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
];
};

// console.log(createRandomUser());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.get("/",(req,res) =>{
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q,(err,results)=>{
      if (err) throw err;
      let count = results[0]["count(*)"];
      res.render("home.ejs", {count})
    })
  } catch (err) {
    console.log(err);
    res.send(`Some inconsistencies in DB ${err}`)
  }
})

app.get("/user",(req,res)=>{
  let q = `SELECT * FROM user`;
  try {
    connection.query(q,(err,results)=>{
      if (err) throw err;
      // console.log(results);
      // res.send(results)
      res.render("showusers.ejs",{users: results});
    })
  } catch (err) {
    console.log(err);
  }
})


app.get("/user/:userId/edit",(req,res)=>{
  let {userId} = req.params;

  let q = `SELECT * FROM user WHERE userId = '${userId}'` ; // we added single '' quotesto make the id string
  try {
    connection.query(q,(err,results)=>{
      if (err) throw err;
      let user = (results[0]);
      res.render("edit.ejs",{user});
    })
  } catch (err) {
    console.log(err);
  }
  
})


app.patch("/user/:userId",(req,res)=>{
  let {userId} = req.params;
  let {password:formPassword,username:newUsername} = req.body

  let q = `SELECT * FROM user WHERE userId = '${userId}'` ; // we added single '' quotesto make the id string
  try {
    connection.query(q,(err,results)=>{
      if (err) throw err;
      let user = (results[0]);
      if (formPassword != user.password) {
        res.send("user has sent invalid! password")
      }else{
        let q2 = `UPDATE user SET username ='${newUsername}' WHERE  userId = '${userId}'` //user.username
        connection.query(q2,(err,results)=>{
          if (err) throw err; 
          res.redirect("/user");
        })
      }

    });
  } catch (err) {
    console.log(err);
  }
  
})


app.delete("/user/:userId",(req,res)=>{
  let {userId} = req.params;
  let q = `DELETE FROM user WHERE userId = '${userId}'` ;
  try {
    
    connection.query(q,(err,results)=>{
      if (err) throw err;
      res.redirect("/user");
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error"); // Send error response if needed
  }

})


// Gracefully close the connection when the application exits
process.on('exit', () => {
  connection.end();
});


const port = process.env.PORT || 8080;

app.listen(port,()=>{// middlewere
    console.log(`Server running at http://localhost:${port}`);
});


```