import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password_digest: {type:String, required: true}
});

// ensures email is unique before attempting to save
schema.pre('save', function (next) {
  mongoose.models['User'].findOne({email: this.email}, 'email', (err, results) => {
    if (err) {
      next(err);
    } else if (results) {
      this.invalidate('email', 'must be unique');
      next(new Error('email must be unique'));
    } else {
      next();
    }
  });
});

export default mongoose.model('User', schema);
