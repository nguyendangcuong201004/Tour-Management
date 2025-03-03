import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate.helper";
import TourCategory from "../../models/tour-category.model";
import { systemConfig } from "../../configs/system";

export const index = async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        where: {
            deleted: false,
        },
        raw: true,
    })
    tours.forEach((item) => {
        if (item["images"]){
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    })

    console.log(tours);

    res.render("admin/pages/tours/index.pug", {
        pageTitle: "Mixiviu",
        tours: tours
    })
}

export const create = async (req: Request, res: Response) => {

    const categories = await Category.findAll({
        where: {
            deleted: false,
        },
        raw: true
    })

    res.render("admin/pages/tours/create.pug", {
        pageTitle: "Mixivivu",
        categories: categories
    })
}

export const createPost = async (req: Request, res: Response) => {

    const data = req.body;
    if (!data.postion){
        const countTour = await Tour.count();
        data.position = countTour + 1;
    }

    else {
        data.postion = parseInt(data.postion)
    }

    const dataTour = {
        title: data.title,
        code: "",
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        timeStart: data.timeStart,
        stock: data.stock,
        status: data.status,
        position: data.position,
    }

    console.log(data)

    const tour = await Tour.create(dataTour);
    const tourId = tour.dataValues.id;
    const code = generateTourCode(tourId)

    await Tour.update({
        code: code,
    }, {
        where: {
            id: tourId,
        }
    })

    const dataTourCategory = {
        tour_id: tourId,
        category_id: parseInt(data.category_id)
    }

    await TourCategory.create(dataTourCategory);

    res.redirect(`/${systemConfig.prefixAdmin}/tours`)
}