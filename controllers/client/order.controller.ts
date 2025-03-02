
import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate.helper";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";


// [POST] /order
export const index = async (req: Request, res: Response) => {

    const data = req.body;

    const dataOrder = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    }

    const order = await Order.create(dataOrder)
    const orderId = order.dataValues.id
    const code = generateOrderCode(orderId);

    await Order.update({
        code: code,
    }, {
        where: {
            id: orderId,
        }
    })

    for (const item of data.cart) {
        const dataOrderItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity
        };

        const tourInfo = await Tour.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: "active"
            },
            raw: true
        });

        dataOrderItem["price"] = tourInfo["price"];
        dataOrderItem["discount"] = tourInfo["discount"];
        dataOrderItem["timeStart"] = tourInfo["timeStart"];

        await OrderItem.create(dataOrderItem);
    }

    res.json({
        code: 200,
        message: "Đặt tour thành công",
        data: data,
        dataOrder: dataOrder,
        orderCode: code,
    })
}


// [POST] /order/success
export const success = async (req: Request, res: Response) => {
    
    const orderCode = req.query.orderCode;


    const order = await Order.findOne({
        where: {
            code: orderCode,
        },
        raw: true
    })

    const date = new Date(order["updatedAt"]);

    order["formattedDate"] = date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false
    });

    const orderItem = await OrderItem.findAll({
        where: {
            orderId: order["id"]
        },
        raw: true,
    })

    let total_order = 0;

    for (const item of orderItem) {
        const tour = await Tour.findOne({
            where: {
                id: item["tourId"],
                deleted: false,
                status: "active"
            },
            raw: true
        })
        item["tour"] = tour;
        item["special_price"] = item["tour"]["price"] * (1 - item["tour"]["discount"] / 100)
        item["total_tour"] = item["special_price"] * item["quantity"];
        total_order += item["total_tour"];
        item["image"] = JSON.parse(item["tour"]["images"])[0];
    }


    res.render("client/pages/order/success.pug", {
        pageTitle: "Mixiviu",
        order: order,
        orderItem: orderItem,
        total_order: total_order
    })
}