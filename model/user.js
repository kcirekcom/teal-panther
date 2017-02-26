import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password_digest: {type:String, required: true}
});

export default mongoose.model('User', schema);