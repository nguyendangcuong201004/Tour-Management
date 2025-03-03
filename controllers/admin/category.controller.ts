import { Request, Response } from "express";
import Category from "../../models/category.model";


// [GET] /admin/categories
export const index = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        where: {
            deleted: false,
        },
        raw: true,
    })
    console.log(categories)
    res.render("admin/pages/category/index.pug", {
        pageTitle: "Mixivivu",
        categories: categories
    })
}