
import { Router } from 'express';
import { googleAuth, googleCallback, getMe, updatePhone } from '../../controllers/auth/auth.controller';
import { authenticate } from '../../../middleware/auth.middleware';


const authRouter = Router({ mergeParams: true });



authRouter.get("/google",googleAuth);
authRouter.get("/google/callback", googleCallback);
authRouter.get("/me", authenticate, getMe);
authRouter.put("/phone", authenticate, updatePhone);


// authRouter.get('/token', createAccessToken);


export default authRouter;
