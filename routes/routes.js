import express from 'express';
import Controller from '../controllers/Controller.js';
import { isValid } from '../middlewears/middleware_valid_usr.js';
import { test_middleware } from '../middlewears/test_middlewear.js';

const router = express.Router();

// router.get("/test", (req,res)=>{
//     res.send("From Test Page!!");
// });

// using middlewear on all the routers
router.use(test_middleware);

router.get("/test", Controller.test_get);  

router.get("/signup", Controller.signup_get);

router.post("/signup", Controller.signup_post);

router.get("/login", Controller.login_get);

router.post("/login", Controller.login_post);

router.get("/dashboard", isValid, Controller.dashboard_get);

router.post("/logout", Controller.logout_post);

export default router;