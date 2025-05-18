import SibApiV3Sdk from "sib-api-v3-sdk";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config({
   
})


const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey =process.env.BREVO_API_KEY_EMAIL;  // Replace with your API key
console.log(process.env.BREVO_API_KEY_EMAIL);
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Sends an OTP email to the given email address.
 * @param {string} email - Recipient's email address.
 * @returns {string} The OTP sent.
 */
export async function sendOtpEmail(email) {
  const otp = crypto.randomInt(100000, 999999).toString();

  const sendSmtpEmail = {
    sender: { name: "Blogify", email:process.env.FORWARDING_EMAIL },
    to: [{ email }],
    subject: "Blogify One-Time Password Verification",
    textContent: `Your one-time password is: ${otp}

Please use this code to complete your verification. This OTP is valid for a limited time and should be kept confidential.

If you did not request this code, please contact our support team immediately.

Sincerely,
Blogify Security Team`,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
  return otp;
}
