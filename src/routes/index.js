import { Router } from 'express';
import menuRoutes from './menu';

const router = Router();

router.use('/menu', menuRoutes);

export default router;
