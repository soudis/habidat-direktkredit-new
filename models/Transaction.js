const mongoose = require('mongoose');
const moment = require("moment");

const transactionSchema = new mongoose.Schema({
  transaction_date: Date,
  amount: Number,
  type: String
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
  this.populate('contract');
  next();
};

var autoPopulateFindOne = function(next) {
  this.populate('contract');
  next();
};


transactionSchema.
  pre('findOne', autoPopulateFindOne).
  pre('find', autoPopulateFind);

transactionSchema
.virtual('designation')
.get(function () {
  return this.type + " vom " + moment(this.transaction_date).format('DD.MM.YYYY');
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
