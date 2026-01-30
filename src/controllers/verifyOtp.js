const userOtp = require('../models/userOtp');
const User = require('../models/User')

module.exports.verifyOtpService = async ({ phone, otp }) => {
  try {
    const record = await userOtp.otps.findOne({ phone, otp });
    if (!record) {
      throw new Error('Invalid OTP or phone number');
    }

    const user = await User.findOneAndUpdate(
      { phone },
      { isVerify: true },
      { new: true }
    );
    return record;
  } catch (error) {
    console.log(error);
    throw error
  }
};
