import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  },
  countryCode: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Customer', customerSchema);