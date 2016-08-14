import { Router } from 'express';
import { getAllUsers, createNewUser, login, createNewFBUser } from '../controllers/user';
import { generateToken, verifyToken } from '../controllers/auth';
import { loginRequired } from '../middlewares/auth';
import { validateString } from '../core/utils';
import { Http400Error } from '../core/error';

const userRouter = new Router();

userRouter.get('/', (req, res, next) => {
  getAllUsers().then((users) => {
    res.status(200).json({
      users,
    });
  }).catch((err) => {
    next(err);
  });
});

userRouter.post('/create', (req, res, next) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  createNewUser(username.trim(), password.trim())
  .then((user) => generateToken(user))
  .then((token) => {
    res.status(200).json({
      success: true,
      token,
    });
  })
  .catch((err) => {
    next(err);
  });
});

userRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  validateString('username', username, { required: true });
  validateString('password', password, { required: true });
  login(username.trim(), password.trim())
  .then((user) => generateToken(user))
  .then((token) => {
    res.status(200).json({
      success: true,
      token,
    });
  })
  .catch((err) => {
    next(err);
  });
});

userRouter.get('/me', loginRequired, (req, res, next) => {
  verifyToken(req.token)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    next(err);
  });
});

userRouter.post('/fbsignup', (req, res, next) => {
  const { email, token } = req.body;
  validateString('email', email, { required: true });
  validateString('token', token, { required: true });
  createNewFBUser(email, token)
  .then((fbUser) => {
    res.status(200).json({
      success: true,
    })
  })
  .catch(err => {
    if (err.errors && err.errors.email) {
      next(new Http400Error('fields errors', err.errors));
    } else {
      next(err);
    }
  });
});

export default userRouter;

