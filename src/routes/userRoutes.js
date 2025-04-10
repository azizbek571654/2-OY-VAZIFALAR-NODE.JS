import express from 'express';
import { userController } from '../controller/index.js';
import { validators } from '../middleware/index.js';

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updatePassword,
    getUserByEmail,
    deleteUser
} = userController;

const {
    createUserValidation,
    updateUserValidation,
    updatePasswordValidation,
    validateRequest
} = validators;

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUserValidation, validateRequest, createUser);
router.put('/:id', updateUserValidation, validateRequest, updateUser);
router.patch('/password/:id', updatePasswordValidation, validateRequest, updatePassword);
router.get('/email/:email', getUserByEmail);
router.delete('/:id', deleteUser);



export default router;