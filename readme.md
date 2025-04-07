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

# File System vs DBMS | Disadvantages of File System | DBMS Advantages  


**Topics Discussed:**  
- Searching
- Attributes
- Concurrency
- Security

[![File System vs DBMS | Disadvantages of File System | DBMS Advantages](https://img.youtube.com/vi/ZtVw2iuFI2w/maxresdefault.jpg)](https://youtu.be/ZtVw2iuFI2w)

# What is Schema | How to define Schema | Database Management System in Hindi  

**Description:**  
A database schema defines how data is organized within a relational database. This includes logical constraints such as table names, fields, data types, and the relationships between these entities.

**Topics Discussed:**  
- Schema in DB  
- Logical representation  
- Implementation of Schema

[![What is Schema | How to define Schema | Database Management System in Hindi](https://img.youtube.com/vi/pDX4NR4eY3A/maxresdefault.jpg)](https://www.youtube.com/watch?v=pDX4NR4eY3A)

# What is CANDIDATE KEY and PRIMARY key | Full Concept | Most Suitable Examples | DBMS  

**Topics Discussed:**  
- Introduction to Candidate Key  
- Key  
- Attribute  
- Use of Key  
- Candidate Key Set  
- Primary Key  
- Alternative Key  

[![What is CANDIDATE KEY and PRIMARY key | Full Concept | Most Suitable Examples | DBMS](https://img.youtube.com/vi/mMxjKFiIKxs/maxresdefault.jpg)](https://youtu.be/mMxjKFiIKxs)

# What is Primary Key in DBMS | Primary Key with Examples  

[![What is Primary Key in DBMS | Primary Key with Examples](https://img.youtube.com/vi/Tp37HXfekNo/maxresdefault.jpg)](https://youtu.be/Tp37HXfekNo)

# Foreign Key in DBMS | Full Concept with Examples  

[![Foreign Key in DBMS | Full Concept with Examples](https://img.youtube.com/vi/UyqpQ3D2yCw/maxresdefault.jpg)](https://youtu.be/UyqpQ3D2yCw)

# Introduction to ER Model | ER Model क्या है  

[![Introduction to ER Model | ER Model क्या है](https://img.youtube.com/vi/gbVev8RuZLg/maxresdefault.jpg)](https://youtu.be/gbVev8RuZLg)

# Types of Attributes in ER Model | Full Concept | DBMS in Hindi  

**Topics Discussed:**  
- Attribute  
- Single vs Multivalued  
- Simple vs Composite  
- Stored vs Derived  
- Key vs Non-Key  
- Required vs Optional  

[![Types of Attributes in ER Model](https://img.youtube.com/vi/WEo3g6Ir-vA/maxresdefault.jpg)](https://youtu.be/WEo3g6Ir-vA)

# One to One Relationship in DBMS | DBMS in Hindi  

**Topics Discussed:**  
- Employee Table  
- Department Table  
- Relationship Table (Work Table)  
- Primary Key in Work Table  
- Reducing Number of Tables  

[![One to One Relationship in DBMS](https://img.youtube.com/vi/s6MH7f3SnsY/maxresdefault.jpg)](https://youtu.be/s6MH7f3SnsY)

# One to Many Relationship in DBMS | 1-M Relationship | DBMS in Hindi  

**Topics Discussed:**  
- 1-M (E-R Diagram)  
- Relational Model (Tables)  
- Relationship Table  
- Primary Key  
- Reducing Number of Tables  

[![One to Many Relationship in DBMS](https://img.youtube.com/vi/rZxETdO_KUQ/maxresdefault.jpg)](https://youtu.be/rZxETdO_KUQ)

# Many to Many Relationship in DBMS | M-N Relationship | DBMS in Hindi  

**Topics Discussed:**  
- Relational Model (Tables)  
- Relationship Table  
- Primary Key  
- Reducing Number of Tables  

[![Many to Many Relationship in DBMS](https://img.youtube.com/vi/onR_sLhbZ4w/maxresdefault.jpg)](https://youtu.be/onR_sLhbZ4w)

# Introduction to Normalization | Insertion, Deletion & Updation Anomaly | DBMS in Hindi  

**Topics Discussed:**  
- Row-Level Duplicacy  
- Column-Level Duplicacy  
- Anomaly  
- Insertion Anomaly  
- Deletion Anomaly  
- Updation Anomaly  
- Normalization  

[![Introduction to Normalization](https://img.youtube.com/vi/5GDTIUVlHB8/maxresdefault.jpg)](https://youtu.be/5GDTIUVlHB8)

[![Lec-21: First Normal form in DBMS in HINDI | 1st Normal form क्या होती है ?](https://img.youtube.com/vi/NlgZy30Dv9A/maxresdefault.jpg)](https://youtu.be/NlgZy30Dv9A)

[![Finding Closure of Functional Dependency in DBMS](https://img.youtube.com/vi/bSdvM_0hzgc/maxresdefault.jpg)](https://youtu.be/bSdvM_0hzgc)

# Lec-23: Functional Dependency & Its Properties in DBMS in Hindi  

**Topics Discussed:**  
- Functional Dependency  
- Trivial and Non-Trivial Functional Dependency  
- Properties of Functional Dependency  

[![Functional Dependency & Its Properties](https://img.youtube.com/vi/qn5neFBpU40/maxresdefault.jpg)](https://youtu.be/qn5neFBpU40)

# Lec-24: Second Normal Form (2NF) | Database Management System  
 
[![Second Normal Form (2NF)](https://img.youtube.com/vi/tkbAA--wKOc/maxresdefault.jpg)](https://youtu.be/tkbAA--wKOc)

# Lec-25: Third Normal Form (3NF) in DBMS with Examples | Normalization   

[![Third Normal Form (3NF)](https://img.youtube.com/vi/IeSai2JVm78/maxresdefault.jpg)](https://youtu.be/IeSai2JVm78)

# Lec-26: Boyce-Codd Normal Form (BCNF) | DBMS | Normalization  

[![Boyce-Codd Normal Form (BCNF)](https://img.youtube.com/vi/mf_PbWPo7VM/maxresdefault.jpg)](https://youtu.be/mf_PbWPo7VM)

# Lec-27: BCNF Always Ensures Dependency Preserving Decomposition?? | Normalization Examples   

[![BCNF and Dependency Preserving Decomposition](https://img.youtube.com/vi/qwI0oe3-g9g/maxresdefault.jpg)](https://youtu.be/qwI0oe3-g9g)

# Lec-28: Lossless and Lossy Decomposition | Fifth (5th) Normal Form | Database Management System  

[![Lossless and Lossy Decomposition | 5NF](https://img.youtube.com/vi/Sabwow_e2-M/maxresdefault.jpg)](https://youtu.be/Sabwow_e2-M)

# Lec-29: All Normal Forms with Real-Life Examples | 1NF 2NF 3NF BCNF 4NF 5NF | All in One  

**Topics Discussed:**  
- First Normal Form (1NF)  
- Second Normal Form (2NF)  
- Third Normal Form (3NF)  
- Boyce-Codd Normal Form (BCNF)  
- Fourth Normal Form (4NF)  
- Fifth Normal Form (5NF)  

[![All Normal Forms with Real-Life Examples](https://img.youtube.com/vi/EGEwkad_llA/maxresdefault.jpg)](https://youtu.be/EGEwkad_llA)

# Lec-31: Practice Question on Normalization | Database Management System  

[![Practice Question on Normalization](https://img.youtube.com/vi/4h8VoRnRvnE/maxresdefault.jpg)](https://youtu.be/4h8VoRnRvnE)

# Lec-32: How to Find Out the Normal Form of a Relation | DBMS  

**Topics Discussed:**  
- Checking 2nd Normal Form  
- Decomposing Tables  
- Checking 3rd Normal Form  
- Checking BCNF  
- Lossless Join  

[![How to Find Out the Normal Form of a Relation](https://img.youtube.com/vi/wTJjpH2RUcQ/maxresdefault.jpg)](https://youtu.be/wTJjpH2RUcQ)

# Lec-33: How to Solve Normalization Questions | DBMS  

**Topics Discussed:**  
- Schema 1  
- Schema 2  
- Schema 3  
- Schema 4  

[![How to Solve Normalization Questions](https://img.youtube.com/vi/1yUkun2r0N4/maxresdefault.jpg)](https://youtu.be/1yUkun2r0N4)

# Lec-36: Dependency Preserving Decomposition in DBMS with Examples in Hindi | DBMS  

**Topics Discussed:**  
- Concept of Dependency Preservation  
- Decomposition of Relation R  
- Functional Dependencies in Decomposed Tables  
- Ensuring Dependency Preservation  

[![Dependency Preserving Decomposition](https://img.youtube.com/vi/0oeap0QDslY/maxresdefault.jpg)](https://youtu.be/0oeap0QDslY)

# Lec-37: Dependency Preserving Decomposition in DBMS | Example 2 in Hindi  

[![Dependency Preserving Decomposition Example 2](https://img.youtube.com/vi/jxENwUU9j7w/maxresdefault.jpg)](https://youtu.be/jxENwUU9j7w)

# Lec-38: Introduction to Joins and Its Types | Need of Joins with Example | DBMS  

[![Introduction to Joins](https://img.youtube.com/vi/zYH-e6tUYbw/maxresdefault.jpg)](https://youtu.be/zYH-e6tUYbw)

# Lec-39: Natural Join Operation with Example | Database Management System  

**Definition:**  
A **NATURAL JOIN** is a JOIN operation that creates an implicit join clause for you based on the common columns in the two tables being joined.  

[![Natural Join Operation](https://img.youtube.com/vi/jRxEjmjIIFs/maxresdefault.jpg)](https://youtu.be/jRxEjmjIIFs)

# Lec-40: Self Join Operation with Example | Database Management System  

**Definition:**  
A **Self Join** is a join in which a table is joined with itself (also called a **Unary Relationship**), especially when the table has a **FOREIGN KEY** that references its own **PRIMARY KEY**. To join a table with itself means that each row of the table is combined with itself and with every other row of the table.  

[![Self Join Operation](https://img.youtube.com/vi/6DQpvfdj6EE/maxresdefault.jpg)](https://youtu.be/6DQpvfdj6EE)

# All Types of SQL Commands with Examples | DDL, DML, DCL, TCL, and Constraints | DBMS (Lecture 53)  

[![Watch on YouTube](https://img.youtube.com/vi/vUj-kUEC_oA/maxresdefault.jpg)](https://youtu.be/vUj-kUEC_oA?si=zaoGISzatFxzw27K)  


### Topics Covered:  
- **SQL Commands Overview**  
- **DDL (Data Definition Language) Commands**  
- **DML (Data Manipulation Language) Commands**  
- **DCL (Data Control Language) Commands**  
- **TCL (Transaction Control Language) Commands**  
- **SQL Constraints and Their Importance**  

# Create Table in SQL with Execution | SQL for Beginners | Oracle LIVE (Lecture 54)  

[![Watch on YouTube](https://img.youtube.com/vi/R6Ps7aUNPE4/maxresdefault.jpg)](https://youtu.be/R6Ps7aUNPE4?si=EH_BMYto573Wk-7z)  

[Create Table in SQL with Execution | SQL for Beginners | Oracle LIVE (Lecture 54)](https://youtu.be/R6Ps7aUNPE4?si=EH_BMYto573Wk-7z)

### Topics Covered:  
- **Introduction to Table Creation in SQL**  
- **Syntax of CREATE TABLE Statement**  

# ALTER Command (DDL) in SQL with Implementation on Oracle.

[![ALTER Command (DDL) in SQL with Implementation on Oracle](https://img.youtube.com/vi/NA3b8JRUmww/maxresdefault.jpg)](https://youtu.be/NA3b8JRUmww?si=KlMQBYsI0ER8Z8Ch)  

### Topics Covered:  
- **Introduction to ALTER Command**  
- **Various Uses of ALTER (Add, Modify, Drop Columns, etc.)**  
- **Live Execution in Oracle SQL Environment**  

# Lec-56: Difference between ALTER and UPDATE in SQL with Examples in Hindi | DBMS  

[![Lec-56: Difference between ALTER and UPDATE in SQL with Examples in Hindi | DBMS](https://img.youtube.com/vi/x56CHpL4GBE/maxresdefault.jpg)](https://youtu.be/x56CHpL4GBE?si=gNqaESUM7RFwaLE4)  

This lecture explains the **difference between ALTER and UPDATE commands in SQL**.

### Topics Covered:  
- **Introduction** to ALTER vs UPDATE  
- **ALTER Command Explained**  
- **UPDATE Command Explained**   

# Lec-57: Difference between DELETE, DROP & TRUNCATE in SQL | DBMS  

[![Lec-57: Difference between DELETE, DROP & TRUNCATE in SQL | DBMS](https://img.youtube.com/vi/_m1aJdD-oD8/maxresdefault.jpg)](https://youtu.be/_m1aJdD-oD8?si=rTC13O63Uo8yBxpe)  

[Difference between DELETE, DROP & TRUNCATE in SQL | DBMS](https://youtu.be/_m1aJdD-oD8?si=rTC13O63Uo8yBxpe)

# Lec-58: Constraints in SQL in Hindi | DBMS  

[![Lec-58: Constraints in SQL in Hindi | DBMS](https://img.youtube.com/vi/PcMr6xoundk/maxresdefault.jpg)](https://youtu.be/PcMr6xoundk?si=keHr28a89GBMSebS)  

This lecture covers various **constraints in SQL** in Hindi, ideal for DBMS beginners and intermediate learners.

### Topics Covered:  
- Introduction  
- Unique  
- Not Null  
- Primary Key  
- Check  
- Foreign Key  
- Default  

# Lec-59: SQL Queries and Subqueries (Part-1) | Database Management System  

[![Lec-59: SQL Queries and Subqueries (Part-1) | Database Management System](https://img.youtube.com/vi/_yog7h4BokQ/maxresdefault.jpg)](https://youtu.be/_yog7h4BokQ?si=hJshWhqd27YHIG0L)  

[Lec-59: SQL Queries and Subqueries (Part-1) | Database Management System](https://youtu.be/_yog7h4BokQ?si=hJshWhqd27YHIG0L)

This lecture introduces **SQL Queries and Subqueries (Part-1)** as part of the Database Management System series. Ideal for learners preparing for SQL interviews or strengthening query-building skills.

### Topics Covered:  
- Introduction  
- Question 1  
- Question 2  


# Distributed Database | Introduction | Distributed Systems | Lecture 64 | Bhanu Priya  

[![Watch on YouTube](https://img.youtube.com/vi/QyR4TIbEJjo/maxresdefault.jpg)](https://youtu.be/QyR4TIbEJjo?si=vqAUWasKtD1smrNU)  

This lecture provides an introduction to **Distributed Databases** as part of the **Distributed Systems** course. This session is by **Bhanu Priya**.  

### Topics Covered:  
- What is a Distributed Database?  

# Distributed Database in DBMS | Learn Coding  

[![Distributed Database in DBMS | Learn Coding](https://img.youtube.com/vi/iG2i5g5Cph8/maxresdefault.jpg)](https://youtu.be/iG2i5g5Cph8?si=va3_z9re2ZSjjoWW)  

This video explains **Distributed Databases in DBMS**, covering their types and key concepts.
### Topics Learned:  
- Types of Distributed Databases  

# DBMS - Features of Distributed Database System  

[![DBMS - Features of Distributed Database System](https://img.youtube.com/vi/LlPDykVu1Fg/maxresdefault.jpg)](https://youtu.be/LlPDykVu1Fg?si=lioNBkJJN9ZqU2QT)  
[DBMS - Features of Distributed Database System](https://youtu.be/LlPDykVu1Fg?si=lioNBkJJN9ZqU2QT)

This video covers the **Features of Distributed Database Systems** in DBMS, explaining key characteristics.  

### Topics Learned:  
- Key Features and Characteristics  

# Distributed Database | Architecture | Distributed Systems | Lecture 66 | Bhanu Priya  

[![Distributed Database | Architecture | Distributed Systems | Lecture 66 | Bhanu Priya](https://img.youtube.com/vi/vuApQk27Jus/maxresdefault.jpg)](https://youtu.be/vuApQk27Jus?si=-4ahcDFrs-uf84xw)  

[Distributed Database | Architecture | Distributed Systems | Lecture 66 | Bhanu Priya](https://youtu.be/vuApQk27Jus?si=-4ahcDFrs-uf84xw)

This lecture covers the **Architecture of Distributed Databases** as part of the **Distributed Systems** course.

### Topics Covered:  
- Introduction to Distributed Database Architecture  
- Types of Distributed Database Architectures  

# 6. Transparencies in Distributed Database System  

[![Watch on YouTube](https://img.youtube.com/vi/gt1sr6P4Rmw/maxresdefault.jpg)](https://youtu.be/gt1sr6P4Rmw?si=4G9eT1J2cr-UqwLH)  

This video discusses the essential concept of **Transparencies in a Distributed Database Management System (DDBMS)**.

### Topics Covered:  
- **Introduction to Transparencies in DDBMS**  
- **Types of Transparencies**  
  - Network Transparency  
  - Location Transparency  
  - Naming Transparency  
  - Replication Transparency  
  - Fragmentation Transparency  
  - Local Mapping Transparency  
- **Levels of Transparency**  
  - Fragmentation  
  - Location  
  - Local Mapping  

# L127: Types of Distributed Databases | Data Storage (Fragmentation, Replication) | Transparency  

[![L127: Types of Distributed Databases | Data Storage (Fragmentation, Replication) | Transparency](https://img.youtube.com/vi/9GtoDxCQGvk/maxresdefault.jpg)](https://youtu.be/9GtoDxCQGvk?si=ahIYVgXPP63vcucF)  

### Topics Learned:  
- **Types of Distributed Databases**   
- **Comparison Between Homogeneous and Heterogeneous Distributed Databases**  
