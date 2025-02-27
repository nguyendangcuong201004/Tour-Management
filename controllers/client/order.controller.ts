
import { Request, Response } from "express";


// [GET] /order
export const index = async (req: Request, res: Response) => {

    console.log(req.body)

    res.json({
        code: 200,
        message: "Đặt tour thành công"
    })
}