import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/userController.js';
import { celebrate } from 'celebrate';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();

router.use('/users', authenticate);

router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);

router.patch('/users/me', celebrate(updateUserSchema), updateUser);
router.get('/users/me', getUser);

export default router;
