const express = require("express");
const app = express();
const cache = require("memory-cache");
const crypto = require("crypto");
const fs = require("fs")
let testEntry = require("./testEntry.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/data/:id", (req, res) => {
    console.log(req.params.id);
    data = cache.get(req.params.id);
    if (data) {
        res.send(data);
    } else {
        res.send("No data at endpoint")
    }
});

app.get("/data/new", (req, res) => {

    // auth with Blockchain here

    fs.readFile('registryOverview.json', function (err, data) {
        console.log(data);
        let json = JSON.parse(data)
        if (json[users][req.body.userid]['health']) {
            res.send(json[users][req.body.userid]['health'])
        } else {
            let randId = crypto.randomBytes(64).toString("hex");
            cache.put(randId, testEntry, 10000);
            json[users]['1234']['health'] = randId;
            res.send(randId);
        }
        fs.writeFile('registryOverview.json', JSON.stringify(json))
    })
});

app.listen(3000);
