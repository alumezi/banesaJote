/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Express from 'express';
import User from '../models/user';

const loginRouter = Express.Router();

loginRouter.post('/', async (request, response) => {
  const { body } = request;
  const user = await User.findOne({ username: body.username });

  if (!user) {
    return response.status(404).json({
      error: 'Perdoruesi nuk egziston',
    });
  }

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(404).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response.status(200).send({
    token,
    username: user.username,
    name: user.name,
    id: user._id,
  });
});

export default loginRouter;
