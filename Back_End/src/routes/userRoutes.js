import { Router } from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/usuarios', registerUser);
router.post('/login', loginUser); // ruta que me daba error
router.get('/usuarios', authMiddleware, getUser);

export default router;