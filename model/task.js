import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  user_id: {type: mongoose.Schema.Types.ObjectID, required: true}
});

export default mongoose.model('Task', schema);
