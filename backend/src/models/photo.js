import mongoose, { Schema } from 'mongoose';
import LocalFS  from 'mongoose-crate-localfs';
import path from 'path';

const photoSchema = new Schema({
  user: Schema.objectId,
  album: Schema.objectId,
  location: String,
  tag: [String],
});

photoSchema.plugin(crate, {
  storage: new LocalFS({
    directory: path.resolve(__dirname, "..", "pic"),
  }),
  fields: {
    attachment: {}
  }
});

export default mongoose.model('photo', photoSchema);