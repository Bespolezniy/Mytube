import express from "express"

import userCtrl from "../controllers/user.controller"
import authCtrl from "../controllers/auth.controller"
import mediaCtrl from "../controllers/media.controller"

const router = express.Router()

router.param("userId", userCtrl.userByID)

router.route("/api/media/new/:userId")
  .post(authCtrl.requireSignin, mediaCtrl.create)

export default router