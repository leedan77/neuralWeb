import User, { generateHash, validatePassword } from '../models/User';
import { Http400Error } from '../core/error';
import FBUser from '../models/FBUser';

export function getAllUsers() {
  return User.find({});
}

function checkUserExist(username) {
  return User.findOne({ username }).then((user) => {
    if (user) {
      throw new Http400Error(`user "${username}" exists`);
    }
  });
}

export function createNewUser(username, password) {
  return checkUserExist(username).then(() => {
    const user = new User({
      username,
      password: generateHash(password),
    });
    return user.save();
  });
}

export function login(username, password) {
  return User.findOne({ username }).then((user) => {
    if (!user) {
      throw new Http400Error(`user "${username}" doesn't exist`);
    }
    if (!validatePassword(password, user.password)) {
      throw new Http400Error('password incorrect');
    }
    return user;
  });
}

export function createNewFBUser(email, token) {
  return FBUser.findOne({ email }).then((user) => {
    if (user) {
      throw new Http400Error(`user "${email}" exists`);
    } else {
      const fbUser = new FBUser({
        email,
        token,
      });
      return fbUser.save();
    }
  });
}

