const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_date: Date,
  type: String,
  text: String,
  refObject: {
    type: Schema.Types.ObjectId,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'refType'
  },
  refType: {
    type: String,
    enum: ['User', 'Contract', 'Transaction', 'Message']
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
  this.populate('refObject');
  next();
};

var autoPopulateFindOne = function(next) {
  this.populate('refObject');
  next();
};

eventSchema.
  pre('findOne', autoPopulateFindOne).
  pre('find', autoPopulateFind);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
