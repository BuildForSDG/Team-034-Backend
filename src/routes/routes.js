import express from 'express';
import signup from '../controllers/register';

const router = express.Router();

router.post('/auth/signup', signup);

export default router;

