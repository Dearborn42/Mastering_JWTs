import bcrypt from 'bcrypt';
import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    "email": {
        type: String,
        trim: true,
        validate:{validator: (value)=>{
            const emailRegex = /\w+@[a-z.-]+\.[a-z]+/i;
            return typeof value === "string" && emailRegex.test(value)
        }},
        required: true
    },
    "password": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true,
        trim: true,
    }
}, { collection: 'people'})

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User