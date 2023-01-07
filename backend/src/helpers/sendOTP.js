const twilio = require('twilio');

// Set up a client using your Twilio account SID and auth token
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOTP = async (phoneNumber)=>{
            const {sid} = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications
            .create({to: '+88'+phoneNumber, channel: 'sms'})
       return sid
}
exports.verifyOTP = async (phoneNumber, otp)=>{
        const {status} = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({to: '+88'+phoneNumber, code: otp})
       return status
}

/*
// Send a verification code to the user's phone number
client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verifications
    .create({ to: '+1234567890', channel: 'sms' })
    .then(verification => {
        // Save the verification SID in the user's account
        User.findByIdAndUpdate(userId, {
            phoneVerificationSid: verification.sid
        }, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Verification code sent to user!');
            }
        });
    })
    .catch(err => {
        console.error(err);
    });*/

// Later, when the user submits the verification code:
/*
client.verify.services(TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks
    .create({
        to: '+1234567890',
        code: verificationCode
    })
    .then(verification_check => {
        if (verification_check.status === 'approved') {
            // Verification code is correct, mark the user's phone number as verified
            User.findByIdAndUpdate(userId, {
                phoneVerified: true
            }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Phone number verified!');
                }
            });
        } else {
            console.error('Verification code incorrect');
        }
    })
    .catch(err => {
        console.error(err);
    });*/
