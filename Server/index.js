const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const customerRouter = require("./Routes/CustomerRouter");
const categoryRouter = require("./Routes/CategoryRouter");
const productRouter = require("./Routes/ProductRouter");
const orderRouter = require("./Routes/OrderRouter");

const app = express();

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/customers", customerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
