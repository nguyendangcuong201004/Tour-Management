import { Request, Response } from "express";
import Category from "../../models/category.model";
import slugify from "slugify";
import { systemConfig } from "../../configs/system";
import TourCategory from "../../models/tour-category.model";


// [GET] /admin/categories
export const index = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        where: {
            deleted: false,
        },
        raw: true,
    })

    res.render("admin/pages/category/index.pug", {
        pageTitle: "Mixivivu",
        categories: categories
    })
}


// [PATCH] /admin/categories/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.status;
    const id = req.params.id;

    await Category.update({
        status: status
    }, {
        where: {
            id: id
        }
    })

    res.redirect("back")
}

// [GET] /admin/categories/edir/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;

    const category = await Category.findOne({
        where: {
            id: id,
        }
    })

    res.render("admin/pages/category/edit.pug", {
        pageTitle: "Mixivivu",
        category: category
    })
}

// [POST] /admin/categories/edir/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    const data = (req.body);

    console.log(data)

    const dataCategory = {
        title: data.title,
        description: data.description,
        position: parseInt(data.position),
        status: data.status
    }

    if (data.file){
        dataCategory["image"] = data.image
    }


    await Category.update(dataCategory, {
        where: {
            id: id
        }
    })

    res.redirect("back")
}



// [GET] /admin/categories/create
export const create = async (req: Request, res: Response) => {


    res.render("admin/pages/category/create.pug", {
        pageTitle: "Mixivivu"
    })
}


// [GET] /admin/categories/create
export const createPost = async (req: Request, res: Response) => {

    const countCa = await Category.count();

    const data = req.body;

    const dataCategory = {
        title: data.title,
        description: data.description,
        position: countCa + 1,
        status: data.status,
        image: data.image,
        slug: slugify(`${data.title}-${Date.now()}`, {
            lower: true,
            strict: true,
        })
    }

    await Category.create(dataCategory);

    res.redirect("back")
}

// [GET] /admin/categories/delete/:id
export const deleteCategory = async (req: Request, res: Response) => {

    const id = req.params.id;

    await TourCategory.destroy({
        where: {
            category_id: id
        }
    })

    await Category.destroy({
        where: {
            id: id
        }
    })

    res.redirect(`/${systemConfig.prefixAdmin}/categories`)
}