import { Request, Response } from "express";
import Tour from "../../models/tour.model";


// [GET] /cart
export const index = async (req: Request, res: Response) => {


    res.render("client/pages/cart/index.pug", {
        pageTitle: "Mixivivu",

    })
}

// [POST] /cart/list-json
export const listTour = async (req: Request, res: Response) => {
    const tours = req.body

    const cartDetail = [];
    let total = 0;

    for (const tour of tours) {
        const infoTour = await Tour.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: "active"
            },
            raw: true,
        })
        infoTour['images'] = JSON.parse(infoTour['images'])
        infoTour['image'] = infoTour['images'][0];
        
        infoTour["special_price"] = Math.round((infoTour["price"] * (1 - infoTour["discount"] / 100)))
        infoTour["total"] = infoTour["special_price"] * tour["quantity"]
        total +=  infoTour["total"]
        cartDetail.push({
            id: tour.tourId,
            quantity: tour.quantity,
            infoTour: infoTour,
        })
    }

    res.json({
        code: 200,
        message: "Thông tin người dùng",
        cart: cartDetail,
        total: total
    })
}