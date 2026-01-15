import express from 'express';
import authRouter from './auth/auth.routes';
import phoneRouter from './phone/phone.routes'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/phone', phoneRouter);

export default router;

