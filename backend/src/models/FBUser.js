import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'

const FBUserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  token: String,
});

export default mongoose.model('FBUser', FBUserSchema);
