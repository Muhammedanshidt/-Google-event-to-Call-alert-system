
import { Router } from 'express';
import {callLogController} from '../../controllers/phone/phone.controller';
import { authenticate } from '../../../middleware/auth.middleware';

const phoneRouter = Router({ mergeParams: true });

phoneRouter.post('/call-status',authenticate,callLogController)

export default phoneRouter;