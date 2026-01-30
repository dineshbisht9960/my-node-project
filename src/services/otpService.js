const { verifyOtpService } = require("../controllers/verifyOtp")
module.exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    await verifyOtpService({ phone, otp });
    
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    next(error);
  }
};
