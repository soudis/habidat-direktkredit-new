const mongoose = require('mongoose');
const moment = require("moment");

const messageSchema = new mongoose.Schema({
  message_date: Date,
  content: String,
  medium: String,
  direction: String,
  type: String,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },  
  contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract"
  }
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

var autoPopulateFind = function(next) {
  // this.populate('contract');
  next();
};

var autoPopulateFindOne = function(next) {
  // this.populate('contract');
  next();
};


messageSchema.
  pre('findOne', autoPopulateFindOne).
  pre('find', autoPopulateFind);

messageSchema
.virtual('designation')
.get(function () {
  return this.medium + "-Nachricht vom " + moment(this.message_date).format('DD.MM.YYYY');
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
