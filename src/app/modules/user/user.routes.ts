import express from 'express';
import { ENUM_USER_ROLE } from '../../../enum/userRole';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

// Define your routes here
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.allUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserByAdmin),
  UserController.updateUser,
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
