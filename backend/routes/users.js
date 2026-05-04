import express from 'express';
const router = express.Router();
import { wrapAsync } from '../utils/wrapAsync.js';
import passport from 'passport';
import * as userController from "../controllers/users.js"
import { isLoggedIn } from '../middleware.js';

router.route("/signup")
.post(wrapAsync(userController.signup)); //Signup

router.route("/login")
.post(passport.authenticate("local"), wrapAsync(userController.login)) //Login

router.route("/logout")
.post(wrapAsync(userController.logout)) //Logout

router.route("/")
.delete(isLoggedIn, wrapAsync(userController.destroyAccount)); //Delete Account

router.route("/auth")
.get(userController.authUser); //Authorizing User

export default router;