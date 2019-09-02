const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  logon_id: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,

  administrator: Boolean,
  ldap: Boolean,
  tokens: Array,

  first_name: String,
  last_name: String,
  street: String,
  zip: String,
  place: String,
  country: String,
  telno: String,
  IBAN: String,
  BIC: String,
  relationship: String
}, 
{ 
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }  
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema
.virtual('designation')
.get(function () {
  return this.last_name + ", " + this.first_name;
});

userSchema
.virtual('address')
.get(function () {
  return this.street + ', ' + this.country + "-" + this.zip + ' ' + this.place ;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
