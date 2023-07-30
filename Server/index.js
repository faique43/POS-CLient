const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const productRouter = require("./Routes/ProductRouter");
const orderRouter = require("./Routes/OrderRouter");
const inventoryRouter = require("./Routes/InventoryRouter");
const adminRouter = require("./Routes/AdminRouter");
const userRouter = require("./Routes/UserRouter");
const expanseRouter = require("./Routes/ExpanseRouter");
const salaryRouter = require("./Routes/SalaryRouter");
const paymentRouter = require("./Routes/PaymentRouter");
const adminInventoryRouter = require("./Routes/AdminInventoryRouter");
const storeInventoryRouter = require("./Routes/StoreInventoryRouter");
const requestsStoreRouter = require("./Routes/RequestsStoreRouter");
const layerInventoryRouter = require("./Routes/layerInventoryRouter");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/admins", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/expanses", expanseRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/adminInventory", adminInventoryRouter);
app.use("/api/storeinventory", storeInventoryRouter);
app.use("/api/requests", requestsStoreRouter);
app.use("/api/layerInventory", layerInventoryRouter);
