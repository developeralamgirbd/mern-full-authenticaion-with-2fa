const sgMail = require('@sendgrid/mail');
require('dotenv').config();

exports.sendEmailVerifyMail = async (email, token)=>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);


    const verifyUrl = `${process.env.CLIENT_URL}/email-verify/${email}/${token}`;
    const template = `<div style="background: aliceblue; border: 0.5px solid gray; padding: 10px">
        <h4>Please Verify Your email</h4>
        <div style="text-align: center">
            <a href="${verifyUrl}" style="padding: 10px 20px; border-radius: 15px; background: green; color: white; text-decoration: none">Verify Now</a>
        </div>
        <h5>if verify button not work. click it: <a href="${verifyUrl}">${verifyUrl}</a></h5>
    </div>`;

    const msg = {
        to: email,
        from: 'bd.freelancer.alamgir@gmail.com',
        subject: 'Verify Your Email',
        html: template,
    }

   return sgMail.send(msg);
}

exports.sendPasswordResetLinkMail = async (email, token)=>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const verifyUrl = `${process.env.CLIENT_URL}/new-password/${email}/${token}`;
    const template = `<div style="background: aliceblue; border: 0.5px solid gray; padding: 10px">
        <h4>Password Reset</h4>
        <div style="text-align: center">
            <a href="${verifyUrl}" style="padding: 10px 20px; border-radius: 15px; background: green; color: white; text-decoration: none">Password Reset Now</a>
        </div>
        <h5>if password rest link button not work. click it: <a href="${verifyUrl}">${verifyUrl}</a></h5>
    </div>`;

    const msg = {
        to: email,
        from: 'bd.freelancer.alamgir@gmail.com',
        subject: 'Password Reset Link',
        html: template,
    }

    return sgMail.send(msg);
}

