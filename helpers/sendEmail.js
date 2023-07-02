const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const {
  generateVerificationHtml,
  generateForgetPassowrdHtml,
} = require("./generateHtmlFiles");
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_HOST = process.env.EMAIL_HOST;

//nardni emaile verification
const emailSendVerification = async (email, verifyEmailToken) => {
  try {
    var html = generateVerificationHtml(verifyEmailToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_HOST,
        pass: EMAIL_PASSWORD,
      },
    });

    const data = {
      to: email,
      from: EMAIL_HOST,
      subject: "VERIFICATION ONETWO",
      text: "VERIFY YOUR ACCOUNT",
      html: html,
    };

    await transporter.sendMail(data, (err, data) => {
      if (err) {
        console.log(`Same Error Hapned ${err}`);
        return false;
      }
    });
    return true;
  } catch (err) {
    console.log("EMAIL_ERROR" + err);
    return false;
  }
};

//nardni emaile forgetpassowrd
const emailSendForgetPassowrd = async (email, verifyEmailToken) => {
  try {
    const html = generateForgetPassowrdHtml(verifyEmailToken);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_HOST,
        pass: EMAIL_PASSWORD,
      },
    });

    const data = {
      to: email, // Change to your recipient
      from: EMAIL_HOST, // Change to your verified sender
      subject: "Forget Passowrd",
      text: "Forget Passowrd onetwo",
      html: html,
    };

    await transporter.sendMail(data, (err, data) => {
      if (err) {
        console.log(`Same Error Hapned ${err}`);
        return false;
      }
    });
    return true;
  } catch (err) {
    console.log("EMAIL_ERROR" + err);
    return false;
  }
};

module.exports = {
  emailSendVerification,
  emailSendForgetPassowrd,
};
