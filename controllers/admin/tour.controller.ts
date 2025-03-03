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
        if (item["images"]) {
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    })

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
    if (!data.postion) {
        const countTour = await Tour.count();
        data.position = countTour + 1;
    }

    else {
        data.postion = parseInt(data.postion)
    }

    const dataTour = {
        title: data.title,
        code: "",
        images: JSON.stringify(data.images),
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        timeStart: data.timeStart,
        stock: data.stock,
        status: data.status,
        position: data.position,
        information: data.information,
        schedule: data.schedule
    }

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



// [PATCH] /admin/tours/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.status;
    const id = req.params.id;

    await Tour.update({
        status: status
    }, {
        where: {
            id: id
        }
    })

    res.redirect("back")
}

// [GET] /admin/tours/edit/:id
export const edit = async (req: Request, res: Response) => {

    const tour = await Tour.findOne({
        where: {
            id: req.params.id,
        },
        raw: true
    })

    const categories = await Category.findAll({
        where: {
            deleted: false,
        },
        raw: true
    })

    console.log(tour)

    const tour_categories = await TourCategory.findOne({
        where: {
            tour_id: req.params.id
        },
        raw: true
    })

    let formattedTimeStart = ""
    let images = ""

    if (tour) {
        formattedTimeStart = tour["timeStart"].toISOString().slice(0, 16);

        images = (JSON.parse(tour["images"]));
    }




    res.render("admin/pages/tours/edit.pug", {
        pageTitle: "Mixivivu",
        tour: tour,
        categories: categories,
        tour_categories: tour_categories,
        formattedTimeStart: formattedTimeStart,
        images: images
    })
}


// [PATCH] /admin/tours/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const tourId = req.params.id;
    const data = req.body

    const tour = await Tour.findOne({
        where: {
            id: tourId
        },
        raw: true
    })

    let images = []
    JSON.parse(tour["images"]).forEach((item) => {
        images.push(item)
    })

    data.images.forEach((item) => {
        images.push(item)
    })


    console.log(images)


    await Tour.update({
        title: data.title,
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        stock: parseInt(data.stock),
        timeStart: data.timeStart,
        information: data.information,
        schedule: data.schedule,
        images: JSON.stringify(images),
        position: parseInt(data.position),
        status: data.status
    }, {
        where: {
            id: tourId
        }
    })

    res.redirect("back")
}








// [GET] /admin/tours/delete/:id
export const deleteTour = async (req: Request, res: Response) => {
    const id = req.params.id;

    await TourCategory.destroy({
        where: {
            tour_id: id
        }
    })

    await Tour.destroy({
        where: {
            id: id
        }
    })
    res.redirect(`/${systemConfig.prefixAdmin}/tours`)
}