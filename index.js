const express = require('express');
require('dotenv').config();
const app = express();
const db = require("./db/books");
const cors = require('cors');

const PORT = process.env.PORT || 2000;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  //http://127.0.0.1:5500/index.html

//Express middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(allowCrossDomain);
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/index.html');
//     res.header('Access-Control-Allow-Headers','http://127.0.0.1:5500/index.html');
//     next();
//   });


// GET client---->server  (Read)
// POST client --info--->server (Create)
// PATCH client ---:id--->server (Update)
// DELETE client --:id--->server (Delete)

app.get("/", (req,res) => {
    res.status(200).json({message: "Welcome to Book Inventory API"}); 
});

app.post("/books", async (req,res) => {
    const result = await db.insertBook(req.body);
    res.status(201).json({id: result[0]});
});

app.get("/books", async (req,res) => {
    const result = await db.showBooks();
    res.status(200).json({result});
});

app.get("/books/:id", async (req,res) => {
    const result = await db.showBook(req.params.id);
    res.status(200).json({result});
})

app.patch("/books/:id", async (req,res) => {
    const result = await db.updateBook(req.params.id, req.body);
    res.status(200).json({result});
});

app.delete("/books/:id", async (req,res) => {
    await db.deleteBook(req.params.id);
    res.status(200).json({success: true});
});

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));