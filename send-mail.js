const twilioMail = require('@sendgrid/mail');
require('dotenv').config();
twilioMail.setApiKey(process.env.TWILIO_MAIL_API_KEY);

const emailUpdates = function (updates) {
  const msg = {
    to: 'n8golightly@gmail.com',
    from: 'n8golightly@gmail.com',
    subject: 'testing tutorJobs email',
    text: updates,
    html: updates,
  };
  twilioMail.send(msg);
};

module.exports = emailUpdates;
