import { Router } from 'express';
import userRouter from './users';
import uploadRouter from './upload';

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    message: 'this is a backend template',
  });
});

router.use('/users', userRouter);
router.use('/upload', uploadRouter);

export default router;

