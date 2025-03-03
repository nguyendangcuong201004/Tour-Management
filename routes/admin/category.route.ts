import { Router } from "express";
const router: Router = Router();

import multer from "multer"

const upload = multer();

import * as controller from "../../controllers/admin/category.controller"
import * as uploadCloud from "../../middlewares/uploadCloud.middleware"

router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.get("/create", controller.create)

router.post("/create", upload.single("image"), uploadCloud.uploadSingle ,controller.createPost)

router.get("/edit/:id", controller.edit)

router.get("/delete/:id", controller.deleteCategory)

router.patch("/edit/:id", upload.single("image"), uploadCloud.uploadSingle , controller.editPatch)

export const categoryRoutes: Router = router;