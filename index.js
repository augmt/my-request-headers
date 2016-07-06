"use strict";

let express = require("express");
let app = express();

app.get("/", function (req, res) {
    let ipaddress = req.headers["x-forwarded-for"].split(",")[0];
    let language = req.headers["accept-language"].split(",")[0].split(";")[0];
    let software = req.headers["user-agent"].match(/\((.+?)\)/)[1];

    res.json({ipaddress, language, software});
});
app.listen(process.env.PORT);
