const nodemailer = require("nodemailer");

async function sendEmail(targetEmail, emailmessage) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "deshstephen@gmail.com",
      pass: "desh.stephen01",
    },
  });

  let emailInfo = await transporter.sendMail({
    from: '"dephen" <deshstephen@gmail.com>',
    to: targetEmail,
    subject: "Thank You For Shopping! Here's Your Receipt",
    text: emailmessage,
  });

  let info = transporter.sendMail(emailInfo, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendEmail };
