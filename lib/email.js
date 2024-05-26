
const Mailgun = require("mailgun.js");
const formData = require("form-data");

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? "";
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? "";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
});

const sendEmail = async (receiverEmail, subject, text) => {
    const response = await client.messages.create(MAILGUN_DOMAIN, {
        from: `API <system@${MAILGUN_DOMAIN}>`,
        to: [receiverEmail],
        html: text,
        subject,
        text,
    });
    return response;
};

module.exports = sendEmail;