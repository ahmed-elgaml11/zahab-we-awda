import express from "express";
const router = express.Router();
import * as userController from '../controllers/user.controller.js'
import { protect, restrictTo } from "../middlewares/auth.js";
import { checkUseryId } from "../utils/checkDocumentExists.js";
import { userUpdateValidationSchema, userValidationSchema } from "../schema/userSchema.js";


router.use(protect)

router.patch('/update-me', validateRequest(userUpdateValidationSchema), userController.updateMe)

router.post('/deactivate/:userId', checkUseryId,protect, restrictTo(['admin']), userController.deActivateUser)


router.use(restrictTo(['admin']))
router
  .route('/')
    .get(userController.getAllUsers)  
    .post(validateRequest(userValidationSchema), userController.addUser)

router.use(checkUseryId)

router
  .route('/:id')
    .get(userController.getUser)
    .patch(validateRequest(userUpdateValidationSchema), userController.updateUser)
    .delete(userController.deleteUser)    