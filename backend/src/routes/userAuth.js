let express= require("express");
let authRouter=express.Router();
let {userLogin,userLogout, userRegister, checkcookie}=require("../controllers/userAuthentification");
const userMiddleware = require("../middleware/userMiddleware");

//signup
//login
//logout
authRouter.post("/register",userRegister);
authRouter.post("/login",userLogin);
authRouter.post("/logout",userMiddleware,userLogout);
authRouter.get("/check",userMiddleware,checkcookie)


module.exports=authRouter;