//server

// const express = require('express');
// const app=express();
// const path=require("path")
// const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const app = express();
// const server = http.createServer(app);
const fs=require("fs");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'/static')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));



//legatura cu html-ul
app.get("/",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/proiect_TW.html"));
})

app.get("/login.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/login.html"));
})


app.get("/registration.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/registration.html"));
})

app.get("/home.html",(rez, res)=>{
    res.render('EJS/home');
    // res.sendFile(path.join(__dirname, "/views/home.html"));
})

app.get("/proiect_TW.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/proiect_TW.html"));
})


app.get("/carte1.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/carte1.html"));
})
app.get("/carte2.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/carte2.html"));
})
app.get("/carte3.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/carte3.html"));
})
app.get("/carte4.html",(rez, res)=>{
    res.sendFile(path.join(__dirname, "/views/carte4.html"));
})

//-------DELETE----------------------------------

app.get('/delete', (req, res) => {
    res.render("EJS/delete")
})

app.delete("/delete",(req,res)=>{
    let variabila=req.body;
    res.render("EJS/delete");
    let {index2}=variabila;
    if(index2>=0 && index2<users.length)
    users.splice(index2,1)
    console.log("dupa stergere",users);
})

//----------READ---------------------------------

app.get('/read', (req, res) => {
    res.render("EJS/read")
})

app.get("/sendObject",(req,res)=>{
    res.send(JSON.stringify(users))
})


//----------UPDATE---------------------------------

app.get("/update",(req,res)=>{
    res.render("EJS/update")
})

app.patch("/update",(req,res)=>{
    let variabila=req.body;
    res.render("EJS/update");
    let {index,obiect111}=variabila
    if(index>=0 && index<users.length)
    console.log(obiect111)
    users[index].username=obiect111
})



// ----------CREATE--------------------------------

app.post('/register', async (req, res) => {
    
    try{
        // console.log("utilizatori inainte",users);
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            localStorage.setItem("conturi",users);
            // console.log("lista conturi", users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
    // console.log("utilizatori dupa",users);

});

app.post('/login', async (req, res) => {
    
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                res.render("EJS/home");
                // res.send(users);
                // let usrname = foundUser.username;
                // res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


app.get("/*",(rez, res)=>{
    res.send("ERROR 404");
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
  



