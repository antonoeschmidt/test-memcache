const express = require("express");
const app = express();
var cache = require("memory-cache");
const crypto = require("crypto");
const fs = require("fs");
let testEntry = require("./testEntry.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/data/:id", (req, res) => {
    data = cache.get(req.params.id);
    console.log(cache.keys());
    if (data) {
        res.send(data);
    } else {
        res.send("No data at endpoint");
    }
});

app.get("/new", (req, res) => {

    // auth with Blockchain here

    let randId = crypto.randomBytes(64).toString("hex");
    cache.put(randId, testEntry, 10000);
    console.log(cache.keys());
    res.send(randId);
});

app.listen(3000);
