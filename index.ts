import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config();


import bodyParser from "body-parser"
import sequelize from "./configs/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./configs/system";
sequelize;

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static("public"))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app)
adminRoutes(app)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})