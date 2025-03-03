import { Request, Response } from "express";
import sequelize from "../../configs/database";
import { QueryTypes } from "sequelize";



// [GET] /
export const index = async (req: Request, res: Response) => {

    const sortValue = req.query.sortValue;
    let orderBy= "";

    if (typeof sortValue === "string") { 
        const sortOrder = sortValue.toUpperCase();
        orderBy = `ORDER BY price_special ${sortOrder}`;
    }

    console.log(orderBy)

    const tours = await sequelize.query(`
        SELECT t.*, ROUND(t.price * (1 - t.discount / 100), 0) AS price_special, c.title AS category
        FROM tours t
        JOIN tours_categories tc ON t.id = tc.tour_id
        JOIN categories c ON tc.category_id = c.id
        WHERE c.deleted = false
          AND c.status = 'active'
          AND t.deleted = false
          AND t.status = 'active'
          ${orderBy};
      `, { type: QueryTypes.SELECT });


    tours.forEach((tour) => {
        if (tour["images"]) {
            const images = JSON.parse(tour["images"])
            tour["image"] = images[0];
        }
        tour["price_special"] = Number(tour["price_special"])

        const timeStart = tour["timeStart"];
        const date = new Date(timeStart);
        const formattedDate = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        tour["date_start"] = formattedDate

    })

    res.render("client/pages/tour/index.pug", {
        pageTitle: "Danh sách các tour du lịch",
        tours: tours
    })
}
