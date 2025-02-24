import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config();



import sequelize from "./configs/database";
sequelize;

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set('views', './views')
app.set('view engine', 'pug')

app.get("/", (req: Request, res: Response) => {
    res.render("client/pages/tour/index.pug", {
        pageTitle: "Nguyen Dang Cuong"
    })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})