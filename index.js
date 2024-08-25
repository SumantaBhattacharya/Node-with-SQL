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
  password: 'CJnm@#9501'
})

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

//SELECT * FROM user WHERE email = "Gerry_Senger15@hotmail.com";


/*
 * Faker
 * to generate fake data
 * userID username email passward
 * 
 * Let getUser = ()={
 * return  [
 * faker.datatype.uuid(),
 * faker.intetnet.username(),
 * faker.internet.email(),
 * faker.internet.password(),
 * ]
 * };
 * https://www.npmjs.com/package/@faker-js/faker
 * npm i @faker-js/faker
 * https://raw.githubusercontent.com/faker-js/faker/HEAD/docs/public/logo.svg

MySQL2 Package
https://www.npmjs.com/package/mysql2
npm i mysql2

           
                API
[Client] -> [Web Server] -> [SQL DB]
[Client] <- [Web Server] <- [SQL DB]
 Front-end   Back-end

Using SQL from CLI(Command Line Interface.)

& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
quit

Create schema.sql
source schema.sql // in CLI

To connect Node with MySQL
connection.end(); // to close connection

1) workbench
2) & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
3)
try {
  connection.query("SHOW TABLES", (err, results) => {

    if (err) throw err;

    console.log(results);

  })
  // fields come in the last when we performing a select operation

} catch (err) {
  console.log(err);
}
4. Schema.sql


*/


/*
PS C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS> node index.js
{
  userId: 'fd9518dc-f26a-49b2-8817-fcb4e782ad23',
  username: 'Howard_Rolfson75',
  email: 'Kailee.Olson91@gmail.com',
  avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1205.jpg',
  password: 'ktuSU31cO9_DzCj',
  birthdate: 1958-04-10T03:41:45.277Z,
  registeredAt: 2024-03-12T19:12:27.703Z
}

PS C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS> node index.js
{
  userId: '94ebc50c-54c8-4052-82a5-2b78639ec08e',
  username: 'Major_Smitham',
  email: 'Delores_Lindgren@gmail.com',
  password: 'aV4m9hkGArRXpEf'
}
node:events:496
      throw er; // Unhandled 'error' event
      ^

Error: Access denied for user 'root'@'localhost' (using password: YES)
    at Packet.asError (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\packets\packet.js:738:17)
    at ClientHandshake.execute (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\commands\command.js:29:26)
    at Connection.handlePacket (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:481:34)
    at PacketParser.onPacket (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:97:12)
    at PacketParser.executeStart (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\packet_parser.js:75:16)
    at Socket.<anonymous> (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:104:25)
    at Socket.emit (node:events:518:28)
    at addChunk (node:internal/streams/readable:559:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    at Readable.push (node:internal/streams/readable:390:5)
Emitted 'error' event on Connection instance at:
    at Connection._notifyError (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:252:12)
    at Connection._handleFatalError (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:183:10)
    at Connection.handlePacket (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:491:12)
    at PacketParser.onPacket (C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS\node_modules\mysql2\lib\connection.js:97:12)
    [... lines matching original stack trace ...]
    at Readable.push (node:internal/streams/readable:390:5) {
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlState: '28000',
  sqlMessage: "Access denied for user 'root'@'localhost' (using password: YES)",
  sql: undefined,
  fatal: true
}

Node.js v20.12.2

PS C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
Enter password: **********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.38 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>

mysql>  SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| delta_app          |
| information_schema |
| instagram          |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
8 rows in set (0.00 sec)

mysql> USE delta_app
Database changed

SHOW TABLES;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version fo
r the right syntax to use near 'SHOW TABLES' at line 2
mysql> SHOW TABLES;
Empty set (0.00 sec)

mysql> SHOW TABLES;
+---------------------+
| Tables_in_delta_app |
+---------------------+
| temp                |
+---------------------+
1 row in set (0.00 sec)

PS C:\Users\SUDIP BHATTACHARYA\Desktop\SQLCLASS> node index.js
[@faker-js/faker]: faker.datatype.uuid() is deprecated since v8.0 and will be removed in v9.0. Please use faker.string.uuid()
 instead.
{
  userId: 'bffed6fd-10fd-4de8-9467-2609ca15f773',
  username: 'Kamren_Kreiger99',
  email: 'Dino99@yahoo.com',
  password: 'hXxzGR2bU5aWPK6'
}
[ { Tables_in_delta_app: 'temp' } ]

*/