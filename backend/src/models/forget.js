import mongoose from 'mongoose';
import crypto from 'crypto';


export  const passwordResetTokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  });
  
  // Method to generate a secure token
passwordResetTokenSchema.statics.generateToken = function (userId) {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
    return { token, hash, expiresAt };
  };
  

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

module.exports = PasswordResetToken;