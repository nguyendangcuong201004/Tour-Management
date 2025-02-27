import { Request, Response } from "express";
import Category from "../../models/category.model";


// [GET] /categories
export const index = async (req: Request, res: Response) => {

    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: 'active'
        },
        raw: true,
    })

    res.render("client/pages/category/index.pug", {
        pageTitle: "Cùng Mixivivu tìm kiếm chuyến du lịch của bạn",
        categories: categories
    })
}