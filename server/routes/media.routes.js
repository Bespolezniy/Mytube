import express from "express"

import userCtrl from "../controllers/user.controller"
import authCtrl from "../controllers/auth.controller"
import mediaCtrl from "../controllers/media.controller"

const router = express.Router()

router.param("userId", userCtrl.userByID)
router.param("mediaId", mediaCtrl.mediaByID)

router.route("/api/media/new/:userId")
  .post(authCtrl.requireSignin, mediaCtrl.create)

router.route("/api/media/video/:mediaId")
  .get(mediaCtrl.video)

export default router