const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddb"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define routes
app.get("/", (req, res) => {
  res.send("Hello, welcome!");
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// Creating Database
app.get('/empdb', (req, res) => {
  const createDatabase = "CREATE DATABASE IF NOT EXISTS cruddb";
  connection.query(createDatabase, (err, results) => {
    if (err) {
      console.error(err);
      res.send("Error creating database");
    } else {
      console.log("Database created successfully");
      res.send("Database created successfully");
    }
  });
});
// routing table
app.get('/createTable', (req,res)=>{
  const createTable=  "CREATE TABLE IF NOT EXISTS users( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, mobile BIGINT(10) NOT NULL)"
  connection.query (createTable, (err, results)=>{
      if(err) {
        res.status(500).send("Error Creating table")
      } else
      res.send('Table Created Succesfully')
  })
})
// insert table data
app.get ('/users', (req, res) => {
  const insertData= "INSERT INTO users (name, email, mobile) VALUES ?"
  const userData=[['abi','abi@gmail.com', '12345678'],['bala','bala@gmail.com', '23456789'],['dara', 'dara@gamail.com', '34567890']]
  connection.query(insertData,[userData], (err, results) => {
    if(err) throw err;
    console.log("Data Inserted Sucessfully")
    res.send('Data Inserted Successfully')
  })
  })

// get the table datas
app.get("/api/get", (req, res)=>{
    const sqlGet="Select * FROM users"
    connection.query(sqlGet ,(error, result)=>{
        res.send(result)
    })
})

// add user data

app.post('/api/post', (req, res) => {
  const uname= req.body.name
  const uemail=req.body.email
  const umobile=req.body.mobile
  const sql="INSERT INTO users(name, email, mobile) values(?,?,?)"
  console.log("inserted page",sql)
  connection.query(sql, [uname, uemail, umobile] , (err, rows, fields)=> {
    if (err) {
      console.log("error", err)
      res.status(500).json({
        "Response Code":0,
        "ResposeMessage":"Error",
        "data":"Data Insertion failed"
      })
    } else {
      console.log("Data inserted successfully")
     res.json({
      "ResponseCode":1,
      "ResposeMessage":"success",
      "data": "Data Intserted Successfully"
    })
    }
  })
})

// DELETE delete the data
app.delete('/api/delete/:id', (req, res)=> {
  const userId= req.params.id

  var sql= "DELETE FROM users WHERE id= ?"
  connection.query(sql, [userId], (err, results)=>{
    console.log(sql)
    if (err){
      console.error("Error Executing:", err)
      res.status(500).json({error:"Deleting User"})
    }else {
      res.json({messege:"User Deleted succesfully"})
    }
  })
})
// Update edit the user Data
app.put('/api/update/:id', (req, res)=>{
  const userId= req.params.id
  var uname=req.body.name
  var uemail=req.body.email
  var umobile=req.body.mobile
  var sql="UPDATE users SET name= ?,email= ?,mobile= ? WHERE id= ?"
  connection.query(sql, [uname, uemail, umobile, userId], (err, results)=>{
    console.log(sql)
    if (err) {
      console.error("Error Excecuting :", err)
      res.status(500).json({error:"error updating user"})
    } else if (results.affectedRows === 0) {
      res.status(404).json({error:"user not found"})
    } else {
      console.log(" Data Updated Successfully")
      res.json({messege:"user updated succesfully"})

    }
  })
 })
