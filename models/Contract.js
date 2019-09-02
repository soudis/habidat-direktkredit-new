const mongoose = require('mongoose');
const moment = require("moment");

const contractSchema = new mongoose.Schema({
  sign_date: Date,
  amount: Number,
  interest_rate: Number,
  duration: String,
  end_date: Date,
  termination_date: Date,
  period_of_notice: String,  
  signed: Boolean,
  notes: String,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
  }],
  message: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
  }],
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
  this.populate('user');
  this.populate('transactions');
  next();
};

var autoPopulateFindOne = function(next) {
  this.populate('user');
  this.populate('transactions');
  this.populate('message');
  next();
};

contractSchema.
  pre('findOne', autoPopulateFindOne).
  pre('find', autoPopulateFind);

contractSchema
.virtual('designation')
.get(function () {
  return "Vertrag vom " + moment(this.sign_date).format('DD.MM.YYYY');
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
