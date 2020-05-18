const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");


const app = express();
var cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
