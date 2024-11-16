
import { Router } from 'express';
import auth from '../../middleware/auth.js';
import { asyncHandling } from '../../utils/error_handling.js';
import * as messenger_controllers from "./messenger_controller.js";
const router = Router()
// ====================================================================================================================

// router.post("/createPost", auth(), myMulter().fields([{ name: "postImage", maxCount: 1 }]),asyncHandling(post_controllers.createPost))

// // ====================================================================================================================

router.get("/getMessages", auth(), asyncHandling(messenger_controllers.getMessages))

// // ====================================================================================================================

// router.get("/getUserPosts", auth(), asyncHandling(post_controllers.getUserPosts))

// // ====================================================================================================================

// router.delete("/deleteOnePost/:postId", auth(), asyncHandling(post_controllers.deleteOnePost))

// // ====================================================================================================================

// router.delete("/deleteAllPosts", auth(),asyncHandling(post_controllers.deleteAllPosts))

// // ====================================================================================================================

// router.put("/editPost/:postId", auth(), myMulter().fields([{ name: "postImage", maxCount: 1 }]),asyncHandling(post_controllers.editPost))

// // ====================================================================================================================


export default router

