
const Mailgun = require("mailgun.js");
const formData = require("form-data");

const MAILGUN_DOMAIN = "sandboxefb5febaa0194b7a9211529181f14f0d.mailgun.org";
const MAILGUN_API_KEY = "67140b9049891b184710358cab206eb7-a2dd40a3-c617cb0f";

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