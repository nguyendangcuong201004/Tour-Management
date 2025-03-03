import { Router } from "express";
const router: Router = Router();

import multer from "multer"

const upload = multer();

import * as controller from "../../controllers/admin/tour.controller"
import * as uploadCloud from "../../middlewares/uploadCloud.middleware"

router.get("/", controller.index)

router.get("/create", controller.create)

router.get("/edit/:id", controller.edit)

router.post("/create", upload.fields([{ name: 'images', maxCount: 10 }]), uploadCloud.uploadFields ,controller.createPost)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/edit/:id", upload.fields([{ name: 'images', maxCount: 10 }]), uploadCloud.uploadFields, controller.editPatch)

router.get("/delete/:id", controller.deleteTour)

export const tourRoutes: Router = router;