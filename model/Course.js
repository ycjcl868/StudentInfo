// Generated by CoffeeScript 1.7.1
(function() {
  var mongoose, _Course;

  mongoose = require('mongoose');

  _Course = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cno: String,
    cname: String,
    credit: {
      type: Number,
      "default": 0
    },
    teacher: String
  });

  module.exports = mongoose.model('Course', _Course);

}).call(this);

//# sourceMappingURL=Course.map
