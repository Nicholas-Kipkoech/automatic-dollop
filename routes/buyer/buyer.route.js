import express from "express";
import auth from "../../controllers/buyer/auth.js";
const router = express.Router();

router.post("/check", auth.checkUser);
router.post("/register", auth.createAccount);
router.post("/login", auth.buyerLogin);
router.post("/password/reset/request", auth.sendPasswordResetCode);
router.post("/password/change/:userID", auth.changePassword);

const buyerRouter = router;
export default buyerRouter;
