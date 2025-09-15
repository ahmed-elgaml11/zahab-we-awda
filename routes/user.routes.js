import express from "express";
const router = express.Router();
import * as userController from '../controllers/user.controller.js'
import { protect, restrictTo } from "../middlewares/auth.js";
import { checkModelId } from "../utils/checkDocumentExists.js";
import { userUpdateValidationSchema, userValidationSchema } from "../schema/userSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";


router.use(protect)

router.patch('/update-me', validateRequest(userUpdateValidationSchema), userController.updateMe)

router.post('/deactivate/:userId', checkModelId, protect, restrictTo(['admin']), userController.deActivateUser)


router.use(restrictTo(['admin']))
router
  .route('/')
    .get(userController.getAllUsers)  
    .post(validateRequest(userValidationSchema), userController.addUser)

router.use(checkModelId)

router
  .route('/:id')
    .get(userController.getUser)
    .patch(validateRequest(userUpdateValidationSchema), userController.updateUser)
    .delete(userController.deleteUser)    


export default router;    