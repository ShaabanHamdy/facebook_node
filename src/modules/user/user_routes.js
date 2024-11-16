import { Router } from "express";
import { asyncHandling } from './../../utils/error_handling.js';
import * as user_controller from "./user_controller.js";
// import { changePasswordSchemaValidator, codeSchemaValidator, senCodeSchemaValidator, signupMiddleware } from "./user_validation.js";
import auth from "../../middleware/auth.js";
import { myMulter } from "../../utils/multer.js";
import * as userValidation from "./user_validation.js";

const router = Router()


//=================================================signup===============    
router.post("/signup", userValidation.signupValidation, asyncHandling(user_controller.signup))

//=================================================login===============    
router.post("/login", asyncHandling(user_controller.login))

//=================================================logout===============    
router.get("/logout", asyncHandling(user_controller.logout))

//================================================= sendCode ===============    
router.post("/sendCode", userValidation.senCodeSchemaValidator, asyncHandling(user_controller.sendCode))

//================================================= confirmCodeInfo ===============    
router.post("/confirmCodeInfo", userValidation.codeSchemaValidator, asyncHandling(user_controller.confirmCodeInfo))
//================================================= changePassword ===============    
router.post("/changePassword", userValidation.changePasswordSchemaValidator, asyncHandling(user_controller.changePassword))

// //================================================= ===============    
router.get("/getUserInfo", auth(), asyncHandling(user_controller.getUserInfo))

// //================================================= ===============    
router.get("/getAllUsers", auth(), asyncHandling(user_controller.getAllUsers))

// //================================================= ===============    
router.post("/addFriend", auth(), asyncHandling(user_controller.addFriend))
// //================================================= ===============    
router.post("/removeFriend", auth(), asyncHandling(user_controller.removeFriend))

// //================================================= ===============    


router.post("/settingsProfile", auth(),
    userValidation.settingsProfileValidation,
    myMulter().fields([{ name: "profileImage", maxCount: 1 }]),
    asyncHandling(user_controller.settingsProfile))




export default router