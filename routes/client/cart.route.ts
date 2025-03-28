import { Request, Response, Router } from "express";
import * as controller from "../../controllers/client/cart.controller";

const router: Router = Router();

router.get("/", controller.index)

router.post("/list-json", controller.listTour)

export const cartRoutes: Router = router;