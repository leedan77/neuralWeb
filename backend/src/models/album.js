import mongoose, { Schema } from 'mongoose';

const albumSchema = new Schema({
  user: Schema.objectId,
  name: String,
});

PostSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '/path/to/storage/directory'
  }),
  fields: {
    attachment: {}
  }
})

export default mongoose.model('album', albumSchema);