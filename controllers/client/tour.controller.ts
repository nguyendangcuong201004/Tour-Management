import { Request, Response } from "express";
import sequelize from "../../configs/database";
import { QueryTypes } from "sequelize";
import Tour from "../../models/tour.model";


// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    const slug = req.params.slugCategory;

    const tours = await sequelize.query(`
        SELECT t.*, ROUND(t.price * (1 - t.discount / 100), 0) AS price_special, c.title AS category
        FROM tours t
        JOIN tours_categories tc ON t.id = tc.tour_id
        JOIN categories c ON tc.category_id = c.id
        WHERE
            c.slug = '${slug}'
            AND c.deleted = false
            AND c.status = 'active'
            AND t.deleted = false
            AND t.status = 'active';

        `, {
        type: QueryTypes.SELECT
    })

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

// [GET] /tour/detail/:slug
export const detail = async (req, res) => {
    const slug = req.params.slug;
    const tour = await Tour.findOne({
        where: {
            slug: slug,
            deleted: false,
            status: "active"
        },
        raw: true
    })

    const date = new Date(tour["timeStart"]);
    const formattedDate = date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(",", "");

    tour["formattedDate"] = formattedDate;

    tour["special_price"] = Math.round((tour["price"] * (1 - tour["discount"] / 100)))

    
    tour["listImage"] = JSON.parse(tour["images"]);
    tour["plan"] = tour["schedule"].split("\n");
    res.render("client/pages/tour/detail.pug", {
        pageTitle: "Mixivivu",
        tour: tour
    })
}