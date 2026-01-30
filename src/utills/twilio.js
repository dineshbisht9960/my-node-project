const twilio = require('twilio');
const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

module.exports.sendSMSService = async (phone, otp) => {
    try {
        const message = await client.messages.create({
        body: `your otp  is ${otp}`,
        from: process.env.TWILIO_PHONE_NO,
        to: phone
    });
    console.log('otp send', message.sid);
    } catch (error) {
        console.log(error);
        return false;
    }
    
}