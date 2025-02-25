import { Request, Response } from "express";
import Tour from "../../models/tour.model";


// [GET] /tours
export const index = async (req: Request, res: Response) => {
    // SELECT * FROM tours WHERE deleted = false AND status = 'active'
    const tours = await Tour.findAll({
        where: {
            deleted: false,
            status: 'active'
        },
        raw: true,
    });
    
    res.render("client/pages/tour/index.pug", {
        pageTitle: "Danh sách các tour du lịch",
        tours: tours
    })
}