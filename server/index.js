require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const checkForSession = require("./middlewares/checkForSession");

const sc = require("./controllers/swag_controller");
const ac = require("./controllers/auth_controller");
const cc = require("./controllers/cart_controller");
const searchctrl = require("./controllers/search_controller");

const port = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);
app.use(express.static(` ${__dirname}/build`));

app.get("/api/swag", sc.read);

app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);

app.post("/api/cart", cc.add);
//http://localhost:3001/api/cart/?id=3 example
app.post("/api/cart/checkout", cc.checkout);
app.delete("/api/cart", cc.delete);

app.get("/api/search", searchctrl.search);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
